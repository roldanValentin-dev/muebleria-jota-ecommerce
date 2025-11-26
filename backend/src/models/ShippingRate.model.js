import mongoose from 'mongoose';

const shippingRateSchema = new mongoose.Schema({
  provincia: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  costo: {
    type: Number,
    required: true,
    min: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('ShippingRate', shippingRateSchema);
