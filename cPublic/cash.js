const { MessageEmbed } =  require("discord.js")
const cash = require('../mongoDB/method/cash')

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
  const user = require('../mongoDB/models/user')
  let curuser=await user.find({ "userid": message.author.id})

    cash(message.author)
  
  console.log(curuser.userid)

  

    embed
        .setTitle(`**Paisa hi Paisa**`)
        .setColor("GOLD") 
        .setDescription(`** Cash **: **${curuser.user.cash}**\n`)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"cashspin",
    aliases: "cs",
    desc: "cash box"
}

