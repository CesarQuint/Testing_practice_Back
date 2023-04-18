const Router = require('express').Router()
const Hub = require('./stripe.hub')
const Middlewares = require('../middlewares')

Router.post('/stripe/checkout', Middlewares.auth, Hub.createCheckout)

Router.post('/stripe/webhook', Hub.webhook)

module.exports = Router