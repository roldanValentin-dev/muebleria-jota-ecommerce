import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../config/api';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const response = await api.get('/api/favoritos');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const addFavorite = async (productoId) => {
    try {
      const response = await api.post('/api/favoritos', { productoId });
      setFavorites(response.data);
      return true;
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      return false;
    }
  };

  const removeFavorite = async (productoId) => {
    try {
      const response = await api.delete(`/api/favoritos/${productoId}`);
      setFavorites(response.data);
      return true;
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      return false;
    }
  };

  const isFavorite = (productoId) => {
    return favorites.some(fav => fav._id === productoId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
