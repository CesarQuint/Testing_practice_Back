const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            userId:request.userId,
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

        this.homeId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'homeId',
            value: this.props.homeId,
        })

        this.street = new Validator({
            type: 'string',
            name: 'calle',
            prop: 'street',
            value: this.props.street,
        })


        this.extnumber = new Validator({
            type: 'string',
            name: 'numero exterior',
            prop: 'extnumber',
            value: this.props.extnumber,
        })


        this.intnumber = new Validator({
            type: 'string',
            name: 'numero interior',
            prop: 'intnumber',
            value: this.props.intnumber,
        })


        this.colony = new Validator({
            type: 'string',
            name: 'colonia',
            prop: 'colony',
            value: this.props.colony,
        })

        
        this.section = new Validator({
            type: 'string',
            name: 'seccion',
            prop: 'section',
            value: this.props.section,
        })       
    }
}