const Router = require('express').Router()
const Hub = require('./homes.hub')
const Middlewares = require('../middlewares')

Router.post('/homes', Middlewares.auth, Hub.createHome)

Router.get('/homes/:homeId', Middlewares.auth, Hub.getHome)

Router.get('/homes/:userId/user', Middlewares.auth, Hub.getHomeUser)

Router.get('/homes', Middlewares.auth, Hub.getHomes)

Router.put('/homes/:homeId', Middlewares.auth, Hub.updateHome)

Router.delete('/homes/:homeId', Middlewares.auth, Hub.deleteHome)

module.exports = Router