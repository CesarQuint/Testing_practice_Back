const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.contractId = new Validator({
            type: 'objectId',
            name: 'identificador del contrato',
            prop: 'contractId',
            value: this.props.contractId,
        })
    }
}