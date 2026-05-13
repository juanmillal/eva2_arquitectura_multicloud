const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de conexión a PostgreSQL (usa los nombres del docker-compose)
const pool = new Pool({
  user: 'postgres',
  host: 'db-server', // Nombre del servicio en Docker
  database: 'cruz_azul_db',
  password: 'tu_password',
  port: 5432,
});

// Endpoint para obtener productos (GET)
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
  const { nombre, stock, precio } = req.body;
  try {
    await pool.query('INSERT INTO productos (nombre, stock, precio) VALUES ($1, $2, $3)', [nombre, stock, precio]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(80, () => {
  console.log('Servidor ERP Cruz Azul corriendo en puerto 80');
});