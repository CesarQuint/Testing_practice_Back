const Service = require('./stripe.service')

module.exports = {
    webhook,
}

async function webhook(request, response) {
    try {

        const data = {
            payload: request.rawBody,
            signature: request.headers['stripe-signature']
        }

        response.__data(await Service.webhook(data))

    } catch(error) {
        response.__error(error)
    }
}