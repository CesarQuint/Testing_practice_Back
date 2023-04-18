const Router = require('express').Router()
const Hub = require('./stripe.hub')

Router.post('/stripe/webhook', Hub.webhook)

module.exports = Router