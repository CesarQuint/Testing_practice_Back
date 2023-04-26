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
    
}