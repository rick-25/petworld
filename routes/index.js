const express = require('express');
const { Op, where } = require('sequelize');

const DB = require('../models');

const generateSID = require('../services/sid');


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
            await DB.user.update({ sid }, { where: {email} });
            res.redirect("/feed.html");
        } catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    
    } else {
        res.status(404).send("Login Failed!");
    }

});

api.post("/signup", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;

    try {
        let query_response = await DB.user.create({
            email: email,
            password: password,
            name: name,
            address: address,
        });
        res.send(JSON.stringify(query_response));
    } catch (error) {
        res.status(403).send("Database Error");
    }
});
api.get("/logout", async (req, res) => {
    // if(req.)
    try {
        await DB.user.update({ sid: null }, {
            where: {
                email: req.cookies.id
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
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
            const response = await DB.user.findAll({ where: { email } });
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
            console.log(query_response);
            res.send(query_response);
        } catch (error) {
            res.status(500).send("Interal server error");
        }
    })
    .post(async (req, res) => {
        const email = req.body.email;
        const animal = req.body.animal;
        const breed = req.body.breed;
        const age = req.body.age;
        const specification = req.body.specification;
        const address = req.body.address;
        const image = req.body.image;

        try {
            const query_response = await DB.post.create({
                email, animal, breed, age, specification, address, image,
            });
            console.log(query_response.toJSON());
            res.send(query_response);
        } catch (error) {
            res.status(500).send("Inter server error!");
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

module.exports = {
    user,
    post,
    api,
};
