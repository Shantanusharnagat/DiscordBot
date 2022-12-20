const dotenv=require("dotenv").config();
const fs=require("fs")
const PREFIX=process.env.PREFIX
const isUrlHttp =require('is-url-http')
const {Client, Collection, MessageEmbed } =require("discord.js")

const bot=new Client({intents: 32767})
bot.CommandsPublic=new Collection()


// MongoDB
const connectDB = require('./mongoDB/config/connectDB')
const newUser = require('./mongoDB/method/newUser')
const incUserPoints = require('./mongoDB/method/incUserPoints')
try{
    connectDB(process.env.MONGODB_KEY)
}catch(error){
    console.log(error)
}

const CommandsPublicFiles=fs.readdirSync("./cPublic").filter((file)=> file.endsWith('.js'))

for(const file of CommandsPublicFiles){
    const CommandListPublic=require(`./cPublic/${file}`)
    bot.CommandsPublic.set(CommandListPublic.help.name, CommandListPublic)
    bot.CommandsPublic.set(CommandListPublic.help.aliases, CommandListPublic)
    console.log(`${CommandsPublicFiles.length} ${file} is loaded from [ cPublic ] folder`)
}


bot.on("ready", ()=>{
    bot.user.setActivity(`1899 ` ,  {type: "WATCHING"})
    console.log(`${bot.user.tag} is started!!`)

})

// bot.on("messageDelete", async (messageDelete)=>{
//     messageDelete.channel.send("I saw that 👽")
// })


bot.on("message", async(message)=>{
    if(message.author.bot) return;
  
    let msg=message.content.split(' ')
 
    let cmdWithPrefix=msg[0]
    let args=msg.slice(1)
    let cmd=cmdWithPrefix.slice(PREFIX.length)
    
    let userRegistered = await newUser(message.author)
    if(userRegistered === true) message.channel.send(`**ACCOUNT CREATED** ${message.author.username}`)
    else{
        await incUserPoints(message.author)
    }
  

    if(cmdWithPrefix.toUpperCase().startsWith(PREFIX)){
        PublicCommands(cmd, message, args)
    }

    
})

function PublicCommands(cmd, message,args){
    let cPublicFiles=bot.CommandsPublic.get(cmd)
    if(cPublicFiles) cPublicFiles.run(bot, message, args)
}

bot.login(process.env.BOTKEY)