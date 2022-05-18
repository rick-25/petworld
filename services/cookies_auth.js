const DB = require('../models/index');


module.exports = async (req, res, next) => {
    console.log("Passing through cookie verifier..");

    if(!req.cookies.id || !req.cookies.sid) {
        res.redirect("http://localhost:3300/signin.html");
        return;
    } 

    try {
        const response = await DB.user.findOne({where: {email: req.cookies.id}, attributes: ['sid']});
        if(response.sid != req.cookies.sid) {
            res.status(404).send("Auth failed!");
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
}