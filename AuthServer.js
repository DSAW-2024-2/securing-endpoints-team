require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Authentication

app.post('/login', (req, res) => {
  //Authenticate User

  const email = req.body.email;
  const user = {username: email};

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({accessToken: accessToken})
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});