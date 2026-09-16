// Servidor principal de Express para The Closet 
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Middleware para procesar JSON
app.use(express.json());

// Enrutador de autenticación
app.use('/api/auth', authRoutes);

// Puerto de ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de The Closet ejecutándose en el puerto ${PORT}`);
});
