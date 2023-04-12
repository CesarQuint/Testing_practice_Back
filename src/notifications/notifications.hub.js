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
            title: fields.title.get(),
            description: fields.description.get(),
            relevance: fields.relevance.get()
        }

        response.__data(await Service.createNotification(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getNotifications(request,response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all,
            type: request.query.type
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
            notificationId:fields.notificationId.get()
        }

        response.__data(await Service.getNotification(data.notificationId))

    } catch (error) {
        response.__error(error)
    }
}
async function updateNotification(request,response) {
    try {

        const fields = new Fields(request)

        let data = {
            notificationId: fields.notificationId.get()
        }

        const props = [
            'title',
            'description',
            'relevance'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateNotification(data.notificationId,data))

    } catch (error) {
        response.__error(error)
    }
}
async function deleteNotification(request,response) {
    try {

        const fields = new Fields(request)

        const data = {
            notificationId: fields.notificationId.get()
        }

        response.__data(await Service.deleteNotification(data.notificationId))

    } catch(error) {
        response.__error(error)
    }
}