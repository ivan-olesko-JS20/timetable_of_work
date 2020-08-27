const express = require('express')
const app = express()
const session = require('express-session')

const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./db');
const User = require('./models/user');

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static('public'));

app.use(session({ //библиотека express-session - мидлвер для сессий
  secret: 'dfgiodhgosjgopsjgpowejf345345',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 6000000 }
}));


app.listen(3333, () => {
  console.log('work 3333');
})

app.get('/', (req, res) => {
  res.render('signin');
});

app.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.password === password) {
      req.session.user = findUser;
      const users = await User.find();
      console.log(users);
      res.render('mainscreen', { users });
    }
  } else {
    res.redirect('/');
  }
});




