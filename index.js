let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./src/api-routes");
let path = require('path');
let cors = require('cors');

// Setup server port
const port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Use Api routes in the App
app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb+srv://db_admin_b:KAzLfk9jSp6D2Qsd@cluster0.7uict.gcp.mongodb.net/<db-name>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((_) => {
        const db = mongoose.connection;
        mongoose.set('useFindAndModify', false);
        if (!db) {
            app.listen(port, () => {
                console.log(
                    `Server is running at http://localhost:${port} without db`
                );
            });
        } else {
            app.listen(port, () => {
                console.log(
                    `Server is running at http://localhost:${port} with db`
                );
            });
        }
    });


module.exports = app;