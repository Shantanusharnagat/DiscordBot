const user = require('../models/user')

const dropbuddies = async (player, uuid) => {
    try{
        const findUser = await user.find({ userid: player.id});
        const userDetails = await user.find({ userid: player.id, 'inventory.items.buddies.uuid': uuid });
        if (userDetails.length != 0) {
           query = { _id: findUser[0]._id, 'inventory.items.buddies.uuid': uuid };
           update = { $inc: { 'inventory.items.buddies.$.count': 1 } };
        } else {
          query = { _id: findUser[0]._id, 'inventory.items.buddies.uuid': { $ne: uuid } };
          update = {
            $addToSet: {
              'inventory.items.buddies': { uuid: uuid, count: 1 },
            },
          };
        }
        let result = await user.updateOne(query, update, { new: true });
        if(result) return true
        else return false
    }catch (error) {
        console.log(error)
    }
}

module.exports = dropbuddies