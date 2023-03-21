const Model = require('./homes.model')
const Messages = require('./homes.messages')
const Services = require('../services')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    createHome,
    getHomes,
    getHome,
    updateHome,
    deleteHome,
    Model,
    Messages
}

async function createHome(data) {
    try {

        const home = new Model(data)

        return await home.save()

    } catch(error) {
        throw error
    }
}

async function getHomes(query) {
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

        const homes = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            homes,
            metadata: Utils.metadata(page, limit, total, homes.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getHome(homeId) {
    try {

        const home = await Model.findOne({_id: homeId})

        if(!home)
            throw new Messages(homeId).homeNotFound

        return home

    } catch(error) {
        throw error
    }
}

async function updateHome(homeId, data) {
    try {

        const home = await getHome(homeId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            home[key] = data[key]
        })

        return await home.save()

    } catch(error) {
        throw error
    }
}

async function deleteHome(homeId) {
    try {

        await getHome(homeId)
        await Model.deleteOne({_id: homeId})

        return homeId

    } catch(error) {
        throw error
    }
}