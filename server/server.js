const app = require('./app');
const colors = require('colors');
const dotenv = require('dotenv');
const connectToDB = require('../mongodb/connect.to.db');
connectToDB();

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(colors.blue(`APP IS LISTENING ON PORT ${PORT}`));
});
