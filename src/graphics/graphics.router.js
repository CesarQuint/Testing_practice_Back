const Router = require('express').Router()
const Hub = require('./graphics.hub')
const Middlewares = require('../middlewares')

Router.get('/graphics/ticket/:ticketId', Middlewares.auth, Hub.getTicketGraphic)

Router.get('/graphics/payments', Middlewares.auth, Hub.getPaymentsGraphic)


module.exports = Router