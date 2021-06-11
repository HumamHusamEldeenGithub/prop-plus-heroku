module.exports = app => {
    const payments = require('../controllers/payments.controller') ; 

    app.post('/payments' , payments.create) ; 

    app.get('/payments' , payments.findAll) ; 

    app.get('/payments/:userId' , payments.findOne) ; 

    app.put('/payments/:userId' , payments.update) ; 

    app.delete('/booking/:userId' , payments.delete) ; 

    app.delete('/payments' , payments.deleteAll) ; 
}