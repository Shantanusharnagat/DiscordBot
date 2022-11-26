const { MessageEmbed } =  require("discord.js")
const cash = require('../mongoDB/method/cash')

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
  const user = require('../mongoDB/models/user')
    const ping = Math.round(bot.ws.ping)
    cash(message.author)

    embed
        .setTitle(`**Paisa hi Paisa**`)
        .setColor("GOLD") 
        .setDescription(`**🕵️‍♂️ ${message.author.cash}**`)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"cashspin",
    aliases: "cs",
    desc: "cash box"
}

