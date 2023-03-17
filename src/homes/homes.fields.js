const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.homeId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'homeId',
            value: this.props.homeId,
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

    }
}