module.exports = app => {
    const payments = require('../controllers/payments.controller') ; 

    app.post('/payments' , payments.create) ; 

    app.get('/payments' , payments.findAll) ; 

    app.get('/payments/:payment_id' , payments.findOne) ; 

    app.get('/payments/byBookingId/:booking_id' , payments.findOneByBookingId) ; 

    app.put('/payments/:payment_id' , payments.update) ; 

    app.delete('/booking/:payment_id' , payments.delete) ; 

    app.delete('/payments' , payments.deleteAll) ; 
}