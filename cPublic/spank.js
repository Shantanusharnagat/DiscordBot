const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    console.log(args)
    console.log(message.author.id)

    const ping = Math.round(bot.ws.ping)

    if(args=='yourself'){
        embed
            .setTitle(`I spanked so hard`)
            .setDescription('I am dead now')
            .setThumbnail('https://img.freepik.com/premium-vector/cute-ghost-character-dies-spirit-comes-out-mouth_123847-3011.jpg')

            message.channel.send({embeds: [embed]})
    }
    else{

    embed
        .setTitle(`Spanked`)
        .setColor("GOLD") 
        .setDescription(`**🫲 Spanked ${args}**`)

    message.channel.send({embeds: [embed]})
    
    }
}



module.exports.help = {
    
    name:"spank",
    aliases: "s",
    desc: "Spank the tagged user"
}

