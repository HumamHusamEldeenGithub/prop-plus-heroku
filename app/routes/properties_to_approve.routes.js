module.exports = app => {
    const properties_to_approve = require('../controllers/properties_to_approve.controller') ; 

    app.post('/properties_to_approve' , properties_to_approve.create) ; 

    app.get('/properties_to_approve' , properties_to_approve.findAll) ; 

    app.get('/properties_to_approve/:propertyId' , properties_to_approve.findOne) ; 

    app.put('/properties_to_approve/:propertyId' , properties_to_approve.update) ; 

    app.delete('/properties_to_approve/:propertyId' , properties_to_approve.delete) ; 

    app.delete('/properties_to_approve' , properties_to_approve.deleteAll) ; 
}