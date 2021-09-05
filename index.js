const { Client, Collection, Intents} = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();

['command_handlers', 'event_handlers'].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

require('dotenv').config();

client.login(process.env.TOKEN);