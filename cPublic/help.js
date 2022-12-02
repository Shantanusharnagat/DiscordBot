const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

  

    embed
        .setTitle(`**Commands**`)
        .setColor("GREEN") 
        .setDescription(`
        ?openbox
        ?profile
        ?sus
        ?url
        ?sentiment
        ?leaderboard
        ?spank
        
        
        `)
        .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUSSyfSi5tuWT9NTrZOP8lukhhBYwVv8gyW8Wo7h58dwU1G19rX5pM0bgkjjwyw5tZvU&usqp=CAU')

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"help",
    aliases: "h",
    desc: "Ping Status of the Bot to Discord Server"
}

