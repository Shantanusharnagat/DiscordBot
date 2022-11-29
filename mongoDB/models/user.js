const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
        uuid:{
            type:String,
        },
        count:{
            type:Number,
            default:0
        }
    }
)

const userSchema = new mongoose.Schema(
    {
        userid:{
            type: String,
            required: true,
        },
        inventory:{
            lootbox:{
                basic:{
                    type: Number,
                    default: 10
                }
            },
            currency:{
                valocoin:{
                    type: Number,
                    required: true,
                    default: 1000
                }
            },
            items:{
                buddies:[itemSchema],
                guns:[itemSchema],
                sprays:[itemSchema]
            }
        },
        cash:{
            type: Number,
            required: true,
            default: 0
        }
    },
    { minimize: false}
)

module.exports = mongoose.model('user', userSchema)