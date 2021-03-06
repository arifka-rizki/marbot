const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check MarBot response time to discord'),
    async execute(client, interaction) {
        await interaction.deferReply();
        const sent = await interaction.editReply({ content: 'pinging...', fetchReply: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        const embed = new MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`ā: ${ping}ms\nš: ${client.ws.ping}ms`);

        interaction.editReply({ content: 'š pong', embeds: [embed]});
    },
};