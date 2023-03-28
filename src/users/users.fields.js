const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
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
    
        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })
    
        this.email = new Validator({
            type: 'email',
            name: 'correo',
            prop: 'email',
            value: this.props.email,
        })
    
        this.password = new Validator({
            type: 'string',
            name: 'contraseña',
            prop: 'password',
            value: this.props.password,
        })

        this.newPassword = new Validator({
            type: 'string',
            name: 'nueva contraseña',
            prop: 'newPassword',
            value: this.props.newPassword,
        })

        this.role = new Validator({
            type: 'array',
            name: 'rol',
            prop: 'role',
            value:this.props.role
        })
    }
}