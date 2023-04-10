const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./notifications.messages')

const schema = new Schema({
  
    title: {
        type: String
    },

    description: {
        type: String
    },

    relevance: {
        type: String
    },

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    },
})

schema.pre('save', function(next) {
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


module.exports = Model('notifications', schema)