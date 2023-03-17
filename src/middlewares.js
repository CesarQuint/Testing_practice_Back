const Services = require('./services')
const Messages = require('./messages')
const Config = require('./config')

module.exports = {
    auth,
    serverError,
    serverNotFound,
    responseType
}

async function auth(request, response, next) {
    try {

        const token = request.headers.token
    
        if(!token)
            return response.__error(new Messages().tokenNotFound)
    
        const session = await Services.Sessions.verifySession(token)
    
        request.userId = session.userId.toString()

        if(!session.user.role.includes('admin')) {
            delete request.query.userId
            delete request.query.all
        }

        next()

    } catch(error) {
        response.__error(error)
    }
}

async function serverNotFound(request, response) {
    response.__error(new Messages().serverNotFound)
}

async function serverError(error, request, response, next) {
    response.__error(new Messages(error).serverError)
}

async function responseType(request, response, next) {

    response.__data = data => {
        response.status(200).send({
            success: true,
            data
        })
    }

    response.__error = error => {
    
        console.info(`[APP] (ERROR)`)
        console.info(error)
    
        if(!error || !error.code || !error.key)
            error = {
                code: 503,
                key: 'serverUnknow',
                message: 'Error en el servidor',
                $details: error,
                $stack: (error.stack || '').split('\n')
            }
    
        response.status(error.code).send({
            success: false,
            error
        })
    }

    response.__html = html => {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.status(200).send(html)
    }

    response.__file = data => {
        response.setHeader('Content-Type', data.contentType)
        response.send(data.file)
    }

    response.__redirect = url => {
        response.redirect(url)
    }

    next()
}