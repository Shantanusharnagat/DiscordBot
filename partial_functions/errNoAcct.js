const errNoAcct = async(message) =>{
    console.log(`${message.author.username} | ${message.author.id} NO ACCOUNT`)
    message.channel.send(`ERROR 500, TRY AGAIN LATER`)
}

module.exports = errNoAcct