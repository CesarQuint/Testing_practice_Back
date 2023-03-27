const Router = require('express').Router()
const Hub = require('./notifications.hub')
const Middlewares = require('../middlewares')

Router.post('/notifications', Middlewares.auth, Hub.createNotification)

Router.get('/notifications/:notificationId', Middlewares.auth, Hub.getNotification)

Router.get('/notifications', Middlewares.auth, Hub.getNotifications)

Router.put('/notifications/:notificationId', Middlewares.auth, Hub.updateNotification)

Router.delete('/notifications/:notificationId', Middlewares.auth, Hub.deleteNotification)

module.exports = Router