module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if(!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        try{
            await command.execute(client, interaction);
        } catch(error){
            console.error(error);
            await interaction.reply({ content: 'There is error while executing this command!', ephemeral: true});
        }
    }
}