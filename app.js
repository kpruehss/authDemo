const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth_demo_app');

const app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

app.listen(app.get('port'), () => {
  console.log('Server started');
});
