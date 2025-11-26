import Coupon from '../models/Coupon.model.js';

export const validarCupon = async (req, res) => {
  try {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ message: 'Código de cupón requerido' });
    }

    const cupon = await Coupon.findOne({ codigo: codigo.toUpperCase() });

    if (!cupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }

    if (!cupon.esValido()) {
      return res.status(400).json({ message: 'Cupón expirado o no válido' });
    }

    res.json({
      codigo: cupon.codigo,
      descuento: cupon.descuento,
      message: `Cupón válido: ${cupon.descuento}% de descuento`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al validar cupón', error: error.message });
  }
};

export const aplicarCupon = async (req, res) => {
  try {
    const { codigo } = req.body;

    const cupon = await Coupon.findOne({ codigo: codigo.toUpperCase() });

    if (!cupon || !cupon.esValido()) {
      return res.status(400).json({ message: 'Cupón no válido' });
    }

    cupon.usosActuales += 1;
    await cupon.save();

    res.json({
      codigo: cupon.codigo,
      descuento: cupon.descuento,
      message: 'Cupón aplicado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al aplicar cupón', error: error.message });
  }
};

export const obtenerCupones = async (req, res) => {
  try {
    const cupones = await Coupon.find({ activo: true });
    res.json(cupones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cupones', error: error.message });
  }
};

export const crearCupon = async (req, res) => {
  try {
    const cupon = new Coupon(req.body);
    await cupon.save();
    res.status(201).json(cupon);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cupón', error: error.message });
  }
};
