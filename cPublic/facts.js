const { MessageEmbed } =  require("discord.js")
const OneAI = require("oneai");


module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
   


const oneai = new OneAI(process.env.ONEAI);
const text = "I feel very bad about hurting Michelle the other day.";
const pipeline = new oneai.Pipeline(
    oneai.skills.sentiments(),
);

pipeline.run(text).then((res)=>{
  console.log('RES: ', res.sentiments.value)
});
    
    
    
}



module.exports.help = {
    
    name:"fact",
    aliases: "f",
    desc: "Api to learn facts on crypto"
}

