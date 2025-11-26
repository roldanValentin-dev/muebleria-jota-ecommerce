import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  descuento: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaExpiracion: {
    type: Date,
    default: null
  },
  usosMaximos: {
    type: Number,
    default: null
  },
  usosActuales: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

couponSchema.methods.esValido = function() {
  if (!this.activo) return false;
  if (this.fechaExpiracion && new Date() > this.fechaExpiracion) return false;
  if (this.usosMaximos && this.usosActuales >= this.usosMaximos) return false;
  return true;
};

export default mongoose.model('Coupon', couponSchema);
