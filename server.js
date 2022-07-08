const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;


//assets
app.use(express.static('public'));
app.get("/", (req, res) => {
    res.render("home")
})

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "./resources/views"));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log("server is running on PORT: ", port);
})