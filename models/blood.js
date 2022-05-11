const mongoose = require('mongoose')

const bloodSchema = new mongoose.Schema({
    ap: {
        type: String,
        trim: true
    },
    an: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task