const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userid:{
            type: String,
            required: true,
        },
        points:{
            type: Number,
            required: true,
            default: 0
        },
        cooldown: {
            type: Number,
            required: true,
            default: Date.now()
        }
    },
    { minimize: false}
)

module.exports = mongoose.model('user', userSchema)