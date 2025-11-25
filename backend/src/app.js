// backend/src/app.js

// --- Importaciones de Módulos Externos ---
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

// --- Importaciones de Módulos Propios ---
import productosRouter from './routes/productos.routes.js';
import authRouter from './routes/auth.routes.js';
import ordersRouter from './routes/orders.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandlers.js';

// --- Workaround para __dirname en ES Modules ---
// Necesario para que el servidor sepa la ruta absoluta de nuestro proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Inicialización de la App ---
const app = express();

// --- Middlewares ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://muebleria-jota-ecommerce.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// --- Rate Limiting ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Demasiados intentos, intenta de nuevo en 15 minutos' }
});

// --- Servidor de Archivos Estáticos ---
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
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
app.use('/api/productos', productosRouter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// ---Manejadores de Errores ---
app.use(notFound);
app.use(errorHandler);

// --- Exportación ---
export default app;