const sql = require('./db');


exports.showTables = result => {
    sql.query("SHOW TABLES", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};