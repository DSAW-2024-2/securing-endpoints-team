const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoute = require('./Routes/user');
productRoute = require('./Routes/product');
orderRoute = require('./Routes/order');

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.use((req, res) => {
  res.status(404).send('Not found');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
