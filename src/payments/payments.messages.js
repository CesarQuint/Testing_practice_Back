module.exports = class Messages {

    constructor($details, $message) {

        this.paymentSaveError = {
            code: 503,
            key: 'paymentSaveError',
            message: $message || 'Error al guardar la información del pago',
            $details
        }

        this.paymentGetError = {
            code: 503,
            key: 'paymentGetError',
            message: $message || 'Error al obtener la información del pago',
            $details
        }

        this.paymentNotFound = {
            code: 404,
            key: 'paymentNotFound',
            message: $message || 'El registro del pago no fue encontrado',
            $details
        }

        this.paymentDeleteError = {
            code: 503,
            key: 'paymentDeleteError',
            message: $message || 'Error al borrar la información del pago',
            $details
        }
    }
}