const Validator = require('../validator')

module.exports = class Fields {

    constructor(request){

        this.props = {
            homeId: request.homeId,
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.homeId = new Validator({
            type: 'objectId',
            name: 'identificador de la casa',
            prop: 'homeId',
            value: this.props.homeId,
        })
        
        this.paymentId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'paymentId',
            value: this.props.paymentId,
        })

        this.concept = new Validator({
            type: 'string',
            name: 'concepto',
            prop: 'concept',
            value: this.props.concept,
        })
        
        this.reference = new Validator({
            type: 'string',
            name: 'referencia',
            prop: 'reference',
            value: this.props.reference,
        })
        
        this.paymentphoto = new Validator({
            type: 'string',
            name: 'foto de pago',
            prop: 'paymentphoto',
            value: this.props.paymentphoto,
        })
        
        this.amount = new Validator({
            type: 'float',
            name: 'cantidad',
            prop: 'amount',
            value: this.props.amount,
        })

        this.status = new Validator({
            type: 'string',
            name: 'estado de pago',
            prop: 'status',
            value: this.props.status
        })
    }
}