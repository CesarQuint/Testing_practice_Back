const Model = require('./notifications.model')
const Messages = require('./notifications.messages')
const Utils = require('../utils')

module.exports = {
    createNotification,
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    Model,
    Messages
}

async function createNotification(data) {
    try {

        const notification = new Model(data)

        await  notification.save()

        return getNotification(notification._id)

    } catch (error) {
        throw error
    }
}

async function getNotifications(query) {
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

        if(query.type)
            options.type = query.type

        const notifications = await Model.find(options)
            .skip(page*limit)
            .limit(limit)
            .sort({created: -1})
        
        const total = await Model.countDocuments(options)

        return{
            notifications,
            metadata:Utils.metadata(page, limit, total, notifications.length, query)
        }
    } catch (error) {
        throw error
    }
}

async function getNotification(notificationId) {
    try {

        const notification = await Model.findOne({_id: notificationId})

        if(!notification)
            throw new Messages(notificationId).notificationNotFound

        return notification

    } catch (error) {
        throw error
    }
}

async function updateNotification(notificationId,data) {
    try {

        const notification = await getNotification(notificationId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            notification[key] = data[key]
        })

        await notification.save()
        return getNotification(notification._id)

    } catch(error) {
        throw error
    }
}

async function deleteNotification(notificationId) {
    try {

        await getNotification(notificationId)
        await Model.deleteOne({_id: notificationId})

        return notificationId

    } catch(error) {
        throw error
    }
}