const express = require('express');

const db = require("../db");
const upload_image = require('../services/img_upload');

const user = express.Router();
const root = express.Router();
const post = express.Router();

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
            if(err) {
                return res.status(500).send(err);
            }
            await upload_image(path);
            return res.send({status: "Success", path: path});
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
};
