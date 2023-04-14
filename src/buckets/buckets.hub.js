const Service = require('./buckets.service')

module.exports = {
    uploadFile,
}

async function uploadFile(request, response) {
    try {

        const data = {
            file: request.files.file,
            bucket: request.body.bucket
        }

        response.$data(await Service.uploadFile(data))

    } catch(error) {
        response.$error(error)
    }
}