
module.exports = {
    files
}

function files(items) {
    return items.map(file => {
        return {
            filename: file.name,
            content: file.buffer.toString('base64'),
            type: file.type,
            disposition: 'attachment'
        }
    })
}