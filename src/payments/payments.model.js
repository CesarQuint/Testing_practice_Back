const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./payments.messages')

const schema=new Schema({
    
    user: {
        type: ObjectId,
        ref: 'Users',
    },
    userId: {
        type: ObjectId,
    },
    name: {
        type: String,
    },
    amount:{
        type:Number,
    },
    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

//TODO: Corregir las funciones de errores

schema.pre('save', function(next) {
    this.user=this.userId
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).paymentSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).paymentDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).paymentGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).paymentGetError)
    next()
})

module.exports = Model('payments', schema)