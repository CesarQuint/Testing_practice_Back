const Router = require('express').Router()
const Hub = require('./tickets.hub')
const Middlewares = require('../middlewares')

Router.post('/tickets', Middlewares.auth, Hub.createTicket)

Router.get('/tickets/:ticketId', Middlewares.auth, Hub.getTicket)

Router.get('/tickets', Middlewares.auth, Hub.getTickets)

Router.put('/tickets/:ticketId', Middlewares.auth, Hub.updateTicket)

Router.delete('/tickets/:ticketId', Middlewares.auth, Hub.deleteTicket)

module.exports = Router