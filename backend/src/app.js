// backend/src/app.js

// --- Importaciones de Módulos Externos ---
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Importaciones de Módulos Propios ---
import productosRouter from './routes/productos.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandlers.js';

// --- Workaround para __dirname en ES Modules ---
// Necesario para que el servidor sepa la ruta absoluta de nuestro proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Inicialización de la App ---
const app = express();

// --- Middlewares ---
app.use(cors()); // Permite la comunicación entre dominios (frontend y backend)
app.use(express.json()); // Permite al servidor interpretar el body de las peticiones como JSON
app.use(morgan('dev')); // Logger profesional para ver las peticiones en consola

// --- Servidor de Archivos Estáticos ---
// Le dice a Express que la carpeta 'public' contiene archivos accesibles desde el navegador
app.use(express.static(path.join(__dirname, '..', 'public')));
// --- Servidor de Archivos Estáticos ---
const publicPath = path.join(__dirname, '..', 'public');

// LÍNEA ESPÍA: Esto imprimirá la ruta absoluta en la consola del backend.
console.log(`[DEBUG] El servidor está sirviendo archivos estáticos desde: ${publicPath}`);

// --- Ruta de Bienvenida ---
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido a la API de Mueblería Jota!',
    integrantes: [
      'Valentin Roldan',
      'Santiago Vittori',
      'Tomás Cielli',
      'Matías Páez',
      'Gabriel Valdez',
    ],
    version: '1.0.0'
  });
});

// --- Rutas de la API ---
// Delega todas las peticiones que empiecen con "/api/productos" a nuestro router
app.use('/api/productos', productosRouter);

// ---Manejadores de Errores ---
// Estos deben ir al final, después de todas las rutas
app.use(notFound); // Atrapa las peticiones a rutas no existentes (404)
app.use(errorHandler); // Atrapa cualquier error que ocurra en la aplicación (500)

// --- Exportación ---
export default app;