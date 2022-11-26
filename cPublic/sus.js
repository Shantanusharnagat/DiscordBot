const { MessageEmbed } =  require("discord.js")

module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
    console.log(args)
    console.log(message.author.id)

  var myPix = new Array("https://play-lh.googleusercontent.com/70TdWJzidDJCnlwgYhl-PWYBQ_gHJSKB_xJKrBha379o5Y6Kc-xQKAihyxNnCmfFlV0", "https://w7.pngwing.com/pngs/74/355/png-transparent-whitty-among-us-crewmate-impostor-astronaut-space-character-game-imposter-bomb.png", "https://static.wikia.nocookie.net/amonguslogic/images/0/04/Among_Us_Logic%2C_But_The_Imposter_Changes_Colors..._-_Cartoon_Animation/revision/latest?cb=20210714075314", "https://i.scdn.co/image/ab67616d0000b273345a1ad46a5d9f597a707c3e");
    var randomNum = Math.floor(Math.random() * myPix.length);
    
        embed
            .setTitle(`**IMPOSTER SPOTTED**`)
            .setColor("DARK_PURPLE")
           // .setImage("https://www.dreadcentral.com/wp-content/uploads/2020/12/Horror-History-GHOST-STORY-Was-Released-in-1981_edited-750x422.jpg")
            .setDescription(`${args}`)
            .setThumbnail(`${myPix[randomNum]}`)

            message.channel.send({embeds: [embed]})
        
}

module.exports.help = {
    
    name:"sus",
    aliases: "su",
    desc: "imposter spotted"
}
