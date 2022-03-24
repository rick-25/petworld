const express = require('express');
const db = require("../db");

const user = express.Router();

user.route("/")
    .get(async (req, res) => {
        if (await db.auth_user(req.query)) {
            res.send("Succues!");
        } else {
            res.send("Error!");
        }
    })
    .post(async (req, res) => {
        if(await db.add_user(req.body)) res.send("User Added!");
        else res.send("Error!");
    });

module.exports = {
    user
};