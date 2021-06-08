const sql = require('./db');

const User = function(user) {
    this.name = user.name;
    this.email = user.email;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("created user !");
        result(null,{ id: res.insertId, ...newUser }) ; 
    });
}
User.findById = (userId, result) => {
    sql.query('SELECT * FROM users WHERE id = ' + userId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user : ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("users:", res);
        result(null, res);
    });
}


User.showTables = result => {
    sql.query("SHOW TABLES", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
}


User.updateById = (id, user, result) => {
    sql.query("UPDATE USER SET name= ? , email= ? WHRE id=?", [user.name, user.email, id],
        (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;

            }
            //NOT FOUND
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated user :" + id);
            result(null, { id: id, ...user });
        });
}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        //NOT FOUND 
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id =", id);
        result(null, res);
    });
}

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Deleted " + res.affectedRows + " user");
        result(null, res);
    })
}


module.exports = User;