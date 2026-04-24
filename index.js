const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Base de datos 
const db = new sqlite3.Database('./inventaio.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Conectado a SQLite');
});

// Crear tabla 
db.run(`CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  precio DOUBLE,
  stock INTEGER
)`);

// ===== CRUD =====

// CREATE 
app.post('/productos', (req, res) => {
  const { nombre, edad, curso } = req.body;
  db.run(
    `INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)`,
    [nombre, edad, curso],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send('producto Registrado');
    }
  );
});

// READ
app.get('/productos', (req, res) => {
  db.all(`SELECT * FROM productos`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// READ por ID
app.get('/productos/:id', (req, res) => {
  db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, row) => {
    if(err) return res.status(500).send(err.message);
    res.json(row);
  });
});

// UPDATE 
app.put ('/productos/:id', (req, res) => {
  const { nombre, edad, curso } = req.body;
  db.run(
    'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
    [nombre, edad, curso, req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send('Producto Actualizado');
    }
  );
});

// DELETE 
app.delete('/productos/:id', (req, res) => {
  db.run('DELETE FROM productos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.send('Producto Eliminado');
  });
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});