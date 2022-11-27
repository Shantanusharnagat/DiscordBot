const user=require('../models/user')

const cash= async (player,randomCash)=>{
    try{
        const findUser = await user.find({ userid: player.id})
        if(findUser.length == 1){
            if((Date.now()-findUser[0].cooldown)>20000){
                let query = { _id:findUser[0].id }
                let update = { $inc: { 'cash': randomCash}}
                let result = await user.updateOne(query, update, { new: true})
                return result;
            }else{
                return false
            }
        }else{
            return false
        }
    }catch (error) {
        console.log(error)
    }
}
module.exports = cash