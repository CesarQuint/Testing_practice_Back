const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./maintenances.messages')

const schema = new Schema({

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    amount: {
        type: Number,
    },

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).maintenanceSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).maintenanceDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).maintenanceGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).maintenanceGetError)
    next()
})

module.exports = Model('Maintenances', schema)