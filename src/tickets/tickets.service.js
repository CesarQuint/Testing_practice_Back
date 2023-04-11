const Model = require('./tickets.model')
const Messages = require('./tickets.messages')
const Utils = require('../utils')

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
    Model,
    Messages
}

async function createTicket(data) {
    try {

        const ticket = new Model(data)

        await  ticket.save()

        return getTicket(ticket._id)

    } catch (error) {
        throw error
    }
}

async function getTickets(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find,'i')
            options.$or = [
                {name:regexp}
            ]
        }

        if(query.homeId)
            options.homeId = query.homeId

        const tickets = await Model.find(options)
            .skip(page*limit)
            .limit(limit)
            .sort({created: -1})
           
        
        const total = await Model.countDocuments(options)

        return{
            tickets,
            metadata:Utils.metadata(page, limit, total, tickets.length, query)
        }
    } catch (error) {
        throw error
    }
}

async function getTicket(ticketId) {
    try {

        const ticket = await Model.findOne({_id: ticketId})


        if(!ticket)
            throw new Messages(ticketId).ticketNotFound

        return ticket

    } catch (error) {
        throw error
    }
}

async function updateTicket(ticketId,data) {
    try {

        const ticket = await getTicket(ticketId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            ticket[key] = data[key]
        })

        await ticket.save()
        return getTicket(ticket._id)

    } catch(error) {
        throw error
    }
}

async function deleteTicket(ticketId) {
    try {

        await getTicket(ticketId)
        await Model.deleteOne({_id: ticketId})

        return ticketId

    } catch(error) {
        throw error
    }
}