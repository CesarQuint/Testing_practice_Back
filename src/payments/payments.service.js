const Model = require('./payments.model')
const Messages =require('./payments.messages')
const Utils =require('../utils')

module.exports={
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment,
    Model,
    Messages
}

async function createPayment(data){
    try {
        const payment = new Model(data)
        await  payment.save()
        return getPayment(payment._id)
    } catch (error) {
        throw error
    }
}

async function getPayments(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find){
            const regexp=new RegExp(query.find,'i')
            options.$or=[
                {name:regexp}
            ]
        }

        if(query.userId)
            options.userId = query.userId

        const payments=await Model.find(options)
            .skip(page*limit)
            .limit(limit)
            .sort({created:-1})
            .populate({
                path: 'user',
                select: {
                    name: true
                }
            
            })
        
        const total =await Model.countDocuments(options)

        return{
            payments,
            metadata:Utils.metadata(page,limit,total,payments.length,query)
        }
    } catch (error) {
        throw error
    }
}
async function getPayment(paymentId){
    try {
        const payment = await Model.findOne({_id:paymentId})
            .populate('user')

        if(!payment)
            throw new Messages(paymentId).paymentNotFound

        return payment
    } catch (error) {
        throw payment
    }
}
async function updatePayment(paymentId,data){
    try {

        const payment = await getPayment(paymentId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            payment[key] = data[key]
        })

        await payment.save()
        return getPayment(payment._id)

    } catch(error) {
        throw error
    }
}

async function deletePayment(paymentId){
    try {

        await getPayment(paymentId)
        await Model.deleteOne({_id: paymentId})

        return paymentId

    } catch(error) {
        throw error
    }
}