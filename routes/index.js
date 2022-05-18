const express = require('express');
const multer = require('multer');

const { Op, where } = require('sequelize');

const DB = require('../models');

const generateSID = require('../services/sid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage });

const user = express.Router();
const post = express.Router();
const api = express.Router();


api.post("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(404).send("Login Failed");
        return;
    }

    const query_result = await DB.user.findOne({
        where: { email: email },
        attributes: ['password']
    });


    if (query_result && query_result.password === password) {

        const sid = generateSID();

        res.cookie("sid", sid);
        res.cookie("id", email);

        try {
            await DB.user.update({ sid }, { where: { email } });
            res.redirect("/feed.html");
        } catch (error) {
            res.status(404).send(error);
        }

    } else {
        res.status(404).send("Login Failed!");
    }

});

api.post("/signup", upload.single("profile_pic"), async (req, res) => {

    try {
        await DB.user.create({
            ...req.body,
            profile_pic: req.file.path
        });
        res.redirect("/signin.html");
    } catch (error) {
        res.status(500).send(error);
    }
});

api.get("/logout", async (req, res) => {
    res.clearCookie();
    res.redirect("../signin.html");
});

api.get("/activate", async (req, res) => {
    const hash = req.query.hash;

    if (!hash) {
        res.status(404).send("Invalid Request!");
        return;
    }

    res.send(hash);
});



user.route("/")
    .get(async (req, res) => {
        const email = req.cookies.id;
        try {
            const response = await DB.user.findOne({ where: { email }, attributes: ['name', 'address', 'profile_pic'] });
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    });


post.route("/")
    .get(async (req, res) => {

        const email = req.query.email;
        const animal = req.query.animal;
        const breed = req.query.breed;
        const age = req.query.age;
        const address = req.query.address;

        let where_conditions = {};

        if (email) where_conditions.email = email;
        if (animal) where_conditions.animal = {
            [Op.like]: `%${animal}%`
        }
        if (breed) where_conditions.breed = {
            [Op.like]: `%${breed}%`
        }
        if (age) where_conditions.age = age;
        if (address) where_conditions.address = {
            [Op.like]: `%${address}%`
        }

        try {
            const query_response = await DB.post.findAll({ where: where_conditions });
            res.send(query_response);
        } catch (error) {
            res.status(500).send("Interal server error");
        }
    })
    .post(upload.single("image"), async (req, res) => {

        try {
            const query_response = await DB.post.create({
                ...req.body,
                image: req.file.path
            });
            res.send(query_response);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete(async (req, res) => {


        if (!req.body || !req.body.id) {
            res.status(404);
            return;
        }

        try {
            const query_response = await DB.post.destroy({
                where: { id: req.body.id }
            });
            res.send(`Deleted ${query_response} rows`);
        } catch (error) {
            res.send(error);
        }
    });


module.exports = { user, post, api };
