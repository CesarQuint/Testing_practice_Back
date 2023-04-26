const Messages = require('./graphics.messages')
const Services = require('../services')
const Utils = require('../utils')
const Model = require('../tickets/tickets.model')
const Homes = require('../homes/homes.model')

module.exports = {
    getTicketGraphic,
    getPaymentsGraphic
}


async function getTicketGraphic(ticketId) {
    try {

        const ticket = await Model.findOne({_id: ticketId})

        const homes = await Homes.find()

        const unpaid =homes.length - ticket.homes.length 
        
        const paid = ticket.homes.length

        if(!ticket)
            throw new Messages(ticketId).ticketNotFound

        return {
            ticket,
            datasets:[
                paid,
                unpaid
            ]
        }

    } catch (error) {
        throw error
    }
}

async function getPaymentsGraphic () {

}