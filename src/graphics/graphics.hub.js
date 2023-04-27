const Service = require('./graphics.services')

module.exports = {
    getTicketGraphic,
    getPaymentsGraphic
}

async function getTicketGraphic (request,response) {
   try {
    
    const ticketId = request.params.ticketId

    response.__data(await Service.getTicketGraphic(ticketId))

   } catch (error) {
    response.__error(error)
   }
}

async function getPaymentsGraphic (request,response) {
    try {
        data={
            dateType: request.body.dateType,
            datestart: request.body.datestart,
            dateend: request.body.dateend
        }

        response.__data(await Service.getPaymentsGraphic(data))
    } catch (error) {
        response.__error(error)
    }
}