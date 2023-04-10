const Validator = require('../validator')

module.exports = class Fields {

    constructor(request){

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.homes = new Validator({
            type: 'array',
            name: 'identificadores de la casa',
            prop: 'homes',
            value: this.props.homes,
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

        this.type = new Validator({
            type: 'string',
            name: 'tipo',
            prop: 'type',
            value: this.props.type
        })
        
        this.limited = new Validator({
            type: 'date',
            name: 'fecha limite',
            prop: 'limited',
            value: this.props.limited
        })
    }
}