import app from './app.js';
import 'dotenv/config';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 2000;

const startServer = async ()=>{
  await connectDB();
  app.listen(PORT, ()=>{
    console.log(`servidor ecuchando en http://localhost:${PORT}`);
  })
}

startServer();