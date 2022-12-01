const { MessageEmbed } =  require("discord.js")
const guns = require("./../collection/gunskins.json")
const buddies=require("./../collection/buddies.json")
const sprays=require("./../collection/spray.json")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    if(args.length!=0){
    var findUser = await user.find({ userid: args[0].substr(2,18) });
  
    let player = message.guild.members.cache.get(args[0].slice(2,-1))

    playerUser = findUser[0];
  


    embed
        .setTitle(`${player.user.username}'s Profile`)
        .setThumbnail(`${player.user.avatarURL()}`)
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
  else{
     var findUser = await user.find({ userid: message.author.id });
  
  

    playerUser = findUser[0];
     embed
        .setTitle(`${message.author.username}'s Profile`)
        .setThumbnail(`${message.author.avatarURL()}`)
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
}

module.exports.help = {
    name:"profile",
    aliases: "pr",
    desc: "Profile of the user"
}