require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const PREFIX="$";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
   if (message.content === 'Hello') {
    message.channel.send('Hey Buddy');
  }
  if(message.content.startsWith(PREFIX)){
    const [cmd_name,...args]=message.content
    .trim()
    .substring(PREFIX.length)
    .split(" ");
    if(cmd_name==='kick'){
      if(message.member)
      if(args.length===0){return message.reply("please provide an Id")}
      // message.channel.send(`${args} kicked off the server`);
      const member=message.guild.members.cache.get(args[0]);
      if(member){
        member.kick()
        .catch((err)=> message.channel.send(`i do not have permissions to kick ${member}`))
        .then((message.channel.send(`${member} was kicked.`)));
        
      }else{
        message.channel.send("The member not found");
      }
  
    }
  }
 console.log("ran succesfully");
});

client.login(process.env.DISCORD_BOT_TOKEN);