const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/userRoutes.js');
const requestLogger = require('./utilities/requestlogger');
const errorlogger = require('./utilities/errorlogger');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(requestLogger);
app.use('/', router);
app.use(errorlogger)
const appPort = 3000

app.listen(appPort);
console.log("Service Started at port:", appPort);