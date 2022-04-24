module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        profile_pic: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        hash: {
            type: DataTypes.STRING
        },
        sid: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
    });

    return User;

}