const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));

const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port,
    () =>
        console.log(`Started server at http://localhost:${port}`));
