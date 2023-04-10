const Router = require('express').Router()
const Hub = require('./ticket.hub')
const Middlewares = require('../middlewares')

Router.post('/ticket', Middlewares.auth, Hub.createTicket)

Router.get('/ticket/:ticketId', Middlewares.auth, Hub.getTicket)

Router.get('/ticket', Middlewares.auth, Hub.getTickets)

Router.put('/ticket/:ticketId', Middlewares.auth, Hub.updateTicket)

Router.delete('/ticket/:ticketId', Middlewares.auth, Hub.deleteTicket)

module.exports = Router