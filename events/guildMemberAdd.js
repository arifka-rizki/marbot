const Canvas = require('canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px Roboto Medium`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
}

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const channel = member.guild.channels.cache.get('881099170562330675');
        const welcomeRole = member.guild.roles.cache.get('880762376570421258');
        if(!channel) return;
        member.roles.add(welcomeRole);

        Canvas.registerFont('./resources/Roboto.ttf', { family: 'Roboto' });

        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./resources/wallpaper.png');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#ffd8b5';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '28px Roboto Medium';
        context.fillStyle = '#cf0300';
        context.fillText('Selamat datang', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, member.user.username);
        context.fillStyle = '#cf0300';
        context.fillText(member.user.username, canvas.width / 2.5, canvas.height / 1.8);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg'}));
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-img.png');
        const introChannel = member.guild.channels.cache.get('881099584561094666');

        const embedMassage = new MessageEmbed()
            .setColor('RED')
            .setTitle(`Halo ${member.user.username}!`)
            .setDescription(`Selamat datang di server komisariat virtual IMM UGM\n\n"Tak kenal maka tak sayang", kenalan dulu yuk di ${introChannel.toString()}. Sesuai format ya\n\nEnjoy your stay!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('Faskho!')

        channel.send({
            contet: `Selamat datang, <@${member.user.id}>`,
            embeds: [embedMassage],
            files: [attachment]
        });
    }
}