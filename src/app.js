const express = require('express');
const bodyParser = require('body-parser');
const index = require('./Routes/index');
const api = require('./Routes/api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', index);
app.use('/api', api);

module.exports = app;