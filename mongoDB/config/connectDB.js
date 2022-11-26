const mongoose = require('mongoose')

const connectDB = async (MONGODB_KEY) => {
    try{
        const conn = await mongoose.connect(MONGODB_KEY)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB