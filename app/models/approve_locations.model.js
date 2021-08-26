const sql = require("./db");

const ApproveLocations = function(approveLocations) {
    this.id = approveLocations.id,
        this.property_id = approveLocations.property_id;
    this.city = approveLocations.city;
    this.street = approveLocations.street;
};

ApproveLocations.create = (newApproveLocations, result) => {
    sql.query("INSERT INTO approve_locations SET ?", newApproveLocations, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("created approveLocations");
        result(null, { id: res.insertId, ...newApproveLocations });
    });
};

ApproveLocations.findById = (approveLocationsId, result) => {
    sql.query("SELECT * FROM approve_locations WHERE id = ?", approveLocationsId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found approveLocation " + res[0]);
            result(null, res[0]);
        }
        //NOT FOUND
        result({ kind: "not_found" }, null);
    });
};

ApproveLocations.getAll = (result) => {
    sql.query("SELECT * FROM approve_locations", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

ApproveLocations.updateById = (approveLocationsId, newApproveLocations, result) => {
    sql.query(
        "UPDATE approve_locations SET id = ? , property_id = ?, city = ? , street = ?  WHERE id = ", [
            newApproveLocations.id,
            newApproveLocations.property_id,
            newApproveLocations.city,
            newApproveLocations.street,
            approveLocationsId,
        ],
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
            console.log("ApproveLocations " + approveLocationsId + " has been updated");
            result(null, { id: approveLocationsId, ...newApproveLocations });
        }
    );
};

ApproveLocations.remove = (id, result) => {
    console.log("ENTER DELETE LOCATION ");
    sql.query("DELETE FROM approve_locations WHERE id = ?", id, (err, res) => {
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
        console.log("deleted ApproveLocation with id = ", id);
        result(null, res);
    });
};
ApproveLocations.removeAll = (result) => {
    sql.query("DELETE FROM approve_locations", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Deleted " + res.affectedRows + " ApproveLocations");
        result(null, res);
    });
};
ApproveLocations.findByPropertyId = (propertyId, result) => {
    sql.query("SELECT * FROM approve_locations WHERE property_id = ?", propertyId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found ApproveLocations " + res);
            result(null, res);
            return;
        }
        //NOT FOUND
        result({ kind: "not_found" }, null);
    });
};



module.exports = ApproveLocations;