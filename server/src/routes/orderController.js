// orderController.js
const pool = require('../config/db');

// 1. CREAR UN NUEVO PEDIDO (POST)
const createOrder = async (req, res) => {
  const { usuario_email, total, items } = req.body;

  if (!usuario_email || !total || !items || items.length === 0) {
    return res.status(400).json({ 
      mensaje: 'error en pedidos', 
      detalle: 'Todos los campos son obligatorios y debe incluir productos' 
    });
  }

  // Obtener conexión del pool para iniciar la transacción
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insertar el pedido principal
    const [resultadoPedido] = await connection.query(
      'INSERT INTO pedidos (usuario_email, total, estado) VALUES (?, ?, ?)',
      [usuario_email, total, 'pendiente']
    );
    
    const pedidoId = resultadoPedido.insertId;

    // Insertar cada artículo del carrito en el detalle del pedido
    for (const item of items) {
      await connection.query(
        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [pedidoId, item.producto_id, item.cantidad, item.precio_unitario]
      );
    }

    // Si todo sale bien, confirmar los cambios en la base de datos
    await connection.commit();
    return res.status(201).json({ 
      mensaje: 'Pedido creado satisfactoriamente', 
      id_pedido: pedidoId 
    });

  } catch (error) {
    // Si algo falla, revertir cualquier inserción incompleta
    await connection.rollback();
    return res.status(500).json({ mensaje: 'error en pedidos', detalle: error.message });
  } finally {
    connection.release(); // Devolver la conexión al pool
  }
};

// 2. OBTENER TODOS LOS PEDIDOS (GET)
const getOrders = async (req, res) => {
  try {
    const [pedidos] = await pool.query('SELECT * FROM pedidos ORDER BY creado_en DESC');
    return res.status(200).json({ mensaje: 'lectura satisfactoria', data: pedidos });
  } catch (error) {
    return res.status(500).json({ mensaje: 'error en pedidos', detalle: error.message });
  }
};

// 3. OBTENER UN PEDIDO POR ID CON SUS DETALLES (GET)
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const [pedidoFila] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    
    if (pedidoFila.length === 0) {
      return res.status(404).json({ mensaje: 'error en pedidos', detalle: 'Pedido no encontrado' });
    }

    // Traer la lista de productos comprados en esa orden específica
    const [detalles] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [id]);

    return res.status(200).json({
      mensaje: 'lectura satisfactoria',
      pedido: pedidoFila[0],
      productos: detalles
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'error en pedidos', detalle: error.message });
  }
};

// 4. ACTUALIZAR ESTADO DE UN PEDIDO (PATCH)
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; 

  if (!estado) {
    return res.status(400).json({ mensaje: 'error en pedidos', detalle: 'El campo estado es requerido' });
  }

  try {
    const [resultado] = await pool.query(
      'UPDATE pedidos SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'error en pedidos', detalle: 'Pedido no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Pedido actualizado satisfactoriamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'error en pedidos', detalle: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder };
