const User = require('./models/User');

//environment vars import
require('dotenv').config();

//routes import
const express = require('express');
const routes = require('./routes');

//Autentication import
const passport = require('passport');
const session = require('express-session');
const initializatePassport = require('./passport-config');
const cookieParser = require('cookie-parser');


//data base import
const mongoose = require('mongoose');

//port acess import
const cors = require('cors');



//app inicializacion
const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//---------------------------------------Midleware-------------------------------------------
//using and setting routes
app.use(express.json());

//use port acess controll
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}));

//setting express session //login
app.use(session({
    secret: process.env.SECRET,
    resave : false,
    saveUninitialized : false
}));

//setting passport //login
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());

//setting passport initialization
initializatePassport(
    passport,
    email => User.findOne({email : email}),
    id => User.findOne({id : id}),
);

//Links
app.use(routes);

//chosing port
app.listen(process.env.PORT);