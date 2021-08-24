var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const payments = require('../controllers/payments.controller');

    app.post('/payments', VerifyToken, payments.create);

    app.get('/payments', VerifyToken, payments.findAll);

    app.get('/payments/:payment_id', VerifyToken, payments.findOne);

    app.get('/payments/byBookingId/:booking_id', VerifyToken, payments.findOneByBookingId);

    app.put('/payments/:payment_id', VerifyToken, payments.update);

    app.delete('/booking/:payment_id', VerifyToken, payments.delete);

    app.delete('/payments', VerifyToken, payments.deleteAll);
}