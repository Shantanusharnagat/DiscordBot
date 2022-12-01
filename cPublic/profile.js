const { MessageEmbed } =  require("discord.js")
const guns = require("./../collection/gunskins.json")
const buddies=require("./../collection/buddies.json")
const sprays=require("./../collection/spray.json")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    var findUser = await user.find({ userid: message.author.id });
    playerUser = findUser[0];
  
  console.log(args.username)

    embed
        .setTitle(`${message.author.username}'s Profile`)
        .setThumbnail(message.author.avatarURL())
        .setColor("PURPLE") 
        .addField("INVENTORY",`
    LootBox: 10
    Guns: ${playerUser.inventory.items.guns.length}
    Buddies: ${playerUser.inventory.items.buddies.length}
    Sprays: ${playerUser.inventory.items.spray.length}
    `,true)
        .addField("STATS",`
    Cash: ${playerUser.cash}   
    `,true)

    message.channel.send({embeds: [embed]})
}

module.exports.help = {
    name:"profile",
    aliases: "pr",
    desc: "Profile of the user"
}