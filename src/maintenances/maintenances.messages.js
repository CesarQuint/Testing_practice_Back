module.exports = class Messages {

    constructor($details, $message) {

        this.maintenanceSaveError = {
            code: 503,
            key: 'maintenanceSaveError',
            message: $message || 'Error al guardar la información del ',
            $details
        }

        this.maintenanceGetError = {
            code: 503,
            key: 'maintenanceGetError',
            message: $message || 'Error al obtener la información del ',
            $details
        }

        this.maintenanceNotFound = {
            code: 404,
            key: 'maintenanceNotFound',
            message: $message || 'El registro del  no fue encontrado',
            $details
        }

        this.maintenanceDeleteError = {
            code: 503,
            key: 'maintenanceDeleteError',
            message: $message || 'Error al borrar la información del ',
            $details
        }
    }
}