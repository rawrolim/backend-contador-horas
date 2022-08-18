const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.URL_MONGO_PRD;
mongoose.connect(''+process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;