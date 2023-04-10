const Fields = require('./tickets.fields')
const Service = require('./tickets.service')

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket
}

async function createTicket(request,response) {
    try {

        const fields = new Fields(request)
        const data = {
            homes: fields.homes.get(),
            concept: fields.concept.get(),
            amount: fields.amount.get(),
            type: fields.type.get(),
            limited: fields.limited.get()
        }

        response.__data(await Service.createticket(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getTickets(request,response) {
    try {

        const query = {
            homeId: request.query.homeId || request.homeId,
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all
        }

        if(query.all)
            delete query.homeId

        response.__data(await Service.gettickets(query))

    } catch (error) {
        response.__error(error)
    }
}

async function getTicket(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            ticketId:fields.ticketId.get()
        }

        response.__data(await Service.getticket(data.ticketId))

    } catch (error) {
        response.__error(error)
    }
}

async function updateTicket(request,response) {
    try {

        const fields = new Fields(request)

        let data = {
            ticketId: fields.ticketId.get()
        }

        const props = [
            'concept',
            'amount',
            'type',
            'homes',
            'limited'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateticket(data.ticketId,data))

    } catch (error) {
        response.__error(error)
    }
}

async function deleteTicket(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            ticketId: fields.ticketId.get()
        }

        response.__data(await Service.deleteticket(data.ticketId))

    } catch(error) {
        response.__error(error)
    }
}