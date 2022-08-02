module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occured while trying to execute this command!', ephemeral: true });
        }
    },
};