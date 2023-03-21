const Fields = require('./homes.fields')
const Service = require('./homes.service')

module.exports = {
    createHome,
    getHomes,
    getHome,
    updateHome,
    deleteHome
}

async function createHome(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: fields.userId.get(),
            name: fields.name.get(),
            description: fields.description.get(),
        }

        response.__data(await Service.createHome(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getHomes(request, response) {
    try {

        const query = {
            userId: request.query.userId || request.userId,
            page: parseInt(request.query.page || 0),
            find: request.query.find,
            all: request.query.all
        }

        if(query.all)
            delete query.userId

        response.__data(await Service.getHomes(query))

    } catch(error) {
        response.__error(error)
    }
}

async function getHome(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            homeId: fields.homeId.get()
        }

        response.__data(await Service.getHome(data.homeId))

    } catch(error) {
        response.__error(error)
    }
}

async function updateHome(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            homeId: fields.homeId.get()
        }

        const props = [
            'name',
            'description',
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateHome(data.homeId, data))

    } catch(error) {
        response.__error(error)
    }
}

async function deleteHome(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            homeId: fields.homeId.get()
        }

        response.__data(await Service.deleteHome(data.homeId))

    } catch(error) {
        response.__error(error)
    }
}