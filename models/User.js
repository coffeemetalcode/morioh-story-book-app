const Sequelize = require('sequelize');

const User = {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  googleId: Sequelize.STRING,
  displayName: Sequelize.STRING,
  image: Sequelize.STRING,
};

module.exports = User;
