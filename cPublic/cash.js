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
        .addFields(
          { name: 'Cash Recived :', value: randomCash, inline: false},
          { name: 'Balance :', value: playerUser.cash}
        )
        .setThumbnail('https://tenor.com/view/evacomics-money-printer-money-printing-printing-money-print-money-gif-23263021')

    message.channel.send({embeds: [embed]})
    
}

module.exports.help = {
    
    name:"cashspin",
    aliases: "cs",
    desc: "cash box"
}

