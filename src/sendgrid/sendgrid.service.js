const Sendgrid = require('@sendgrid/mail')
const Messages = require('./sendgrid.messages')
const Map = require('./sendgrid.map')
const Services = require('../services')
const Config = require('../config')

Sendgrid.setApiKey(Config.sendgrid.key)

module.exports = {
    sendEmail,
    sendView
}

async function sendEmail(data) {
    try {

        const { html, email, subject, files } = data

        const options = {
            from: Config.sendgrid.main,
            to: email,
            subject: subject,
            html: html,
            text: '.'
        }

        if(files && files.length)
            options.attachments = Map.files(files)


        return await Sendgrid.send(options)

    } catch(error) {
        throw new Messages(error).sendgridEmailError
    }
}

async function sendView(viewName, data) {
    try {

        const html = await Services.Mustache.view(viewName, data)

        return await sendEmail({
            html,
            email: data.email,
            subject: data.subject,
            files: data.files
        })

    } catch(error) {
        throw error
    }
}