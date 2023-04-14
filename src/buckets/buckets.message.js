module.exports = class Messages {

    constructor($details, $message) {

        this.storageSaveError = {
            code: 503,
            key: 'storageSaveError',
            message: $message || 'Error al guardar la información del almacenamiento',
            $details
        }

        this.storageGetError = {
            code: 503,
            key: 'storageGetError',
            message: $message || 'Error al obtener la información del almacenamiento',
            $details
        }

        this.storageNotFound = {
            code: 404,
            key: 'storageNotFound',
            message: $message || 'El registro del almacenamiento no fue encontrado',
            $details
        }

        this.storageDeleteError = {
            code: 503,
            key: 'storageDeleteError',
            message: $message || 'Error al borrar la información del almacenamiento',
            $details
        }
    }
}