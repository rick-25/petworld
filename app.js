const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require("./routes");


let app = express(); //Express app


//Adding middlewares
app.use(require("morgan")("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//Adding routes
app.use("/user", routes.user);


//Starting server
app.listen(process.env.PORT || 3300, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 3300}/`)
});