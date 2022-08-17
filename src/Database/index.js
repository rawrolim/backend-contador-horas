const mongoose = require("mongoose");
require('dotenv').config();

//const uri = "mongodb+srv://rawrolim:CSRR1j47xo68fWMr@cluster1.ftinoos.mongodb.net/contador-horas?retryWrites=true&w=majority";
mongoose.connect(''+process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;