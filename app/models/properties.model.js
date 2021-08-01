const sql = require("./db");
require("dotenv").config();

const Property = function(property) {
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


Property.getAllWithDetails = (result) => {
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,services.price_per_night,city,street,images.url FROM properties p ,services ,locations,images where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) AND locations.property_id = p.id AND images.service_id=services.id AND images.is_main IS NOT NULL", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("properties:", res);
        result(null, res);
    });
};

//TODO : Create a query to get properties with full details using page_index (offset) parameter
// Property.getAllWithDetails = (page_index,result) => {
//   sql.query("SELECT * FROM properties LIMIT ? OFFSET ?",[parseInt(process.env.ITEM_PER_PAGE) , process.env.ITEM_PER_PAGE * page_index], (err, res) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//       return;
//     }
//     console.log("properties:", res);
//     result(null, res);
//   });
// };

Property.updateById = (id, newProperty, result) => {
    console.log(id);
    sql.query(
        "UPDATE properties SET name= ? , phone = ? , description = ? , rating = ? WHERE id=?", [
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
    sql.query("DELETE FROM properties", (err, res) => {
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