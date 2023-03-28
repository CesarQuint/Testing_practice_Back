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
        
        this.notificationId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'notificationId',
            value: this.props.notificationId,
        })

        this.title = new Validator({
            type: 'string',
            name: 'titulo',
            prop: 'title',
            value: this.props.title,
        })
        
        this.description = new Validator({
            type: 'string',
            name: 'descripcion',
            prop: 'description',
            value: this.props.description,
        })
        
        this.relevance = new Validator({
            type: 'string',
            name: 'relevancia',
            prop: 'relevance',
            value: this.props.relevance,
        })
                
        this.type = new Validator({
            type: 'string',
            name: 'tipo',
            prop: 'type',
            value: this.props.type,
        })
    }
}