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
   if (cmd_name === 'kick') {
      if (!message.member.permissions.has('KickMembers')) {
        return message.reply("You don't have permission to kick members.");
      }
      if (args.length === 0) return message.reply("Please provide a user ID");

      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member.kick()
          .then(() => message.channel.send(`${member.user.tag} was kicked.`))
          .catch(err => {
            console.error(err);
            message.channel.send(`I do not have permission to kick ${member.user.tag}`);
          });
      } else {
        message.channel.send("Member not found");
      }
    }

    // Ban command
    if (cmd_name === 'ban') {
      if (!message.member.permissions.has('BanMembers')) {
        return message.reply("You don't have permission to ban members.");
      }
      if (args.length === 0) return message.reply("Please provide a user ID");

      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member.ban()
          .then(() => message.channel.send(`${member.user.tag} was banned.`))
          .catch(err => {
            console.error(err);
            message.channel.send(`I do not have permission to ban ${member.user.tag}`);
          });
      } else {
        message.channel.send("Member not found");
      }
    }
  }
});


client.login(process.env.DISCORD_BOT_TOKEN);