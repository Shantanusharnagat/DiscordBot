const { MessageEmbed } =  require("discord.js")
const cash = require('../mongoDB/method/cash')
  const user = require('../mongoDB/models/user')

module.exports.run = async(bot, message, args) =>{
  
  const embed = new MessageEmbed()
  
  let randomCash = Math.round(Math.random()*10)
  await cash(message.author,randomCash)
  
  let findUser = await user.find({ "userid": message.author.id})
  let playerUser = findUser[0]
  
  embed
        .setTitle(`**Paisa hi Paisa**`)
        .setColor("GOLD") 
        .setDescription(`** Cash ${randomCash} 💵 received **\n`)
        .addField('Cash Balance',playerUser.cash.toString())
        .setThumbnail('https://media.istockphoto.com/id/1172767797/photo/indian-five-hundred-rupee-notes-in-a-sack-cloth.jpg?s=612x612&w=0&k=20&c=dwsLwmZAlcfFRw6FEpcehM4jVbZlXDv6p9P9BkY7zmQ=')
    message.channel.send({embeds: [embed]})
    
}

module.exports.help = {
    
    name:"cashspin",
    aliases: "cs",
    desc: "cash box"
}

