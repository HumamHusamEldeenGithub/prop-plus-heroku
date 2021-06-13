const sql = require('./db') ; 

const Service = function(service) {
    this.property_id = service.property_id ; 
    this.description = service.description ; 
    this.price_per_night = service.price_per_night ; 
}

Service.create = (newService, result) => {
    sql.query("INSERT INTO services SET ?", newService, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      console.log("created service");
      result(null, { id: res.insertId, ...newService });
    });
  };
  
Service.findById = (serviceId, result) => {
  sql.query("SELECT * FROM services WHERE id = ?", serviceId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found service " + res[0]);
      result(null, res[0]);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};
  
Service.getAll = (result) => {
  sql.query("SELECT * FROM services", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Service.updateById = (serviceId, newService, result) => {
  sql.query(
    "UPDATE services SET property_id = ? , description = ? , price_per_night = ?  WHERE id = ",
    [
      newService.property_id ,
      newService.description,
      newService.price_per_night,
      serviceId,
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
      console.log("service " + serviceId + " has been updated");
      result(null, { id: serviceId, ...newService });
    }
  );
};

Service.remove = (id, result) => {
  sql.query("DELETE FROM services WHERE id = ?", id, (err, res) => {
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
    console.log("deleted service with id = ", id);
    result(null, res);
  });
};
Service.removeAll = (result) => {
  sql.query("DELETE FROM services", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Deleted " + res.affectedRows + " services");
    result(null, res);
  });
};
Service.getAllWithDetails = (page_index,result) => {
  sql.query("SELECT services.id,services.property_id,services.price_per_night,properties.id,properties.name,properties.rating,images.url,locations.city,locations.street,locations.map_url FROM (((services INNER JOIN properties ON properties.id = services.property_id) INNER JOIN images ON services.id=images.service_id) INNER JOIN locations ON services.property_id = locations.property_id)",[parseInt(process.env.ITEM_PER_PAGE) , process.env.ITEM_PER_PAGE * page_index], (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("Services:", res);
    result(null, res);
  });
};

//TODO : add offset and limit 
Service.findAllByCity = (city,page_index, result) => {
  sql.query("SELECT services.id,services.property_id,services.price_per_night,properties.id,properties.name,properties.rating,MIN(images.url),locations.city,locations.street,locations.map_url FROM (((services INNER JOIN properties ON properties.id = services.property_id) INNER JOIN images ON services.id=images.service_id) INNER JOIN locations ON services.property_id = locations.property_id) WHERE locations.city = ?", city, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found service " + res);
      result(null, res);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};

//TODO : add limit and offset 
Service.findAllByRating = (page_index,result) => {
  sql.query("SELECT services.id,services.property_id,services.price_per_night,properties.id,properties.name,properties.rating,MIN(images.url),locations.city,locations.street,locations.map_url FROM (((services INNER JOIN properties ON properties.id = services.property_id) INNER JOIN images ON services.id=images.service_id) INNER JOIN locations ON services.property_id = locations.property_id) ORDER BY properties.rating", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found service " + res);
      result(null, res);
    }
    //NOT FOUND
    result({ kind: "not_found" }, null);
  });
};
  
  
  module.exports = Service;
  