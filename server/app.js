const express = require('express');
const app = express();
const cors = require('cors');
const { notFound, errorHandler } = require('../middlewares/error.middleware');
const authRoute = require('../routes/authentication/authentication.route');
const todoRoute = require('../routes/todo/todo.routes');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'APP IS WORKING FINE!!'
  });
});

app.use('/api/authenticate', authRoute);
app.use('/api/todo', todoRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
