const sql = require("./db");

const ApprovalImage = function (approvalImage) {
  this.property_id = approvalImage.property_id;
  this.url=approvalImage.url;
};

ApprovalImage.create = (newApprovalImage, result) => {
  sql.query("INSERT INTO approval_images SET ?", newApprovalImage, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("created ApprovalImage");
    result(null, { id: res.insertId, ...newApprovalImage });
  });
};

ApprovalImage.findById = (ApprovalImageId, result) => {
  sql.query("SELECT * FROM approval_images WHERE id = ?", ApprovalImageId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found approval_images " + res[0]);
      result(null, res[0]);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};

ApprovalImage.getAll = (result) => {
  sql.query("SELECT * FROM approval_images", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

ApprovalImage.updateById = (ApprovalImageId, newApprovalImage, result) => {
  sql.query(
    "UPDATE approval_images SET  property_id = ? , url = ? WHERE id = ",
    [
      newApprovalImage.property_id,
      newApprovalImage.url,
      ApprovalImageId,
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
      console.log("ApprovalImage " + ApprovalImageId + " has been updated");
      result(null, { id: ApprovalImageId, ...newApprovalImage });
    }
  );
};

ApprovalImage.remove = (id, result) => {
  sql.query("DELETE FROM approval_images WHERE id = ?", id, (err, res) => {
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
    console.log("deleted approval_image with id = ", id);
    result(null, res);
  });
};
ApprovalImage.removeAll = (result) => {
  sql.query("DELETE FROM approval_images", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " ApprovalImages");
    result(null, res);
  });
};

module.exports = ApprovalImage;
