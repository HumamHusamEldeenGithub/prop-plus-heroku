const sql = require("./db");

const Location = function (location) {
  this.id = location.id;
  this.property_id = location.property_id;
  this.city = location.city ; 
  this.street = location.street;
  this.map_url = location.map_url;
};

Location.create = (newLocation, result) => {
  sql.query("INSERT INTO locations SET ?", newLocation, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created Location");
    result(null, { id: res.insertId, ...newLocation });
  });
};
Location.findByPropertyId = (PropertyId, result) => {
  sql.query("SELECT * FROM locations WHERE property_id = ?", PropertyId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Location " + res[0]);
      result(null, res[0]);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};

Location.getAll = (result) => {
  sql.query("SELECT * FROM locations", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Location.updateById = (LocationId, newLocation, result) => {
  sql.query(
    "UPDATE locations SET id = ? , property_id = ?, city = ? , street = ? , map_url = ? WHERE id = ",
    [
      newLocation.id,
      newLocation.property_id,
      newLocation.city,
      newLocation.street,
      newLocation.map_url,
      LocationId,
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
      console.log("Location " + LocationId + " has been updated");
      result(null, { id: LocationId, ...newLocation });
    }
  );
};

Location.remove = (id, result) => {
  sql.query("DELETE FROM locations WHERE id = ?", id, (err, res) => {
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
    console.log("deleted Location with id = ", id);
    result(null, res);
  });
};
Location.removeAll = (result) => {
  sql.query("DELETE FROM locations", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " Locations");
    result(null, res);
  });
};

module.exports = Location;

