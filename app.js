const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const routes = require("./routes");

const cookie_auth = require('./services/cookies_auth');


let app = express(); //Express app


//Adding middlewares
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload({ createParentPath: true }));



//Serving public folder 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));


//Adding routes
app.use("/api", routes.api);


//Routes which requries auth 
app.use(cookie_auth);
app.use("/user", routes.user);
app.use("/post", routes.post);



//Starting server
app.listen(process.env.PORT || 3300, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3300}/`)
});
