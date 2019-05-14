var express = require('express');
var bodyParser = require("body-parser");
var  mongoDB = require('./config/data-base.js')
var mongoose = require('mongoose');

var r=require( './route/Route.js').route
var cors = require("cors");

mongoose.Promise = global.Promise;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Connecting to the database
mongoose.connect(mongoDB.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Base de données connectée");    
}).catch(err => {
    console.log('Impossible de se connecter à la DB...', err);
    process.exit();
});

r(app)
app.listen(8080);
