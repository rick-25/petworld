module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING
        },
        animal: {
            type: DataTypes.STRING
        },
        breed: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        specification: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
    });

    return Post;

}