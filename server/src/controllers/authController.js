// Controlador de Autenticación para The Closet
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// SERVICIO WEB DE REGISTRO
const registrarUsuario = async (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ 
      mensaje: 'error en la autenticación', 
      detalle: 'Todos los campos son obligatorios' 
    });
  }

  try {
    const [existente] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [usuario]);
    if (existente.length > 0) {
      return res.status(400).json({ 
        mensaje: 'error en la autenticación', 
        detalle: 'El usuario ya se encuentra registrado' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(contraseña, salt);

    await pool.query(
      'INSERT INTO usuarios (email, password) VALUES (?, ?)',
      [usuario, passwordHashed]
    );

    return res.status(201).json({ mensaje: 'Registro satisfactorio' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'error en la autenticación', detalle: error.message });
  }
};

// SERVICIO WEB DE INICIO DE SESIÓN
const loginUsuario = async (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'error en la autenticación' });
  }

  try {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [usuario]);
    if (filas.length === 0) {
      return res.status(401).json({ mensaje: 'error en la autenticación' });
    }

    const usuarioEncontrado = filas[0];
    const esValida = await bcrypt.compare(contraseña, usuarioEncontrado.password);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'error en la autenticación' });
    }

    return res.status(200).json({
      mensaje: 'autenticación satisfactoria',
      usuario: usuarioEncontrado.email
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'error en la autenticación' });
  }
};

module.exports = { registrarUsuario, loginUsuario };
      
