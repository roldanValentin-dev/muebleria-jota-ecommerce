import ShippingRate from '../models/ShippingRate.model.js';

export const obtenerTarifas = async (req, res) => {
  try {
    const tarifas = await ShippingRate.find({ activo: true });
    res.json(tarifas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tarifas', error: error.message });
  }
};

export const calcularEnvio = async (req, res) => {
  try {
    const { provincia } = req.body;

    if (!provincia) {
      return res.status(400).json({ message: 'Provincia requerida' });
    }

    const tarifa = await ShippingRate.findOne({ provincia, activo: true });

    if (!tarifa) {
      return res.status(404).json({ message: 'Tarifa no encontrada para esta provincia' });
    }

    res.json({
      provincia: tarifa.provincia,
      costo: tarifa.costo,
      message: `Costo de envío a ${tarifa.provincia}: $${tarifa.costo}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular envío', error: error.message });
  }
};

export const crearTarifa = async (req, res) => {
  try {
    const tarifa = new ShippingRate(req.body);
    await tarifa.save();
    res.status(201).json(tarifa);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarifa', error: error.message });
  }
};
