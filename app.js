const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Base de datos SQLite
const sequelize = new Sequelize({ 
    dialect: 'sqlite', 
    storage: './database.sqlite' 
});

// 2. Definición del Modelo
const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
});

// 3. Rutas de la API
app.get('/productos', async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
});

app.post('/productos', async (req, res) => {
    const nuevo = await Producto.create(req.body);
    res.json(nuevo);
});

app.delete('/productos/:id', async (req, res) => {
    await Producto.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: "Eliminado" });
});

app.put('/productos/:id', async (req, res) => {
    await Producto.update(req.body, { where: { id: req.params.id } });
    res.json({ mensaje: "Actualizado" });
});

// 4. Sincronización e Inicio (Corregido a puerto 3000)
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('✅ Servidor de Inventario funcionando en: http://localhost:3000');
    });
});