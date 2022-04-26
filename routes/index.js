const express = require('express');

const db = require("../db");
const DB = require('../models');

const upload_image = require('../services/img_upload');

const user = express.Router();
const root = express.Router();
const post = express.Router();
const api = express.Router();

 
api.post("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(404).send("Login Failed");
        return;
    }

    const query_result = await DB.user.findOne({ where: { email: email }, attributes: ['password'] });

    if (query_result && query_result.password === password) {
        res.send("Login Succesful!");
    } else {
        res.status(404).send("Login Failed!");
    }

});

api.post("/signup", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;

    if (!email || !password || !name || !address) {
        res.status(404).send("Signup Failed!");
        return;
    }

    let query_response = await DB.user.create({
        email: email,
        password: password,
        name: name,
        address: address,
    });

    res.send(JSON.stringify(query_response));
});


root.route("/")
    .get((req, res) => {
        res.redirect("/static/signin.html");
    });

user.route("/")
    .get(async (req, res) => {
        if (await db.auth_user(req.query)) {
            res.send("Succues!");
        } else {
            res.send("Error!");
        }
    })
    .post(async (req, res) => {
        if (await db.add_user(req.body)) res.sendStatus(200);
        else res.sendStatus(404);
    });

user.route("/:img")
    .post(async (req, res) => {
        const img_file = req.files.image;
        img_file.data.name = img_file.name;

        const path = __dirname + "/../files/" + img_file.name;
        img_file.mv(path, async (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            await upload_image(path);
            return res.send({ status: "Success", path: path });
        });
    });


post.route("/")
    .get(async (req, res) => {
        res.send("Route working");
    })
    .post(async (req, res) => {
        res.send("OKidoki");
    });


module.exports = {
    root,
    user,
    post,
    api,
};
