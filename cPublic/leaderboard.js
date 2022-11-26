const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    let allUsers = await user.find()
    let leaderboard = `**__Leaderboard__ :**\n`

    for(let i=0;i<allUsers.length;i++){
        userInfo = bot.users.cache.find(user => user.id === allUsers[i].userid)
        leaderboard+=`*${userInfo.username} Points*: **${allUsers[i].points}**\n`
    }

    message.channel.send(leaderboard)

}

module.exports.help = {
    name:"leaderboard",
    aliases: "l",
    desc: "Leaderboard of points earnt"
}