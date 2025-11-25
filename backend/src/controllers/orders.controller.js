import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { productos } = req.body;

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

    const order = await Order.create([{
      usuario: req.userId,
      productos: productosConDetalles,
      total
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