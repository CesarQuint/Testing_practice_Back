const Fields = require('./payments.fields')
const Service = require('./payments.service')

module.exports = {
    createPayment,
    createPaymentCard,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment
}

async function createPayment(request,response) {
    try {

        const fields = new Fields(request)
        const data = {
            homeId: fields.homeId.get(),
            concept: fields.concept.get(),
            reference: fields.reference.get(),
            voucher: fields.voucher.get(),
            amount: fields.amount.get(),
            url:request.body.url
        }

        if(request.body.ticketId)
            data.ticketId = request.body.ticketId
        
        if(request.body.userId)
            data.userId = request.body.userId

        response.__data(await Service.createPayment(data))

    } catch(error) {
        response.__error(error)
    }
}

async function createPaymentCard(request,response) {
    try {

        const fields = new Fields(request)
        const data = {
            userId : request.userId,
            homeId: fields.homeId.get(),
            ticketId: fields.ticketId.get(),
            url:request.body.url
        }

        response.__data(await Service.createPaymentCard(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getPayments(request,response) {
    try {

        const query = {
            homeId: request.query.homeId || request.homeId,
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all
        }

        if(query.all)
            delete query.homeId

        response.__data(await Service.getPayments(query))

    } catch (error) {
        response.__error(error)
    }
}

async function getPayment(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            paymentId:fields.paymentId.get()
        }

        response.__data(await Service.getPayment(data.paymentId))

    } catch (error) {
        response.__error(error)
    }
}

async function updatePayment(request,response) {
    try {

        const fields = new Fields(request)

        let data = {
            paymentId: fields.paymentId.get()
        }

        const props = [
            'homeId',
            'concept',
            'reference',
            'paymentphoto',
            'amount',
            'status'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updatePayment(data.paymentId,data))

    } catch (error) {
        response.__error(error)
    }
}

async function deletePayment(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            paymentId: fields.paymentId.get()
        }

        response.__data(await Service.deletePayment(data.paymentId))

    } catch(error) {
        response.__error(error)
    }
}