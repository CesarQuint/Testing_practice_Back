const Model = require('./tickets.model')
const Messages = require('./tickets.messages')
const Utils = require('../utils')
const Services = require ('../services')
const Config = require('../config')

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
    updateTicketHome,
    Model,
    Messages
}

async function createTicket(data) {
    try {

        const ticket = new Model(data)

        await  ticket.save()

        let emails = await Services.Users.getUsersEmails()

        await Services.Sendgrid.sendView('ticket',{
            email:[...emails,process.env.EMAIL_TEST],
            subject: 'Nuevo Pago Pendiente',
            name: 'Usuario',
            url:Config.app,
            concept: data.concept,
            type : data.type,
            amount: data.amount
        })
    
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
                {concept:regexp}
            ]
        }
    
        if(query.homeId)
            options.homes = {$nin:[query.homeId]}

        const tickets = await Model.find(options)
            .skip(page*limit)
            .limit(limit)
            .sort({limited: 1})
           
        
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

async function updateTicketHome(ticketId, homeId) {
    try {

        const ticket = await getTicket(ticketId)
        
        if(!ticket.homes.includes(homeId))
            ticket.homes.push(homeId)

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