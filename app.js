const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const routes = require("./routes");


let app = express(); //Express app


//Adding middlewares
app.use(require("morgan")("tiny"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true,
}));



//Serving public folder 
app.use('/static', express.static(path.join(__dirname, 'public')));


//Adding routes
app.use("/", routes.root);
app.use("/user", routes.user);
app.use("/post", routes.post);
app.use("/api", routes.api);

app.get("/test", async (req, res) => {
    const db = require('./models');
    let me = await db.user.create({
        email: "temp@gmail.com",
        password: "1",
        name: "1",
        address: "1"
    });
    res.send(me);
})


//Starting server
app.listen(process.env.PORT || 3300, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3300}/`)
});
