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
        .setTitle(`YOUR SENTIMENT`)
        .setColor("BLUE") 
        .setDescription(`**${res.sentiments[0].value}**`)
        .setThumbnail('https://cdn.brandmentions.com/blog/wp-content/uploads/2019/05/sentiment-analysys-brandmentions.png')

    message.channel.send({embeds: [embed]})
});
  
  
 
    
    
}



module.exports.help = {
    
    name:"sentiment",
    aliases: "s",
    desc: "Api to find your sentiments"
}

