import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nombre: String,
    precio: Number,
    cantidad: {
      type: Number,
      default: 1
    }
  }],
  subtotal: {
    type: Number,
    default: function() {
      return this.total;
    }
  },
  descuento: {
    porcentaje: { type: Number, default: 0 },
    monto: { type: Number, default: 0 },
    codigoCupon: { type: String, default: null }
  },
  envio: {
    provincia: { type: String, default: null },
    costo: { type: Number, default: 0 }
  },
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'procesando', 'completado', 'cancelado'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);