const Model = require('./payments.model')
const Messages = require('./payments.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createPayment,
    createPaymentCard,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment,
    Model,
    Messages
}

async function createPayment(data) {
    try {
        let user = null

        const payment = new Model(data)

        if(data.voucher)
            payment.voucher = await Services.Buckets.uploadFile(data.voucher)

        await Services.Tickets.updateTicketHome(data.ticketId, data.homeId)

        await payment.save()

        if(data.userId)
            user = await Services.Users.getUser(data.userId)

        if(!data.userId){    
            let home = await Services.Homes.getHome(data.homeId)
            console.log(home);
            user = await Services.Users.getUser(home.userId)
        }

        await Services.Sendgrid.sendView('payment',{
            email: [process.env.EMAIL_TEST,user.email] ,
            emailPayment:user.email,
            name: user.name,
            subject: "Pago realizado",
            concept: data.concept,
            amount: data.amount,
            url: data.url
        })

        return getPayment(payment._id)

    } catch (error) {
        throw error
    }
}

async function createPaymentCard(data) {
    try {

        const ticket = await Services.Tickets.getTicket(data.ticketId)
        const user = await Services.Users.getUser(data.userId)

        const checkoutData = {
            email: user.email,
            homeId: data.homeId,
            ticketId: data.ticketId,
            userId: data.userId,
            total: ticket.amount,
            concept: ticket.concept,
            url: data.url
        }

        return await Services.Stripe.createCheckout(checkoutData)

    } catch (error) {
        throw error
    }
}

async function getPayments(query) {
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
            options.homeId = query.homeId

        const payments = await Model.find(options)
            .skip(page*limit)
            .limit(limit)
            .sort({created: -1})
            .populate({
                path: 'home',
                select: {
                    address : true
                }
            })



        const total = await Model.countDocuments(options)


        return{
            payments,
            metadata:Utils.metadata(page, limit, total, payments.length, query)
        }
    } catch (error) {
        throw error
    }
}

async function getPayment(paymentId) {
    try {

        const payment = await Model.findOne({_id: paymentId})
            .populate('home')

        if(!payment)
            throw new Messages(paymentId).paymentNotFound

        return payment

    } catch (error) {
        throw error
    }
}

async function updatePayment(paymentId,data) {
    try {

        const payment = await getPayment(paymentId)
        const keys = Object.keys(data)


        keys.forEach(key => {
            payment[key] = data[key]
        })

        if(data.voucher)
            payment.voucher = await Services.Buckets.uploadFile(data.voucher)

        await payment.save()
        return getPayment(payment._id)

    } catch(error) {
        throw error
    }
}

async function deletePayment(paymentId) {
    try {

        await getPayment(paymentId)
        await Model.deleteOne({_id: paymentId})

        return paymentId

    } catch(error) {
        throw error
    }
}