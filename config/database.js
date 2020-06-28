/* eslint-disable no-console */
const Sequelize = require('sequelize');

const {
  DB,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const connection = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// set up a table

connection
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    console.log('MySQL connection successful');
  })
  .catch((err) => {
    console.log('MySQL connection failed with error', err);
  });

module.exports = connection;

/* Can't get this approach to work yet - see the
 * Sequelize pluralsight course
*/
