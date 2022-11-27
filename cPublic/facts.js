const { MessageEmbed } =  require("discord.js")
const OneAI = require("oneai");


module.exports.run = async(bot, message, args) =>{
    const embed = new MessageEmbed()
   
    const oneai = new OneAI(process.env.ONEAI);
const text = "Whether to power translation to document summarization, enterprises are increasing their investments in natural language processing (NLP) technologies. According to a 2021 survey from John Snow Labs and Gradient Flow, 60% of tech leaders indicated that their NLP budgets grew by at least 10% compared to 2020, while a third said that spending climbed by more than 30%";
const pipeline = new oneai.Pipeline(
    oneai.skills.summarize(),
);

pipeline.run(text).then(console.log);

    
    
    
}



module.exports.help = {
    
    name:"fact",
    aliases: "f",
    desc: "Api to learn facts on crypto"
}

