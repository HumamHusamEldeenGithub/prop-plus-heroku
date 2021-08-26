const sql = require("./db");

const Favourite_service = function(favourite_service) {
    this.user_id = favourite_service.user_id;
    this.service_id = favourite_service.service_id;
};

Favourite_service.create = (newFavourite, result) => {
    sql.query("INSERT INTO favorite_services SET ?", newFavourite, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("created Favourite");
        result(null, { id: res.insertId, ...newFavourite });
    });
};

Favourite_service.findById = (FavouriteId, result) => {
    sql.query("SELECT * FROM favorite_services WHERE id = ?", FavouriteId, (err, res) => {
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

Favourite_service.getAll = (result) => {
    sql.query("SELECT * FROM favorite_services", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Favourite_service.getAllByUserId = (user_id, result) => {
    sql.query("SELECT favorite_services.service_id FROM favorite_services WHERE favorite_services.user_id = ?", user_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Favourite_service.getAllWithDetails = (user_id, result) => {
    sql.query("SELECT p.id,p.name,p.phone,p.description,p.rating, services.id as service_id  ,services.price_per_night,city,street,favorite_services.user_id as fav_user_id,images.url FROM favorite_services INNER JOIN (locations INNER JOIN (properties p INNER JOIN (services INNER JOIN images on images.service_id = services.id AND images.is_main = 1) on p.id = services.property_id) on locations.property_id = p.id ) on favorite_services.service_id =services.id AND favorite_services.user_id = ?", user_id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Favourite_service.updateById = (favourite_Id, newFavourite, result) => {
    sql.query(
        "UPDATE favorite_services SET user_id = ? , service_id = ? WHERE id = ", [
            newFavourite.user_id,
            newFavourite.service_id,
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

Favourite_service.remove = (id, result) => {
    sql.query("DELETE FROM favorite_services WHERE id = ?", id, (err, res) => {
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



Favourite_service.removeByUser_PropertyId = (currentFavourite, result) => {
    sql.query("DELETE FROM favorite_services WHERE user_id = ? AND service_id = ?", [currentFavourite.user_id, currentFavourite.service_id], (err, res) => {
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


Favourite_service.removeAll = (result) => {
    sql.query("DELETE FROM favorite_services", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("Deleted " + res.affectedRows + " Favourite_service");
        result(null, res);
    });
};


module.exports = Favourite_service;