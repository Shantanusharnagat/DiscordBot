const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    let allUsers = await user.find().sort({"points":-1})
    let leaderboard = ``
    for(let i=0;i<allUsers.length;i++){
        userInfo = bot.users.cache.find(user => user.id === allUsers[i].userid)
     
        console.log(allUsers[i].points)
        leaderboard+=`*${userInfo.username} Points*: **${allUsers[i]}**\n`
    }
    embed
          .setTitle("**Leaderboard**")
          .setDescription(`${leaderboard}`)
          .setColor("GOLD")
          .setThumbnail("https://img.freepik.com/premium-vector/realistic-golden-trophy-with-text-space_48799-1061.jpg?w=2000")

    message.channel.send({embeds: [embed]})

  

}

module.exports.help = {
    name:"leaderboard",
    aliases: "l",
    desc: "Leaderboard of points earnt"
}