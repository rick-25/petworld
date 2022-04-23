const express = require('express');
const db = require("../db");

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


post.route("/") 
    .get(async (req, res) => {

    })
    .post(async (req, res) => {

    });


module.exports = {
    root,
    user,
    post,
};
