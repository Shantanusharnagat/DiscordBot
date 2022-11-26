const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    console.log(args)
    console.log(message.author.id)

    const ping = Math.round(bot.ws.ping)

    
        embed
            .setTitle(`**IMPOSTER SPOTTED**`)
            .setColor("DARK_PURPLE")
            .setImage("https://t3.ftcdn.net/jpg/03/83/01/44/360_F_383014497_2OcfDEZz4v8v2rCCS9El412Ab4vALcjE.jpg")
            .setDescription(`${args}`)
            

            message.channel.send({embeds: [embed]})
        
}

module.exports.help = {
    
    name:"sus",
    aliases: "su",
    desc: "imposter spotted"
}
