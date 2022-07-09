const express = require("express");
const ejs = require("ejs");
require('dotenv').config();
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = express();
const path = require("path");
const session = require("express-session");
const port = process.env.PORT || 5000;

//database connection
const url = 'mongodb://localhost/foods';
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
})
//session config
app.use(session({
    secret: ""
}))
//assets
app.use(express.static('public'));


//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "./resources/views"));
app.set('view engine', 'ejs');

require("./routes/web")(app)

app.listen(port, () => {
    console.log("server is running on PORT: ", port);
})