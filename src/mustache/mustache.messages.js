module.exports = class Messages {

    constructor($details, $message) {

        this.mustacheSaveError = {
            code: 503,
            key: 'mustacheSaveError',
            message: $message || 'Error al guardar la información de la página',
            $details
        }

        this.mustacheGetError = {
            code: 503,
            key: 'mustacheGetError',
            message: $message || 'Error al obtener la información de la página',
            $details
        }

        this.mustacheNotFound = {
            code: 404,
            key: 'mustacheNotFound',
            message: $message || 'El registro de la página no fue encontrado',
            $details
        }

        this.mustacheDeleteError = {
            code: 503,
            key: 'mustacheDeleteError',
            message: $message || 'Error al borrar la información de la página',
            $details
        }

        this.mustacheRenderError = {
            code: 503,
            key: 'mustacheRenderError',
            message: $message || 'Error al renderizar la página',
            $details
        }

        this.mustacheRenderPDFError = {
            code: 503,
            key: 'mustacheRenderPDFError',
            message: $message || 'Error al renderizar el pdf',
            $details
        }
    }
}