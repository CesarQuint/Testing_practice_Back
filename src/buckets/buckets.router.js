const Router = require('express').Router()
const Middlewares = require('../middlewares')
const Hub = require('./buckets.hub')

Router.post('/buckets/upload', Middlewares.auth, Hub.uploadFile)

module.exports = Router