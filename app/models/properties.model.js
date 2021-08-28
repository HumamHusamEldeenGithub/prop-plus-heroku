const sql = require("./db");
require("dotenv").config();


const Property = function(property) {
    (this.name = property.name),
    (this.user_id = property.user_id),
    (this.phone = property.phone),
    (this.type = property.type),
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

Property.getAllByUserId = (userId, result) => {
    sql.query("SELECT p.id , p.name,p.user_id,p.phone,p.description,p.type,p.rating,locations.city,locations.street FROM properties p , locations WHERE p.user_id = ? AND locations.property_id = p.id", userId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("properties:", res);
        result(null, res);
    });
};

Property.getAllForType = (type, pageIndex, result) => {
    var itemsCount = parseInt(process.env.ITEM_PER_PAGE);
    var offset = parseInt(pageIndex) * parseInt(process.env.ITEM_PER_PAGE)
    if (type == 'top_rated') {
        sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where p.rating > ? LIMIT ? OFFSET ?", ["4", itemsCount, offset], (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }
            console.log("properties:", res);
            result(null, res);
        });
    } else if (type == 'best_price') {
        sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where services.price_per_night < 80 LIMIT ? OFFSET ?", [itemsCount, offset], (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }
            console.log("properties:", res);
            result(null, res);
        });
    } else {
        sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 WHERE p.type = ? LIMIT ? OFFSET ?", [type, itemsCount, offset], (err, res) => {
            if (err) {
                console.log(err);
                result(err, null);
                return;
            }
            console.log("properties:", res);
            result(null, res);
        });
    }
};


Property.getAllWithDetails = (pageIndex, result) => {
    var itemsCount = parseInt(process.env.ITEM_PER_PAGE);
    var offset = parseInt(pageIndex) * parseInt(process.env.ITEM_PER_PAGE)
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) LIMIT ? OFFSET ?", [itemsCount, offset], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("properties:", res);
        result(null, res);
    });
};

Property.getSearchResults = (searchText, result) => {
    var queryText = "SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 WHERE services.description LIKE '%" + searchText + "%' OR p.name LIKE '%" + searchText + "%' OR locations.street LIKE '%" + searchText + "%' OR locations.city LIKE '%" + searchText + "%'";
    sql.query(queryText, (err, res) => {
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

Property.updateRating = (id, rating, result) => {
    console.log(id);
    sql.query(
        "UPDATE properties SET rating = (properties.rating + ?)/2 WHERE properties.id = ?", [
            rating,
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
            result(null, { 'message': 'done' });
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