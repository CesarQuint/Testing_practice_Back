module.exports = class Messages {

    constructor($details, $message) {

        this.ticketSaveError = {
            code: 503,
            key: 'ticketSaveError',
            message: $message || 'Error al guardar la información del ticket',
            $details
        }

        this.ticketGetError = {
            code: 503,
            key: 'ticketGetError',
            message: $message || 'Error al obtener la información del ticket',
            $details
        }

        this.ticketNotFound = {
            code: 404,
            key: 'ticketNotFound',
            message: $message || 'El registro del ticket no fue encontrado',
            $details
        }

        this.ticketDeleteError = {
            code: 503,
            key: 'ticketDeleteError',
            message: $message || 'Error al borrar la información del ticket',
            $details
        }
    }
}