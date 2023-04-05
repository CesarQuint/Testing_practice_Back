const Router = require('express').Router()
const Hub = require('./homes.hub')
const Middlewares = require('../middlewares')

Router.post('/homes', Middlewares.auth, Hub.createHome)

Router.get('/homes/:userId', Middlewares.auth, Hub.getHomeUser)

Router.get('/homes/:homeId', Middlewares.auth, Hub.getHome)

Router.get('/homes', Middlewares.auth, Hub.getHomes)

Router.put('/homes/:homeId/user', Middlewares.auth, Hub.updateHomeUser)

Router.put('/homes/:homeId', Middlewares.auth, Hub.updateHome)

Router.delete('/homes/:homeId', Middlewares.auth, Hub.deleteHome)

module.exports = Router