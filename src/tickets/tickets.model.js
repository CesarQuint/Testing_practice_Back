const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./tickets.messages')

const schema = new Schema({
    
    home: {
        type: ObjectId,
        ref: 'Homes',
    },

    homeId: {
        type: ObjectId,
    },

    concept: {
        type: String,
    },

    amount: {
        type:Number,
    },

    relevance: {
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
    this.home = this.homeId
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).ticketSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).ticketDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).ticketGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).ticketGetError)
    next()
})

module.exports = Model('payments', schema)