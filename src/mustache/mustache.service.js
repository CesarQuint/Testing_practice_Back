const Messages = require('./mustache.messages')
const Mustache = require('mustache')
const HTMLPDF = require('html-pdf')
const Path = require('path')
const FS = require('fs')

module.exports = {
    view,
    pdf
}

async function view(viewName, data = {}) {
    try {

        const path = Path.join(__dirname, 'views', `${viewName}.mustache`)
        const file = FS.readFileSync(path).toString()

        return Mustache.render(file, data)

    } catch(error) {
        throw new Messages(error).mustacheRenderError
    }
}

async function pdf(viewName, data = {}, options = {}) {
    try {

        const html = await view(viewName, data)

        const promise = () => {
            return new Promise((resolve, reject) => {
                HTMLPDF.create(html, options).toBuffer((error, buffer) => {
                    error ? reject(error) : resolve(buffer)
                })
            })
        }

        return {
            file: await promise(),
            contentType: 'application/pdf'
        }

    } catch(error) {
        throw new Messages(error).mustacheRenderError
    }
}