const sql = require("./db");

const Property = function (property) {
  (this.name = property.name),
    (this.user_id = property.user_id),
    (this.phone = property.phone),
    (this.description = property.description),
    (this.rating = property.rating);
};

Property.create = (newProperty, result) => {
  sql.query("INSERT INTO properties SET ?", newProperty, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created property !");
    result(null, { id: res.insertId, ...newProperty });
  });
};
Property.findById = (propertyId, result) => {
  sql.query("SELECT * FROM properties WHERE id = " + propertyId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found property : ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Property.getAll = (result) => {
  sql.query("SELECT * FROM properties", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("properties:", res);
    result(null, res);
  });
};

Property.updateById = (id, newProperty, result) => {
  console.log(id);
  sql.query(
    "UPDATE properties SET name= ? , phone = ? , description = ? , rating = ? WHERE id=?",
    [
      newProperty.name,
      newProperty.phone,
      newProperty.description,
      newProperty.rating,
      id
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
      console.log("updated property :" + id);
      result(null, { id: id, ...newProperty });
    }
  );
};

Property.remove = (id, result) => {
  sql.query("DELETE FROM properties WHERE id = ?", id, (err, res) => {
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
    console.log("deleted property with id =", id);
    result(null, res);
  });
};

Property.removeAll = (result) => {
  sql.query("TRUNCATE TABLE properties", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " property");
    result(null, res);
  });
};

module.exports = Property;
