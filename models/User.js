const db = require("../config/db")



class User {

    createUser(name, email, password, role) {
        let sql = `INSERT INTO users(email,password, role,name) VALUES('${email}','${password}','${role}','${name}')`
        return db.execute(sql);
    }

    findUser = (email) => {
        return db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    }

    findUserById = (user_id) => {
        return db.execute(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
    }

}

module.exports = User;

