module.exports = app => {
    const locations = require('../controllers/locations.controller') ; 

    app.post('/locations' , locations.create) ; 

    app.get('/locations' , locations.findAll) ; 

    app.get('/locations/:userId' , locations.findOne) ; 

    app.put('/locations/:userId' , locations.update) ; 

    app.delete('/booking/:userId' , locations.delete) ; 

    app.delete('/locations' , locations.deleteAll) ; 
}