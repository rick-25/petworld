const petworld_config = require('../configs/petworld');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    host: petworld_config.host,
    database: petworld_config.database,
    username: petworld_config.user,
    password: petworld_config.password,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        freezeTableName: true
    }
});

sequelize.authenticate()
    .then(() => {
        console.log("DB Connected..");
    })
    .catch(err => {
        console.log("Error: " + err);
    });


const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./User')(sequelize, DataTypes);
db.post = require('./Post')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })




module.exports = db;