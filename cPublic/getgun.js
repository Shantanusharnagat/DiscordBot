const { MessageEmbed } =  require("discord.js")
const gunscollection = require("./../collection/gunskins.json").collection
const buddiesCollection=require("./../collection/buddies.json").collection
const sprayCollection=require("./../collection/spray.json").collection
const errNoAcct = require("./../partial_functions/errNoAcct")
const dropbuddies = require("../mongoDB/method/dropbuddies")
const dropguns = require("../mongoDB/method/dropguns")
const dropsprays = require("../mongoDB/method/dropsprays")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    var findUser = await user.find({ userid: message.author.id });
    if(findUser.length>0){
        let playerUser = findUser[0];
        var arr=[ gunscollection, buddiesCollection, sprayCollection]
        let randomItem = Math.floor(Math.random()*3)
        let itemList = Object.values(arr[randomItem])
        let randomNumber = Math.round(Math.random()*itemList.length)
        let itemReceived = itemList[randomNumber]
        
        
       
       
        await dropbuddies(message.author,itemReceived.uuid)

        embed
            // .setAuthor({ name: `${message.author.username}'s opened Lootbox`, iconURL: message.author.avatarURL()})
            .setTitle(`${itemReceived.displayName}`)
            .addField(`Inventory`,
`
**Total Buddies**: ${playerUser.inventory.items.buddies.length+1}

`)  
             .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png")
            .setImage(itemReceived.displayURL)
            .setColor("AQUA") 
            .setFooter({text:`${message.author.username}'s lootbox`, iconURL: message.author.avatarURL()})
    
        await message.channel.send({embeds: [embed]})
        
//         else if(randomItem==gunscollection){
//           await dropguns(message.author,itemReceived.uuid)

//         embed
//             // .setAuthor({ name: `${message.author.username}'s opened Lootbox`, iconURL: message.author.avatarURL()})
//             .setTitle(`${itemReceived.displayName}`)
//             .addField(`Inventory`,
// `
// **Total Guns**: ${playerUser.inventory.items.guns.length+1}

// `)  
//              .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png")
//             .setImage(itemReceived.displayURL)
//             .setColor("AQUA") 
//             .setFooter({text:`${message.author.username}'s lootbox`, iconURL: message.author.avatarURL()})
    
//         await message.channel.send({embeds: [embed]})
//         }
//       else if(randomItem==sprayCollection){
//         await dropsprays(message.author,itemReceived.uuid)

//         embed
//             // .setAuthor({ name: `${message.author.username}'s opened Lootbox`, iconURL: message.author.avatarURL()})
//             .setTitle(`${itemReceived.displayName}`)
//             .addField(`Inventory`,
// `
// **Total Sprays**: ${playerUser.inventory.items.spray.length+1}

// `)  
//              .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png")
//             .setImage(itemReceived.displayURL)
//             .setColor("AQUA") 
//             .setFooter({text:`${message.author.username}'s lootbox`, iconURL: message.author.avatarURL()})
    
//         await message.channel.send({embeds: [embed]})
//       }
    }else{
        errNoAcct(message)
    }
}

module.exports.help = {
    name:"open",
    aliases: "gg",
    desc: "Open lootbox"
}