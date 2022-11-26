const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    var findUser = await user.find({ userid: message.author.id });
    let playerUser = findUser[0];

    embed
        .setTitle(`${message.author.username}'s Profile`)
        .setThumbnail(message.author.avatarURL())
        .setColor("PURPLE") 
        .setDescription(`**Points: ${playerUser.points}**`)

    message.channel.send({embeds: [embed]})
}

module.exports.help = {
    name:"profile",
    aliases: "pr",
    desc: "Profile of the user"
}