const Fields = require('./notifications.fields')
const Service = require('./notifications.service')

module.exports = {
    createNotification,
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification
}

async function createNotification(request,response) {
    try {

        const fields = new Fields(request)
        const data = {
            userId: fields.userId.get(),
            name: fields.name.get(),
            amount: fields.amount.get(),
        }

        response.__data(await Service.createNotification(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getNotifications(request,response) {
    try {

        const query = {
            userId: request.query.userId || request.userId,
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all
        }

        if(query.all)
            delete query.userId

        response.__data(await Service.getNotifications(query))

    } catch (error) {
        response.__error(error)
    }
}
async function getNotification(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            NotificationId:fields.NotificationId.get()
        }

        response.__data(await Service.getNotification(data.NotificationId))

    } catch (error) {
        response.__error(error)
    }
}
async function updateNotification(request,response) {
    try {

        const fields = new Fields(request)

        let data = {
            NotificationId: fields.NotificationId.get()
        }

        const props = [
            'name',
            'amount'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateNotification(data.NotificationId,data))

    } catch (error) {
        response.__error(error)
    }
}
async function deleteNotification(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            NotificationId: fields.NotificationId.get()
        }

        response.__data(await Service.deleteNotification(data.NotificationId))

    } catch(error) {
        response.__error(error)
    }
}