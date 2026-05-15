const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


const pool = new Pool({
  user: 'admin_cruzazul',
  host: '54.88.0.187', 
  database: 'farmacia_db',
  password: 'password123',
  port: 5432,
});

// Endpoint para consultar productos (GET)
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint para insertar productos (POST)
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    await pool.query('INSERT INTO productos (nombre, precio) VALUES ($1, $2)', [nombre, precio]);
    res.redirect('/'); // Recarga la página tras guardar
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(80, () => {
  console.log('Servidor ERP Cruz Azul corriendo en puerto 80');
});