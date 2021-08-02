module.exports = app => {
    const bookings = require('../controllers/bookings.controller');

    app.post('/bookings', bookings.create);

    app.get('/bookings', bookings.findAll);

    app.get('/bookings/service_id/:service_id', bookings.findAllBookingForService);

    app.get('/bookings/:booking_id', bookings.findOne);

    app.put('/bookings/:booking_id', bookings.update);

    app.delete('/booking/:booking_id', bookings.delete);

    app.delete('/bookings', bookings.deleteAll);
}