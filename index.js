const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));

const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);

const port = 3000;
app.listen(port,
    () =>
        console.log(`Started server at http://localhost:${port}`));
