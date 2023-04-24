const Config = require('../config')
const Stripe = require('stripe')(Config.stripe.secret)

const Messages = require('./stripe.messages')
const Map = require('./stripe.map')
const Services = require('../services')

module.exports = {
    createCheckout,
    webhook,
    Messages
}

async function createCheckout(data) {
    try {

        const request = Map.createCheckoutRequest(data)
        const response = await Stripe.checkout.sessions.create(request)

        return response.id

    } catch(error) {
        throw new Messages(error).stripeSaveError
    }
}

async function webhook(data) {
    try {

        const event = Stripe.webhooks.constructEvent(data.payload, data.signature, Config.stripe.private)

        if(event.type != 'checkout.session.completed')
            return event

        const session = event.data.object
        const metadata = event.data.object.metadata
        const homeId = metadata.homeId.replace('_', '')
        const ticketId = metadata.ticketId.replace('_','')
        const userId = metadata.userId.replace('_', '')
        const url = metadata.url.replace('_','')
        
        const ticket = await Services.Tickets.getTicket(ticketId)
        const paymentData = {
            homeId,
            ticketId,
            userId,
            url,
            concept: ticket.concept,
            reference: session.payment_intent,
            amount: ticket.amount,
            status: 'complete'
        }

        await Services.Payments.createPayment(paymentData)

        return event

    } catch(error) {
        throw error
    }
}