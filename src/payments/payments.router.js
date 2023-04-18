const Router = require('express').Router()
const Hub = require('./payments.hub')
const Middlewares = require('../middlewares')

Router.post('/payments', Middlewares.auth, Hub.createPayment)

Router.post('/payments/card', Middlewares.auth, Hub.createPaymentCard)

Router.get('/payments/:paymentId', Middlewares.auth, Hub.getPayment)

Router.get('/payments', Middlewares.auth, Hub.getPayments)

Router.put('/payments/:paymentId', Middlewares.auth, Hub.updatePayment)

Router.delete('/payments/:paymentId', Middlewares.auth, Hub.deletePayment)

module.exports = Router