const { Storage } = require('@google-cloud/storage')

const Messages = require('./buckets.message')
const Config = require('../config')

const Bucket = new Storage({
    credentials: Config.bucket
})

module.exports = {
    uploadFile
}

async function uploadFile(file) {
    try {

        const bucketName = Config.bucket.name

        if(!file)
            throw new Messages().storageNotFound

        const response = await Bucket
            .bucket(`${bucketName}`)
            .upload(file.path, { 
                public: true 
            })

        return `https://storage.googleapis.com/${ bucketName }/${ response[0].metadata.name }`

    } catch(error) {
        throw error
    }
}