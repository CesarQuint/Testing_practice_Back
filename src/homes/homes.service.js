const Model = require('./homes.model')
const Messages = require('./homes.messages')
const Services = require('../services')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    createHome,
    getHomes,
    getHomeUser,
    getHome,
    updateHomeUser,
    updateHome,
    deleteHome,
    Model,
    Messages
}

async function createHome(data) {
    try {
        
        if(data.userId) {
            
            const exhome = await Model.findOne({userId:data.userId})
    
            if(exhome)
                throw new Messages().homeAlreadyExist         
        }
     
        
        const home = new Model(data)

        await Services.Users.updateUser(data.userId,{ homeId: home._id})

        await home.save()

        return getHome(home._id)

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
                {address: regexp}
            ]
        }

        if(query.userId)
            options.userId = query.userId


        const homes = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})
            .populate({
                path: 'user',
                select: {
                    name: true,
                }
            })

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
            .populate('user')

        if(!home)
            throw new Messages(homeId).homeNotFound

        return home

    } catch(error) {
        throw error
    }
}

async function getHomeUser(userId) {
    try {

        const home = await Model.findOne({ userId })

        if(!home)
            throw new Messages(userId).homeNotFound

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

        await home.save()

        return getHome(homeId)

    } catch(error) {
        throw error
    }
}

async function updateHomeUser(homeId, data) {
    try {

        const home = await getHome(homeId)
        const keys = Object.keys(data)
        let user = null

        if(home.userId)
            user = await Services.Users.getUser(home.userId)

        keys.forEach(key => {
            home[key] = data[key]
        })

        await home.save()

        if(user)
            await Services.Users.updateUser(user._id,{ homeId : null}) 
        
        await Services.Users.updateUser(data.userId,{ homeId: home._id})

        if(user && user.homeId)
            await updateHome(user.homeId, { userId: null })

        return getHome(homeId)

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