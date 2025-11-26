import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from '../models/Coupon.model.js';
import ShippingRate from '../models/ShippingRate.model.js';

dotenv.config();

const cupones = [
  {
    codigo: 'JOTA10',
    descuento: 10,
    activo: true,
    usosMaximos: 100
  },
  {
    codigo: 'JOTA20',
    descuento: 20,
    activo: true,
    usosMaximos: 50
  },
  {
    codigo: 'PRIMERACOMPRA',
    descuento: 15,
    activo: true,
    usosMaximos: 200
  },
  {
    codigo: 'VERANO2025',
    descuento: 25,
    activo: true,
    fechaExpiracion: new Date('2025-12-31'),
    usosMaximos: 150
  }
];

const tarifasEnvio = [
  { provincia: 'Buenos Aires', costo: 2000, activo: true },
  { provincia: 'CABA', costo: 1500, activo: true },
  { provincia: 'Córdoba', costo: 3000, activo: true },
  { provincia: 'Santa Fe', costo: 2500, activo: true },
  { provincia: 'Mendoza', costo: 3500, activo: true },
  { provincia: 'Tucumán', costo: 3000, activo: true },
  { provincia: 'Entre Ríos', costo: 2800, activo: true },
  { provincia: 'Salta', costo: 3200, activo: true },
  { provincia: 'Neuquén', costo: 4000, activo: true },
  { provincia: 'Otras', costo: 4000, activo: true }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Coupon.deleteMany({});
    await ShippingRate.deleteMany({});
    console.log('🗑️  Colecciones limpiadas');

    // Insertar cupones
    await Coupon.insertMany(cupones);
    console.log(`✅ ${cupones.length} cupones insertados`);

    // Insertar tarifas de envío
    await ShippingRate.insertMany(tarifasEnvio);
    console.log(`✅ ${tarifasEnvio.length} tarifas de envío insertadas`);

    console.log('🎉 Base de datos poblada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
