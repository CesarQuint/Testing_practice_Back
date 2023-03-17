module.exports = class Messages {

    constructor($details, $message) {

        this.homeSaveError = {
            code: 503,
            key: 'homeSaveError',
            message: $message || 'Error al guardar la información del ',
            $details
        }

        this.homeGetError = {
            code: 503,
            key: 'homeGetError',
            message: $message || 'Error al obtener la información del ',
            $details
        }

        this.homeNotFound = {
            code: 404,
            key: 'homeNotFound',
            message: $message || 'El registro del  no fue encontrado',
            $details
        }

        this.homeDeleteError = {
            code: 503,
            key: 'homeDeleteError',
            message: $message || 'Error al borrar la información del ',
            $details
        }
    }
}