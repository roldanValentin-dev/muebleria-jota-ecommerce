import { products } from "../data/products.js";

export const getAllProducts = (req,res) =>{
  res.json(products);
}

export const getProductById = (req, res, next) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    // Creamos un objeto de error
    const err = new Error(`Producto con id ${id} no encontrado`);
    // Le asignamos un status para que el errorHandler lo use
    err.status = 404;
    // Se lo pasamos al manejador de errores centralizado
    return next(err);
  }
  
  res.json(product);
};
//  CREATE crear producto
//  UPDATE actualizar producto con ID
// DELETE eliminar producto con ID