const Router = require('express').Router()
const Hub = require('./maintenances.hub')
const Middlewares = require('../middlewares')

Router.post('/maintenances', Middlewares.auth, Hub.createMaintenance)

Router.get('/maintenances/:maintenanceId', Middlewares.auth, Hub.getMaintenance)

Router.get('/maintenances', Middlewares.auth, Hub.getMaintenances)

Router.put('/maintenances/:maintenanceId', Middlewares.auth, Hub.updateMaintenance)

Router.delete('/maintenances/:maintenanceId', Middlewares.auth, Hub.deleteMaintenance)

module.exports = Router