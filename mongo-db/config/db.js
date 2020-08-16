/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`connection to mongodb on host ${mongo.connection.host} successful!`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
