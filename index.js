let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./src/api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Use Api routes in the App
app.use('/', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;