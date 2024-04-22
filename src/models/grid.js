const mongoose  = require('mongoose')

const Grid = mongoose.model('Grid', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    columns: {
        type: Number,
        required: true,
        trim: true,
    }
})

module.exports = Grid;