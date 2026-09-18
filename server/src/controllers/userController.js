// Importar la conexión a la base de datos MySQL
const db = require('../config/db');

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
    const query = 'SELECT id, nombre, email, rol, created_at FROM usuarios';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
        }
        res.status(200).json(results);
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nombre, email, rol, created_at FROM usuarios WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ mensaje: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Por favor completa los campos obligatorios' });
    }

    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, email, password, rol || 'cliente'], (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            return res.status(500).json({ mensaje: 'Error al crear el usuario' });
        }
        res.status(201).json({ mensaje: 'Usuario creado con éxito', id: result.insertId });
    });
};

// Actualizar un usuario existente
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    const query = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
    db.query(query, [nombre, email, rol, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
    });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    });
};
