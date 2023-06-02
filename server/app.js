const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.get("/", (req, res) =>{
    res.send({
        success: true,
        message: "APP IS WORKING FINE!!"
    })
})

module.exports = app;