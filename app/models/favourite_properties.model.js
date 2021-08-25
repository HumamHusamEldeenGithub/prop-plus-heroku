const sql = require("./db");

const Favourite_property = function(favourite_property) {
    this.user_id = favourite_property.user_id;
    this.property_id = favourite_property.property_id;
};

Favourite_property.create = (newFavourite, result) => {
    sql.query("INSERT INTO favorite_properties SET ?", newFavourite, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("created Favourite");
        result(null, { id: res.insertId, ...newFavourite });
    });
};

Favourite_property.findById = (FavouriteId, result) => {
    sql.query("SELECT * FROM favorite_properties WHERE id = ?", FavouriteId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Favourite " + res[0]);
            result(null, res[0]);
        }
        //NOT FOUND
        result({ kind: "not_found" }, null);
    });
};

Favourite_property.getAll = (result) => {
    sql.query("SELECT * FROM favorite_properties", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Favourite_property.getAllWithDetails = (user_id, result) => {
    console.log(user_id);
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating, services.id as service_id  ,services.price_per_night,city,street,favorite_properties.user_id as fav_user_id,images.url FROM properties p ,services ,locations,images,favorite_properties where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) AND locations.property_id = p.id AND images.service_id=services.id AND images.is_main =1 AND favorite_properties.property_id =p.id AND favorite_properties.user_id = " + user_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Favourite_property.updateById = (favourite_Id, newFavourite, result) => {
    sql.query(
        "UPDATE favorite_properties SET user_id = ? , property_id = ? WHERE id = ", [
            newFavourite.user_id,
            newFavourite.property_id,
            favourite_Id,
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
            console.log("Favourite " + favourite_Id + " has been updated");
            result(null, { id: favourite_Id, ...newFavourite });
        }
    );
};

Favourite_property.remove = (id, result) => {
    sql.query("DELETE FROM favorite_properties WHERE id = ?", id, (err, res) => {
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
        console.log("deleted favourite with id = ", id);
        result(null, res);
    });
};



Favourite_property.removeByUser_PropertyId = (currentFavourite, result) => {
    sql.query("DELETE FROM favorite_properties WHERE user_id = ? AND property_id = ?", [currentFavourite.user_id, currentFavourite.property_id], (err, res) => {
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
        console.log("deleted favourite with user_id = ", currentFavourite.user_id);
        result(null, res);
    });
};


Favourite_property.removeAll = (result) => {
    sql.query("DELETE FROM favorite_properties", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Deleted " + res.affectedRows + " favourite_propertie");
        result(null, res);
    });
};


module.exports = Favourite_property;