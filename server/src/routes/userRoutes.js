const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definición de las rutas CRUD para Usuarios
router.get('/', userController.getUsers);           // Obtener lista de usuarios
router.get('/:id', userController.getUserById);     // Obtener usuario por ID
router.post('/', userController.createUser);        // Crear un usuario
router.put('/:id', userController.updateUser);      // Actualizar usuario
router.delete('/:id', userController.deleteUser);   // Eliminar usuario

module.exports = router;
