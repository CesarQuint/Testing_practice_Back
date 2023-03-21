const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./homes.messages')

const schema = new Schema({


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

    description: {
        type: String,
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
    this.user = this.userId
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).homeSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).homeDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).homeGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).homeGetError)
    next()
})

module.exports = Model('Homes', schema)