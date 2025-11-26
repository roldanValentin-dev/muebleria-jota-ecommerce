import Favorite from '../models/Favorite.model.js';
import Product from '../models/Product.model.js';

export const getFavorites = async (req, res, next) => {
  try {
    let favorite = await Favorite.findOne({ usuario: req.userId }).populate('productos');
    if (!favorite) {
      favorite = await Favorite.create({ usuario: req.userId, productos: [] });
    }
    res.json(favorite.productos);
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { productoId } = req.body;
    
    const producto = await Product.findById(productoId);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    let favorite = await Favorite.findOne({ usuario: req.userId });
    if (!favorite) {
      favorite = await Favorite.create({ usuario: req.userId, productos: [productoId] });
    } else {
      if (favorite.productos.includes(productoId)) {
        return res.status(400).json({ message: 'Producto ya está en favoritos' });
      }
      favorite.productos.push(productoId);
      await favorite.save();
    }

    await favorite.populate('productos');
    res.json(favorite.productos);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { productoId } = req.params;

    const favorite = await Favorite.findOne({ usuario: req.userId });
    if (!favorite) {
      return res.status(404).json({ message: 'No tienes favoritos' });
    }

    favorite.productos = favorite.productos.filter(p => p.toString() !== productoId);
    await favorite.save();
    await favorite.populate('productos');

    res.json(favorite.productos);
  } catch (error) {
    next(error);
  }
};
