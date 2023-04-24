const Model = require('./users.model')
const Messages = require('./users.messages')
const Services = require('../services')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    loginUser,
    createUser,
    getUsers,
    getUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    sendEmail,
    resetPassword,
    Model,
    Messages
}

async function loginUser(data) {
    try {

        const user = await Model.findOne({email: data.email}, '+password')

        if(!user)
            throw new Messages(data).userNotFound

        if(!Methods.bcryptCompare(data.password, user.password))
            throw new Messages(data).userPasswordError

        return await Services.Sessions.createSession({userId: user._id})

    } catch(error) {
        throw error
    }
}

async function createUser(data) {
    try {

        const user = new Model(data)
       
        await user.save()

        return await getUser(user._id)

    } catch(error) {
        throw error
    }
}

async function getUsers(query) {
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

        const users = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            users,
            metadata: Utils.metadata(page, limit, total, users.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getUser(userId) {
    try {

        const user = await Model.findOne({_id: userId})

        if(!user)
            throw new Messages(userId).userNotFound

        return user

    } catch(error) {
        throw error
    }
}

async function updateUser(userId, data) {
    try {

        const user = await getUser(userId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            user[key] = data[key]
        })

        return await user.save()

    } catch(error) {
        throw error
    }
}

async function updateUserPassword(userId, data) {
    try {

        const user = await Model.findOne({_id: userId}, '+password')

        if(!user)
            throw new Messages(userId).userNotFound

        if(!Methods.bcryptCompare(data.password, user.password))
            throw new Messages(data).userPasswordError

        user.password = data.newPassword

        return await user.save()

    } catch (error) {
        throw error
    }
}

async function deleteUser(userId) {
    try {

        await getUser(userId)
        await Model.deleteOne({_id: userId})

        return userId

    } catch(error) {
        throw error
    }
}

async function sendEmail(data) {
    try {

        const user = await Model.findOne({email:data.email})
        
        if(!user)
        throw new Messages(data.email).userNotFound
        
        const token = Methods.cryptoHash(16)

        await updateUser(user._id,{token})

        await Services.Sendgrid.sendView(data.template,{
            email: process.env.EMAIL_TEST || data.email,
            subject: data.subject,
            name: data.name,
            url: data.url,
            token
        })
        
        
    } catch (error) {
        throw error
    }
}

async function resetPassword(data) {
    try {

        const user = await Model.findOne({token:data.token})

        if(!user)
            throw new Messages(data.token).userNotFound
        
        await updateUser(user._id,{token:null,password:data.password})

        return await user.save()

    } catch (error) {
        throw error
    }
}