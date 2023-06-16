// import dependancies in app.js fiel
const express=require("express");
const rentifi=express();
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const user_routes=require("./routers/user_routes");
const admin_routes=require("./routers/admin_routes");
const pannel_routes=require("./routers/pannel_routes");
const website_routes=require("./routers/website_routes");




// middlewere setup
rentifi.set("view engine","ejs");
rentifi.set("views", path.join(__dirname, "views"));
rentifi.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
rentifi.set(path.join(__dirname, '/uploads'));
rentifi.engine('html', require('ejs').renderFile);
rentifi.use(express.static(path.join(__dirname, 'public')));


//create middlewere
rentifi.use(cors());
rentifi.use(express.json());
rentifi.use(cookieParser());
rentifi.use(session({secret:'my fdgfghbshanky',saveUninitialized: true,resave: true}));
//body parser using
rentifi.use(bodyParser.urlencoded({ extended:false }));
rentifi.use(bodyParser.json());


//setup routes
rentifi.use("/api",user_routes);
rentifi.use("/public",admin_routes);
rentifi.use("/public",pannel_routes);
rentifi.use("/website",website_routes);



//error handler
rentifi.use((err,req,res,next)=>{res.status(404).json({
       error:'bad request'})
 });


module.exports = rentifi;