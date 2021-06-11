const sql = require("./db");

const PropertyToApprove = function (propertyToApprove) {
    this.name = propertyToApprove.name,
    this.user_id = propertyToApprove.user_id,
    this.phone = propertyToApprove.phone,
    this.description = propertyToApprove.description
};

PropertyToApprove.create = (newPropertyToApprove, result) => {
  sql.query("INSERT INTO properties_to_approve SET ?", newPropertyToApprove, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created PropertyToApprove !");
    result(null, { id: res.insertId, ...newPropertyToApprove });
  });
};
PropertyToApprove.findById = (PropertyToApproveId, result) => {
  sql.query("SELECT * FROM properties_to_approve WHERE id = " + PropertyToApproveId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found PropertyToApprove : ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

PropertyToApprove.getAll = (result) => {
  sql.query("SELECT * FROM properties_to_approve", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("properties_to_approve:", res);
    result(null, res);
  });
};

PropertyToApprove.updateById = (id, newPropertyToApprove, result) => {
  console.log(id);
  sql.query(
    "UPDATE properties_to_approve SET name= ? , phone = ? , description = ?  WHERE id=?",
    [
      newPropertyToApprove.name,
      newPropertyToApprove.phone,
      newPropertyToApprove.description,
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
      console.log("updated PropertyToApprove :" + id);
      result(null, { id: id, ...newPropertyToApprove });
    }
  );
};

PropertyToApprove.remove = (id, result) => {
  sql.query("DELETE FROM properties_to_approve WHERE id = ?", id, (err, res) => {
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
    console.log("deleted PropertyToApprove with id =", id);
    result(null, res);
  });
};

PropertyToApprove.removeAll = (result) => {
  sql.query("DELETE FROM properties_to_approve", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " PropertyToApprove");
    result(null, res);
  });
};

module.exports = PropertyToApprove;
