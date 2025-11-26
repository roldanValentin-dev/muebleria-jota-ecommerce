import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { productos, descuento, envio } = req.body;

    if (!productos || productos.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'El pedido debe contener al menos un producto' });
    }

    let total = 0;
    const productosConDetalles = [];

    for (const item of productos) {
      if (!item.cantidad || item.cantidad <= 0) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
      }

      const producto = await Product.findById(item.producto).session(session);
      if (!producto) {
        await session.abortTransaction();
        return res.status(404).json({ message: `Producto ${item.producto} no encontrado` });
      }
      if (producto.stock < item.cantidad) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Stock insuficiente para ${producto.nombre}` });
      }

      producto.stock -= item.cantidad;
      await producto.save({ session });

      productosConDetalles.push({
        producto: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad
      });

      total += producto.precio * item.cantidad;
    }

    const subtotal = total;
    const montoDescuento = descuento?.monto || 0;
    const costoEnvio = envio?.costo || 0;
    const totalFinal = subtotal - montoDescuento + costoEnvio;

    const order = await Order.create([{
      usuario: req.userId,
      productos: productosConDetalles,
      subtotal,
      descuento: {
        porcentaje: descuento?.porcentaje || 0,
        monto: montoDescuento,
        codigoCupon: descuento?.codigoCupon || null
      },
      envio: {
        provincia: envio?.provincia || null,
        costo: costoEnvio
      },
      total: totalFinal
    }], { session });

    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ usuario: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, usuario: req.userId });
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const order = await Order.findOne({ _id: req.params.id, usuario: req.userId }).session(session);
    
    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (order.estado === 'cancelado') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'El pedido ya está cancelado' });
    }

    if (order.estado === 'completado') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'No se puede cancelar un pedido completado' });
    }

    // Devolver stock a los productos
    for (const item of order.productos) {
      const producto = await Product.findById(item.producto).session(session);
      if (producto) {
        producto.stock += item.cantidad;
        await producto.save({ session });
      }
    }

    order.estado = 'cancelado';
    await order.save({ session });

    await session.commitTransaction();
    res.json({ message: 'Pedido cancelado exitosamente', order });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, usuario: req.userId });
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (order.estado !== 'cancelado') {
      return res.status(400).json({ message: 'Solo se pueden eliminar pedidos cancelados' });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pedido eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};