const Validator = require('../validator')

module.exports = class Fields {

    constructor(request){

        this.props = {
            userId: request.userId,
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.userId = new Validator({
            type: 'objectId',
            name: 'identificador del usuario',
            prop: 'userId',
            value: this.props.userId,
        })
        
        this.paymentId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'paymentId',
            value: this.props.paymentId,
        })

        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })
        
        this.amount = new Validator({
            type: 'float',
            name: 'monto',
            prop: 'amount',
            value: this.props.amount,
        })
    }
}