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
        
        this.ticketId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'ticketId',
            value: this.props.ticketId,
        })

        this.concept = new Validator({
            type: 'string',
            name: 'concepto',
            prop: 'concept',
            value: this.props.concept,
        })
        
        this.amount = new Validator({
            type: 'float',
            name: 'cantidad',
            prop: 'amount',
            value: this.props.amount,
        })

        this.relevance = new Validator({
            type: 'string',
            name: 'estado de pago',
            prop: 'status',
            value: this.props.status
        })
    }
}