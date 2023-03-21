const Fields = require('./payments.fields')
const Service = require('./payments.service')

module.exports = {
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment
}

async function createPayment(request,response) {
    try {

        const fields = new Fields(request)
        const data = {
            userId: fields.userId.get(),
            name: fields.name.get(),
            amount: fields.amount.get(),
        }

        response.__data(await Service.createPayment(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getPayments(request,response) {
    try {

        const query = {
            userId: request.query.userId || request.userId,
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all
        }

        if(query.all)
            delete query.userId

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
            'name',
            'amount'
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