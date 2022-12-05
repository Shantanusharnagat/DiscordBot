const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    
   
            let url = 'https://api.giphy.com/v1/gifs/search?api_key=Ml4YJpXHLpXCSldzAKQJ7Lmey3WN97RB&q=' + args;
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    
                     img=content.data[0].images.original.url
                });    


    embed
        .setTitle(`GIF`)
        .setColor("RED") 
        .setDescription(``)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')
        .setImage(img)

    message.channel.send({embeds: [embed]})
    
    
}



module.exports.help = {
    
    name:"gif",
    aliases: "g",
    desc: "Ping Status of the Bot to Discord Server"
}

