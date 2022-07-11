require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const flash = require('express-flash');
const session = require("express-session");
const MongoDbStore = require('connect-mongo');
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const app = express();
const path = require("path");
const passport = require('passport');
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
})


//session config
app.use(session({
    secret: process.env.SESSION_SECREAT,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.DB_URL
    }),
    saveUninitialized:false,
    cookie: {maxAge: 1000 * 60 * 60 * 24} //24 hours
}))
app.use(flash());
// passport config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//assets
app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.session = req.session
next();
})

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "./resources/views"));
app.set('view engine', 'ejs');

//web route
require("./routes/web")(app)

app.listen(port, () => {
    console.log("server is running on PORT: ", port);
})