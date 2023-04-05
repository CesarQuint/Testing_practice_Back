module.exports = class Messages {

    constructor($details, $message) {

        this.homeSaveError = {
            code: 503,
            key: 'homeSaveError',
            message: $message || 'Error al guardar la información  de la casa',
            $details
        }

        this.homeAlreadyExist = {
            code: 503,
            key: 'homeAlreadyExist',
            message: $message || 'Error al guardar la información  de la casa este usuario ya tiene una casa asignada',
            $details
        }

        this.homeGetError = {
            code: 503,
            key: 'homeGetError',
            message: $message || 'Error al obtener la información  de la casa',
            $details
        }

        this.homeNotFound = {
            code: 404,
            key: 'homeNotFound',
            message: $message || 'El registro  de la casa no fue encontrado',
            $details
        }

        this.homeDeleteError = {
            code: 503,
            key: 'homeDeleteError',
            message: $message || 'Error al borrar la información  de la casa',
            $details
        }

        this.homeAlreadyExist = {
            code: 503,
            key: 'homeAlreadyExist',
            message: $message || 'Error al guardar la información  de la casa este usuario ya tiene una casa asignada',
            $details
        }
    }
}