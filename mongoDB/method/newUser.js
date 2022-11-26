const user = require('../models/user')

const newUser = async (player) => {
    try{
        const findUser = await user.find({ userid: player.id})
        if(findUser.length == 0){
            console.log(`${player.id} | ${player.username} Database created !!`)
            let public_doc = {
                userid: player.id
            }

            await user.create(public_doc)

            return true
        }else{
            return false
        }
    }catch (error) {
        console.log(error)
    }
}

module.exports = newUser