const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();

const connectToMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      colors.yellow(
        `CONNECTED TO DATABASE SUCCESSFULLY ${connection.Connection.name.toUpperCase()}!!!`
      )
    );
  } catch (err) {
    console.log(colors.red(`CANNOT CONNECT TO DB!!!`));
  }
};

module.exports = connectToMongo;
