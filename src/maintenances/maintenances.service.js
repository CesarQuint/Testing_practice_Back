const Model = require('./maintenances.model')
const Messages = require('./maintenances.messages')
const Services = require('../services')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    createMaintenance,
    getMaintenances,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance,
    Model,
    Messages
}

async function createMaintenance(data) {
    try {

        const maintenance = new Model(data)

        return await maintenance.save()

    } catch(error) {
        throw error
    }
}

async function getMaintenances(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [
                {name: regexp}
            ]
        }

        const maintenances = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            maintenances,
            metadata: Utils.metadata(page, limit, total, maintenances.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getMaintenance(maintenanceId) {
    try {

        const maintenance = await Model.findOne({_id: maintenanceId})

        if(!maintenance)
            throw new Messages(maintenanceId).maintenanceNotFound

        return maintenance

    } catch(error) {
        throw error
    }
}

async function updateMaintenance(maintenanceId, data) {
    try {

        const maintenance = await getMaintenance(maintenanceId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            maintenance[key] = data[key]
        })

        return await maintenance.save()

    } catch(error) {
        throw error
    }
}

async function deleteMaintenance(maintenanceId) {
    try {

        await getMaintenance(maintenanceId)
        await Model.deleteOne({_id: maintenanceId})

        return maintenanceId

    } catch(error) {
        throw error
    }
}