module.exports = class Messages {

    constructor($details, $message) {

        this.stripeSaveError = {
            code: 503,
            key: 'stripeSaveError',
            message: $message || 'Error al generar el pago',
            $details
        }
    }
}