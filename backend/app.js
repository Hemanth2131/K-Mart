require('dotenv').config();

const express = require('express');
const cors = require('cors');


const adminProductRoutes = require('./routes/adminProductRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');



const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/admin', adminProductRoutes);
app.use('/api/admin', adminOrderRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;



