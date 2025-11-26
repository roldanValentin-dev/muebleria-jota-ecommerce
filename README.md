<div align="center">
  <img src="./client/public/assets/logo.svg" alt="Mueblería Hermanos Jota" width="200"/>
  
  # 🛋️ E-Commerce — Mueblería Hermanos Jota
  
  **La nueva experiencia de comprar muebles online**  
  _Un proyecto de nuestro equipo, diseñado para transformar la manera de conectar con el hogar._
  
  ---
</div>

## 🚀 Tecnologías utilizadas

<div align="center">
<table>
  <tr>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50" height="50" alt="HTML5"/><br/>
      <b>HTML5</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" height="50" alt="CSS3"/><br/>
      <b>CSS3</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50" alt="JavaScript"/><br/>
      <b>JavaScript</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React"/><br/>
      <b>React</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" height="50" alt="MongoDB"/><br/>
      <b>MongoDB</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50" alt="Node.js"/><br/>
      <b>Node.js</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50" height="50" alt="Express"/><br/>
      <b>Express</b>
    </td>
    <td align="center" width="120">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="50" height="50" alt="GitHub"/><br/>
      <b>GitHub</b>
    </td>
  </tr>
</table>
</div>

---

## ✨ Funcionalidades Implementadas

### Funcionalidades Básicas (Requeridas)
- ✅ **Catálogo de productos** con filtros por categoría, precio y búsqueda
- ✅ **Carrito de compras** con control de cantidad y persistencia
- ✅ **Sistema de autenticación** (registro, login, JWT)
- ✅ **Gestión de pedidos** (crear, ver historial, cancelar)
- ✅ **Panel de administración** con roles (cliente/admin)
- ✅ **CRUD de productos** (solo admin)
- ✅ **Gestión de stock** automática
- ✅ **Diseño responsive** (mobile-first)

### Funcionalidades Extra (Plus)
- ⭐ **Sistema de favoritos** con persistencia en BD
- ⭐ **Sistema de cupones** con validación y descuentos
- ⭐ **Cálculo de envío** por provincia
- ⭐ **Perfil de usuario** editable (nombre, email, contraseña)
- ⭐ **Skeletons de carga** con animaciones
- ⭐ **Página 404** personalizada
- ⭐ **Rate limiting** en autenticación (seguridad)
- ⭐ **Accesibilidad** (ARIA labels, autocomplete)
- ⭐ **Estadísticas** en panel admin (productos, pedidos, ingresos)
- ⭐ **Gestión de estados de pedidos** (pendiente, procesando, completado, cancelado)

---

## 💻 Desarrollado por

- [Valentín Roldán](https://github.com/roldanValentin-dev)

---

## 📅 Estado del proyecto

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-DESPLEGADO-success?style=for-the-badge&logo=vercel" />
</p>

---

## 🌐 Demo en Vivo

- **🖥️ Frontend:** [https://muebleria-jota-ecommerce.vercel.app/](https://muebleria-jota-ecommerce.vercel.app/)
- **⚙️ Backend API:** [https://muebleria-jota-ecommerce-6anh.onrender.com/api/productos](https://muebleria-jota-ecommerce-6anh.onrender.com/api/productos)

> **Nota:** El backend está en un plan gratuito de Render, por lo que puede tardar 30-60 segundos en responder la primera vez (cold start).

---

## 🚀 Instalación Local

### Requisitos Previos
- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/roldanValentin-dev/muebleria-jota-ecommerce.git
cd muebleria-jota-ecommerce
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```env
MONGODB_URI=tu_uri_de_mongodb
PORT=2000
NODE_ENV=development
JWT_SECRET=tu_secreto_jwt
FRONTEND_URL=http://localhost:5173
```

Iniciar servidor:
```bash
npm run dev
```

### 3. Configurar Frontend
```bash
cd client
npm install
```

Crear archivo `.env` en la carpeta `client`:
```env
VITE_API_URL=http://localhost:2000
```

Iniciar aplicación:
```bash
npm run dev
```

### 4. Poblar Base de Datos (Opcional)
```bash
cd backend
npm run seed:products
npm run seed:coupons
```

### 5. Crear Usuario Administrador

Edita `backend/src/scripts/createAdmin.js` con el email del usuario que quieres promover a admin y ejecuta:
```bash
cd backend
npm run create:admin
```

---

## 👤 Credenciales de Prueba

### Usuario Admin
- **Email:** admin@gmail.com
- **Contraseña:** admin123

### Cupones Disponibles
- `JOTA10` - 10% de descuento
- `JOTA20` - 20% de descuento
- `PRIMERACOMPRA` - 15% de descuento
- `VERANO2025` - 25% de descuento (expira 31/12/2025)

---

## 📚 Estructura del Proyecto

```
muebleria-jota-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── scripts/
│   │   └── app.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── config/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🛠️ Scripts Disponibles

### Backend
```bash
npm run dev          # Iniciar servidor en modo desarrollo
npm run seed:products # Poblar productos
npm run seed:coupons  # Poblar cupones y tarifas de envío
npm run create:admin  # Crear usuario administrador
```

### Frontend
```bash
npm run dev          # Iniciar aplicación en modo desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
```
