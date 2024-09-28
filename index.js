require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
userRoute = require('./Routes/user');
productRoute = require('./Routes/product');
orderRoute = require('./Routes/order');

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

//Authentication

const accounts =[
  {
    "email": "admin@admin.com",
    "password": "admin"
  }
]

app.get('/accounts', authenticateToken, (req, res) => {
  res.json(accounts.filter(account => account.email === req.user.username ));
})

app.post('/login', (req, res) => {
  //Authenticate User

  const email = req.body.email;
  const user = {username: email};

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken: accessToken})
})

//token check
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]
  if(token == null){
    res.sendStatus(401);
  }

  //verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //check if token is valid
    if(err) {
      return res.sendStatus(403);
    }
    req.user =user;
    next();
  }
    
  )
}


app.use((req, res) => {
  res.status(404).send('Not found');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});