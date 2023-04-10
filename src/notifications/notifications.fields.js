const Validator = require('../validator')

module.exports = class Fields {

    constructor(request){

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        
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
    }
}