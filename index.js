const fs = require('fs');
const { Client, Collection, Intents, DiscordAPIError } = require('discord.js');
const { token } = ${{ secrets.SecretName}}

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('ready', () => {
    console.log('Bot is Now Online & Working Fine')
    client.user.setActivity(`Bot in testing! :0`, { type: "Playing a Game" })
	client.user.setActivity("Bot in testing! :0");
});

client.login(token);
