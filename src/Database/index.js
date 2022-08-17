const mongoose = require("mongoose");

//const uri = "mongodb+srv://rawrolim:CSRR1j47xo68fWMr@cluster1.ftinoos.mongodb.net/contador-horas?retryWrites=true&w=majority";
mongoose.connect('mongodb://rawrolim:MACAhell2704@localhost:27017/contador-horas', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;