module.exports = class Messages {

    constructor($details, $message) {

        this.sendgridSaveError = {
            code: 503,
            key: 'sendgridSaveError',
            message: $message || 'Error al guardar la información del sendgrid',
            $details
        }

        this.sendgridGetError = {
            code: 503,
            key: 'sendgridGetError',
            message: $message || 'Error al obtener la información del sendgrid',
            $details
        }

        this.sendgridNotFound = {
            code: 404,
            key: 'sendgridNotFound',
            message: $message || 'El registro del sendgrid no fue encontrado',
            $details
        }

        this.sendgridDeleteError = {
            code: 503,
            key: 'sendgridDeleteError',
            message: $message || 'Error al borrar la información del sendgrid',
            $details
        }

        this.sendgridEmailError = {
            code: 503,
            key: 'sendgridEmailError',
            message: $message || 'Error al enviar la información del correo',
            $details
        }
    }
}