const Messages = require('./graphics.messages')
const Services = require('../services')
const Utils = require('../utils')
const Tickets = require('../tickets/tickets.model')
const Homes = require('../homes/homes.model')
const Payments = require('../payments/payments.model')

module.exports = {
    getTicketGraphic,
    getPaymentsGraphic
}


async function getTicketGraphic(ticketId) {
    try {

        const ticket = await Tickets.findOne({_id: ticketId})

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

async function getPaymentsGraphic (data) {
    try {

        const group = {
            year: {
                $year: '$created'
            },
            month: {
                $month: '$created'
            },
        }

        if(data.dateType === 'day')
            group.date = {
                $dayOfMonth: '$created'
            }

        const payments = await Payments.aggregate([
            {
                $match: {
                    created: {
                        $gte: new Date(data.datestart),
                        $lte: new Date(data.dateend),
                    }
                }
            },
            {
                $group: {
                    _id: group,
                    total: {
                        $sum: '$amount'
                    },
                    paymentTotal:{
                        $sum:1
                    }
                }
            }
        ])

        const datasets = payments.map(pay=> pay.total)
        const labels = payments.map(pay=> {

            if(data.dateType === 'day')
                return `${pay._id.date}/${pay._id.month}/${pay._id.year}`

            return `${pay._id.month}/${pay._id.year}`
        })

        return{
            datasets,
            labels,
            payments
        }
    } catch (error) {
        throw error
    }
}