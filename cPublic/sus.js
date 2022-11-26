const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    console.log(args)
    console.log(message.author.id)

    const ping = Math.round(bot.ws.ping)

    
        embed
            .setTitle(`**IMPOSTER SPOTTED**`)
            .setColor("DARK_PURPLE")
            .setDescription('<@'+message.author.id+'>')
            .setThumbnail('https://i.pinimg.com/564x/27/11/a5/2711a572d219ebf0a7ee5a1970a17ddb.jpg')

            message.channel.send({embeds: [embed]})
        
}

module.exports.help = {
    
    name:"sus",
    aliases: "su",
    desc: "imposter spotted"
}
