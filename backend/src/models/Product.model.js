import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripsion es obligatoria'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
    },
    imagenUrl: {
        type: String,
        trim: true
    },
    imagenUrl: {
        type: String,
        trim: true
    },
    medidas: String,
    materiales: String,
    acabado: String,
    peso: String,
    capacidad: String
}, {
    timestamps: true
});
export default mongoose.model('Product', productSchema);