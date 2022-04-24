module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        creator: {
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
        location: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
    });

    return Post;

}