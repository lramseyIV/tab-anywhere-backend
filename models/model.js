const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    }
})


module.exports = mongoose.model('Tabs', tabSchema);