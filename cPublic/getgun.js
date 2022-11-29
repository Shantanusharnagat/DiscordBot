const { MessageEmbed } =  require("discord.js")
const buddiesCollection = require("./../collection/gunskins.json").collection

const sprayCollection=require("./../collection/spray.json").collection
const errNoAcct = require("./../partial_functions/errNoAcct")
const dropUpdates = require("../mongoDB/method/dropUpdates")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()

    const user = require('../mongoDB/models/user')
    var findUser = await user.find({ userid: message.author.id });
    if(findUser.length>0){
        let playerUser = findUser[0];
        var arr=[1, buddiesCollection, sprayCollection]
        let randomItem = Math.round(Math.random()*3)
        let itemList = Object.values(arr[randomItem])
        let randomNumber = Math.round(Math.random()*itemList.length)
        let itemReceived = itemList[randomNumber]
       
        await dropUpdates(message.author,itemReceived.uuid)

        embed
            // .setAuthor({ name: `${message.author.username}'s opened Lootbox`, iconURL: message.author.avatarURL()})
            .setTitle(`${itemReceived.displayName} Skin`)
            .addField(`Inventory`,
`
Total Guns: ${playerUser.inventory.items.buddies.length+1}
Total Collection: ${playerUser.inventory.items.buddies.length+1}
`)  
             .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png")
            .setImage(itemReceived.displayURL)
            .setColor("AQUA") 
            .setFooter({text:`${message.author.username}'s lootbox`, iconURL: message.author.avatarURL()})
    
        await message.channel.send({embeds: [embed]})
    }else{
        errNoAcct(message)
    }
}

module.exports.help = {
    name:"open",
    aliases: "gg",
    desc: "Open lootbox"
}