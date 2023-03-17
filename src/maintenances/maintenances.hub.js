const Fields = require('./maintenances.fields')
const Service = require('./maintenances.service')

module.exports = {
    createMaintenance,
    getMaintenances,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance
}

async function createMaintenance(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            name: fields.name.get(),
            description: fields.description.get(),
            amount: fields.amount.get(),
        }

        response.__data(await Service.createMaintenance(data))

    } catch(error) {
        response.__error(error)
    }
}

async function getMaintenances(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.__data(await Service.getMaintenances(query))

    } catch(error) {
        response.__error(error)
    }
}

async function getMaintenance(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            maintenanceId: fields.maintenanceId.get()
        }

        response.__data(await Service.getMaintenance(data.maintenanceId))

    } catch(error) {
        response.__error(error)
    }
}

async function updateMaintenance(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            maintenanceId: fields.maintenanceId.get()
        }

        const props = [
            'name',
            'description',
            'amount',
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.__data(await Service.updateMaintenance(data.maintenanceId, data))

    } catch(error) {
        response.__error(error)
    }
}

async function deleteMaintenance(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            maintenanceId: fields.maintenanceId.get()
        }

        response.__data(await Service.deleteMaintenance(data.maintenanceId))

    } catch(error) {
        response.__error(error)
    }
}