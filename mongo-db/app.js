/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

/* Load Config */
dotenv.config({ path: './config/config.env' });

/* Load Passport Config */
require('./config/passport')(passport);

connectDB();

const PORT = process.env.PORT || 4002;

const app = express();

/* Body Parser */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Method Override */
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // eslint-disable-next-line no-underscore-dangle
    const method = req.body._method;
    // eslint-disable-next-line no-underscore-dangle
    delete req.body._method;
    return method;
  }
}));

/* Logging */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Helpers */
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs');

/* Handlebars */
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  },
  defaultLayout: 'main',
  extname: '.hbs',
}));

/* Sessions */
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

/* Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Global Variables */
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/* Static Folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

app.listen(PORT, () => {
  console.log(`server up and running in ${process.env.NODE_ENV} on port ${PORT}`);
});

// 2:10:48
