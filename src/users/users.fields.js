const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            homeId:request.homeId,
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.userId = new Validator({
            type: 'objectId',
            name: 'identificador',
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
    
        this.phone = new Validator({
            type: 'string',
            name: 'telefono',
            prop: 'phone',
            value: this.props.phone,
        })
    
        this.password = new Validator({
            type: 'string',
            name: 'contraseña',
            prop: 'password',
            value: this.props.password,
        })

        this.token = new Validator({
            type: 'string',
            name: 'token',
            prop: 'token',
            value: this.props.token,
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

        this.homeId = new Validator({
            type: 'objectId',
            name: 'identificador de casa',
            prop: 'homeId',
            value:this.props.homeId
        })
    }
}