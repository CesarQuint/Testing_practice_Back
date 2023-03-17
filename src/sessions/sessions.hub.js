const Fields = require('./sessions.fields')
const Service = require('./sessions.service')

module.exports = {
    verifySession
}

async function verifySession(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            token: fields.token.get()
        }

        response.__data(await Service.verifySession(data.token))

    } catch(error) {
        response.__error(error)
    }
}