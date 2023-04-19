const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave your voice channel and stop recording.'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id)
        connection.disconnect();

        interaction.reply({ content: 'Disconnected from the voice channel.', ephemeral: true });
    }
}