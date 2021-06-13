module.exports = app => {
    const locations = require('../controllers/locations.controller') ; 

    app.post('/locations' , locations.create) ; 

    app.get('/locations' , locations.findAll) ; 

    app.get('/locations/:property_id' , locations.findOne) ; 

    app.put('/locations/:location_id' , locations.update) ; 

    app.delete('/booking/:location_id' , locations.delete) ; 

    app.delete('/locations' , locations.deleteAll) ; 
}