const Fields = require('./users.fields')
const Service = require('./users.service')

module.exports = {
    loginUser,
    createUser,
    getUsers,
    getUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    sendEmail,
    resetPassword
}

async function loginUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            email: fields.email.get(),
            password: fields.password.get()
        }

        response.__data(await Service.loginUser(data))

    } catch(error) {
        response.__error(error)
    }
}

async function createUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            name: fields.name.get(),
            email: fields.email.get(),
            password: fields.password.get(),
            phone: fields.phone.get()
        }

        response.__data(await Service.createUser(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getUsers(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.__data(await Service.getUsers(query))

    } catch(error) {
        response.__error(error)
    }
}

async function getUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: fields.userId.get()
        }

        response.__data(await Service.getUser(data.userId))

    } catch(error) {
        response.__error(error)
    }
}

async function updateUser(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            userId: fields.userId.get()
        }

        const props = [
            'name',
            'phone',
            'email',
            'homeId'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateUser(data.userId, data))

    } catch(error) {
        response.__error(error)
    }
}

async function updateUserPassword(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            userId: fields.userId.get(),
            newPassword: fields.newPassword.get(),
            password: fields.password.get()
        }

        response.__data(await Service.updateUserPassword(data.userId, data))

    } catch (error) {
        response.__error(error)
    }
}

async function deleteUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: fields.userId.get()
        }

        response.__data(await Service.deleteUser(data.userId))

    } catch(error) {
        response.__error(error)
    }
}

async function sendEmail(request,response){
    try {
        const fields = new Fields(request)

        let data = {
            email: fields.email.get(),
            url: request.body.url,
            name: request.body.name,
            type: request.body.request,
            subject: request.body.subject,
            template: request.body.template
        }
    
        response.__data(await Service.sendEmail(data))

    } catch(error) {
        response.__error(error)
    }
}

async function resetPassword(request,response){
    try {
        const fields = new Fields(request)

        let data = {
            password: fields.password.get(),
            token: fields.token.get()
        }
    
        response.__data(await Service.resetPassword(data))

    } catch(error) {
        response.__error(error)
    }
}