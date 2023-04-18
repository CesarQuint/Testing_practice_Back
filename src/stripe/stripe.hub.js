const Fields = require('./stripe.fields')
const Service = require('./stripe.service')

module.exports = {
    createCheckout,
    webhook,
}

async function createCheckout(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            contractId: fields.contractId.get()
        }

        response.$data(await Service.createCheckout(data))

    } catch(error) {
        response.$error(error)
    }
}

async function webhook(request, response) {
    try {

        const data = {
            payload: request.rawBody,
            signature: request.headers['stripe-signature']
        }

        response.$data(await Service.webhook(data))

    } catch(error) {
        response.$error(error)
    }
}