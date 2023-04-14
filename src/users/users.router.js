const Router = require('express').Router()
const Hub = require('./users.hub')
const Middlewares = require('../middlewares')

Router.post('/users/login', Hub.loginUser)

Router.post('/users', Hub.createUser)

Router.get('/users/:userId', Middlewares.auth, Hub.getUser)

Router.get('/users', Middlewares.auth, Hub.getUsers)

Router.put('/users/:userId/password', Middlewares.auth, Hub.updateUserPassword)

Router.put('/users/:userId', Middlewares.auth, Hub.updateUser)

Router.delete('/users/:userId', Middlewares.auth, Hub.deleteUser)

Router.post('/users/forgot-password',Hub.sendEmail)

Router.get('/users/forgot-password/:token',Hub.validateToken)
Router.post('/users/forgot-password/:token',Hub.resetPassword)

module.exports = Router