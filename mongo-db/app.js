/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');

const connectDB = require('./config/db');

/* Load Config */
dotenv.config({ path: './config/config.env' });

/* Load Passport Config */
require('./config/passport')(passport);

connectDB();

const PORT = process.env.PORT || 4002;

const app = express();

/* Logging */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Handlebars */
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

/* Sessions */
app.use(session({
  secret: 'secret',
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

app.listen(PORT, () => {
  console.log(`server up and running in ${process.env.NODE_ENV} on port ${PORT}`);
});

// 59:46
