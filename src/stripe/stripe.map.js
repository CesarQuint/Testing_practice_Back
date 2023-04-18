const Config = require('../config')
const Utils = require('../utils')

module.exports = {
    createCheckoutRequest
}

function createCheckoutRequest(data) {
    return {
        mode: 'payment',
        customer_email: data.email,
        metadata: {
            homeId: `_${data.homeId}`,
            ticketId: `_${data.ticketId}`
        },
        line_items: [{
            quantity: 1,
            price_data: {
                currency: 'MXN',
                unit_amount: Utils.float( data.total * 100 ),
                product_data: {
                    name: data.concept,
                }
            }
        }],
        success_url: `${ Config.app }/payments`,
        cancel_url: `${ Config.app }/payments`,
    }
}