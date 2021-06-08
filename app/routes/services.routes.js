module.exports = app => {
    const services = require('../controllers/services.controllers') ; 

    app.post('/services' , services.create) ; 

    app.get('/services' , services.findAll) ; 

    app.get('/services/:serviceId' , services.findOne) ; 

    app.put('/services/:serviceId' , services.update) ; 

    app.delete('/services/:serviceId' , services.delete) ; 

    app.delete('/services' , services.deleteAll) ; 
}