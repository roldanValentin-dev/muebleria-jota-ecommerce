import Product from '../models/Product.model.js';


//get /api /productos - obtener todos los productos
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// GET /api/productos/:id - Obtener un producto por ID
export const getProductById = async (req, res, next) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(producto);
  } catch (error) {
    next(error);
  }
};
// post /api/productos  CREATE crear producto

export const createProduct = async (req, res, next) => {
  try {
    const producto = await Product.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
}
// PuT/ UPDATE actualizar producto con ID
export const updateProduct = async (req, res, next) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(producto);
  } catch (error) {
    next(error);
  }
}
//DELETE/API/ DELETE eliminar producto con ID

export const deleteProduct = async (req, res, next) => {
  try {

    const producto = await Product.findByIdAndDelete(req.params.id);

    if (!producto) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    next(error);
  }

}