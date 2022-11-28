const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    
    const getANS =async (req, res, next)=>{
    try{
        await (res.data)
        res.status(200).json("PLot has been deleted")
    }catch(err){
        next(err)
    }
}
  
  

    embed
        .setTitle(`SUIIIIIII`)
        .setColor("RED") 
        .setDescription(``)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"ping",
    aliases: "p",
    desc: "Ping Status of the Bot to Discord Server"
}

