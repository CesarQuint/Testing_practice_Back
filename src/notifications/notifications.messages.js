module.exports = class Messages {

    constructor($details, $message) {

        this.notificationSaveError = {
            code: 503,
            key: 'notificationSaveError',
            message: $message || 'Error al guardar la información de la notificacion',
            $details
        }

        this.notificationGetError = {
            code: 503,
            key: 'notificationGetError',
            message: $message || 'Error al obtener la información de la notificacion',
            $details
        }

        this.notificationNotFound = {
            code: 404,
            key: 'notificationNotFound',
            message: $message || 'El registro de la notificacion no fue encontrado',
            $details
        }

        this.notificationDeleteError = {
            code: 503,
            key: 'notificationDeleteError',
            message: $message || 'Error al borrar la información de la notificacion',
            $details
        }
    }
}