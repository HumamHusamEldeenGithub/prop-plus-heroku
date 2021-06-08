module.exports = app => {
    const bookings = require('../controllers/bookings.contoller') ; 

    app.post('/bookings' , bookings.create) ; 

    app.get('/bookings' , bookings.findAll) ; 

    app.get('/bookings/:userId' , bookings.findOne) ; 

    app.put('/bookings/:userId' , bookings.update) ; 

    app.delete('/booking/:userId' , bookings.delete) ; 

    app.delete('/bookings' , bookings.deleteAll) ; 
}