const mysql = require('mysql2');

const conn = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "petworld",
});

const fireQuerry = (sql, data = []) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, data, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

const auth_user = async (user_data) => {
    if (!user_data.email || !user_data.password) return false;
    const sql = 'select password from user where email=' + '"' + user_data.email + '"';
    try {
        let tuple = await fireQuerry(sql);
        return (tuple.length > 0 && tuple[0].password == user_data.password);
    } catch (e) {
        console.log(e);
    }
    return false;
};

const add_user = async (user_info) => {
    if (!user_info.email || !user_info.password || !user_info.name || !user_info.address) return false;
    let sql = "insert into user values(?, ?, ?, ?, ?, ?);";
    try {
        let tuple = await fireQuerry(sql, [user_info.email, user_info.password, user_info.name, user_info.address, null, null]);
        console.log(tuple);
        return true;
    } catch (e) {
        console.log(e);
    }

    return false;
};


module.exports = {
    fireQuerry,
    auth_user,
    add_user,
};



