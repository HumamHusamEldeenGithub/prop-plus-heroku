const sql = require("./db");

const Image = function(image) {
    this.service_id = image.service_id;
    this.url = image.url;
    this.is_main = image.is_main;
};

Image.create = (newImage, result) => {
    sql.query("INSERT INTO images SET ?", newImage, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("created Image");
        result(null, { id: res.insertId, ...newImage });
    });
};
Image.findByServiceId = (ImageId, result) => {
    sql.query("SELECT * FROM images WHERE service_id = ?", ImageId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Image " + res);
            result(null, res);
        }
        //NOT FOUND
        result({ kind: "not_found" }, null);
    });
};

Image.getAll = (result) => {
    sql.query("SELECT * FROM images", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Image.updateById = (ImageId, newImage, result) => {
    sql.query(
        "UPDATE images SET  service_id = ? , url = ? WHERE id = ", [
            newImage.service_id,
            newImage.url,
            ImageId,
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
            console.log("Image " + ImageId + " has been updated");
            result(null, { id: ImageId, ...newImage });
        }
    );
};

Image.remove = (id, result) => {
    sql.query("DELETE FROM images WHERE id = ?", id, (err, res) => {
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
        console.log("deleted Image with id = ", id);
        result(null, res);
    });
};
Image.removeAll = (result) => {
    sql.query("DELETE FROM images", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Deleted " + res.affectedRows + " Images");
        result(null, res);
    });
};

module.exports = Image;