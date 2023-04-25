module.exports = class Messages {

    constructor($details, $message) {

        this.graphicSaveError = {
            code: 503,
            key: 'graphicSaveError',
            message: $message || 'Error al guardar la información de la grafica',
            $details
        }

        this.graphicGetError = {
            code: 503,
            key: 'graphicGetError',
            message: $message || 'Error al obtener la información de la grafica',
            $details
        }

        this.graphicNotFound = {
            code: 404,
            key: 'graphicNotFound',
            message: $message || 'El registro de la grafica no fue encontrado',
            $details
        }

        this.graphicDeleteError = {
            code: 503,
            key: 'graphicDeleteError',
            message: $message || 'Error al borrar la información de la grafica',
            $details
        }
    }
}