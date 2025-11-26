import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

favoriteSchema.index({ usuario: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
