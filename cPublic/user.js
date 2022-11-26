const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const ping = Math.round(bot.ws.ping)

    embed
        .setTitle(`SUIIIIIII`)
        .setColor("RED") 
        .setDescription(`**🕵️‍♂️ Ping Response ${ping}ms**`)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"ping",
    aliases: "p",
    desc: "Ping Status of the Bot to Discord Server"
}

