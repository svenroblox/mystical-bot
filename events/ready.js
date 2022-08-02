const { deployCommands } = require('../utils/deploy-commands');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		deployCommands();
		console.log('Ready!');
	},
};