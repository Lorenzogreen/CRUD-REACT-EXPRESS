const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const personnel = require('./route/projet-node/personnel');



app.use(express.static("Public"));

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());

app.use('/personnel', personnel)


module.exports = app;