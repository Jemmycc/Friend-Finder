var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

//listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, './app/public')));


// Add the application routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

