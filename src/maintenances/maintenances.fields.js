const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.maintenanceId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'maintenanceId',
            value: this.props.maintenanceId,
        })

        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })

        this.description = new Validator({
            type: 'string',
            name: 'descripción',
            prop: 'description',
            value: this.props.description,
        })

        this.amount = new Validator({
            type: 'number',
            name: 'monto',
            prop: 'amount',
            value: this.props.amount,
        })

    }
}