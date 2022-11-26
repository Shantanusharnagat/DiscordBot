const { MessageEmbed } =  require("discord.js")
const { isUrlHttp } = require("is-url-http")


module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    function isValidHttpUrl(string) {
        try {
          const newUrl = new URL(string);
          return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
          return false;
        }
      }
    const check=isValidHttpUrl(args)
    if(check){
    embed
        .setTitle(`Checking URL`)
        .setColor("GREEN") 
        .setDescription(`**🕵️‍♂️ ${check}**`)
        .setThumbnail('https://static.vecteezy.com/system/resources/previews/002/743/514/original/green-check-mark-icon-in-a-circle-free-vector.jpg')

    message.channel.send({embeds: [embed]})
    }
    else{
        embed
        .setTitle(`Checking URL`)
        .setColor("RED") 
        .setDescription(`**🕵️‍♂️ ${check}**`)
        .setThumbnail('https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png')

    message.channel.send({embeds: [embed]})
    }
    
    
}

module.exports.help = {
    
    name:"url",
    aliases: "u",
    desc: "Validate urls"
}

