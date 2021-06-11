const sql = require('./db');


exports.showTables = result => {
    sql.query("SHOW COLUMNS FROM properties_to_approve", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};