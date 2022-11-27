const { MessageEmbed } =  require("discord.js")
const OneAI = require("oneai");


module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
   
console.log(args.join(" "))

const oneai = new OneAI(process.env.ONEAI);
const text = args.join(" ");
const pipeline = new oneai.Pipeline(
    oneai.skills.sentiments(),
);

pipeline.run(text).then((res)=>{
    embed
        .setTitle(`NLP SENTIMENT`)
        .setColor("BLUE") 
        .setDescription(`**${res.sentiments[0].value}**`)
        .setThumbnail('https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87930581/87930581.jpg')

    message.channel.send({embeds: [embed]})
});
  
  
 
    
    
}



module.exports.help = {
    
    name:"fact",
    aliases: "f",
    desc: "Api to learn facts on crypto"
}

