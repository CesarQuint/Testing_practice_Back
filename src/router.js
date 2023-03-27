const Router = require('express').Router()

Router.get('/', (request, response) => {
    response.status(200).send({
        succes: true,
        data: {
            autor: 'github@IvanBM1',
            email: 'ivan.bm.fcc@gmail.com',
            message: 'NodeJS API'
        }
    })
})

module.exports = [
    Router,
    require('./users/users.router'),
    require('./sessions/sessions.router'),
    require('./homes/homes.router'),
    require('./payments/payments.router'),
    require('./notifications/notifications.router')
]