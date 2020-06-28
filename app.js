/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const user = require('./models/User');

/* Load Config */
dotenv.config({ path: './config/config.env' });

/* Passport Config */
require('./config/passport')(passport);

const PORT = process.env.PORT || 4002;
const {
  DB,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const app = express();

/*  Logging */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Handlebars */
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

/* Sessions */
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

/* Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Static Folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const connection = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// const User = connection.define('User', user);

connection
  .sync({
    logging: console.log,
    force: true,
  })/*
  .then(() => {
    User.create({
      googleId: '1',
      displayName: 'test user 1',
      image: 'image url of test user 1',
    });
  }) */ // <-- test user works
  .then(() => {
    console.log('MySQL connection successful');
  })
  .catch((err) => {
    console.log('MySQL connection failed with error', err);
  });

// console.log(passport.authenticate());

app.listen(PORT, () => {
  console.log(process.env.NODE_ENV, 'server is up and running on port', PORT);
});
