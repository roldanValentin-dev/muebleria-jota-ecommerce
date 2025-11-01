import 'dotenv/config';
import { connectDB } from '../config/database.js';
import Product from '../models/Product.model.js';
import {products} from '../data/products.js';

const seedProducts = async () =>{
    try {
        await connectDB();
        await Product.deleteMany({});
        console.log("productos anteriores eliminados");

        const productosAInsertar = products.map(p=>({
            
            nombre: p.nombre
            ,imagenUrl: p.imagenUrl
            ,descripcion: p.descripcion
            ,medidas: p.medidas
            ,materiales: p.materiales
            ,acabado: p.acabado
            ,peso :p.peso
            ,capacidad : p.capacidad
            ,precio: p.precio
            ,stock: 10
        }));
        await Product.insertMany(productosAInsertar);
        console.log("productos insertados");
        process.exit(0);
    } catch (error) {
        console.log("Error:",error.message);
        process.exit(1);
    }
}

seedProducts();