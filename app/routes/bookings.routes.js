var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const bookings = require('../controllers/bookings.controller');

    app.post('/bookings', VerifyToken, bookings.create);

    app.get('/bookings', VerifyToken, bookings.findAll);

    app.get('/bookings/service_id/:service_id', VerifyToken, bookings.findAllBookingForService);

    app.get('/bookings/:booking_id', VerifyToken, bookings.findOne);

    app.put('/bookings/:booking_id', VerifyToken, bookings.update);

    app.delete('/booking/:booking_id', VerifyToken, bookings.delete);

    app.delete('/bookings', VerifyToken, bookings.deleteAll);
}