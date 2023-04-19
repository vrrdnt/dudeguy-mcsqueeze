const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel and start recording.'),
    async execute(interaction) { 
        await interaction.deferReply( { ephemeral: true });
        const userInfo = await interaction.guild.members.fetch(interaction.user.id);

        const connection = joinVoiceChannel({
            debug: true,
            guildId: userInfo.voice.guild.id,
            channelId: userInfo.voice.channelId,
            selfDeaf: false,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        connection.on(VoiceConnectionStatus.Ready, async () => {
            await interaction.editReply('Connected to the voice channel.');
        })
    }
}