const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Show user info'),
    async execute(client, interaction){
        await interaction.reply({ content: `Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`, ephemeral: true});
    }
}