module.exports = (bot) => {
    const { MessageEmbed } = require("discord.js");
    const Discord = require("discord.js")

    //all functions
    module.exports.check_if_dj = check_if_dj;

    function check_if_dj(client, member, song) {
        if (!client) return false;
        var roleid = member.guild.roles.cache.find(role => role.name == "🎧 DJ")
        if (!roleid) return;
        if (String(roleid) == "") return false;
        var isdj = false;

        if (member.roles.cache.has(roleid.id)) isdj = true;
        if (!isdj && !member.permissions.has("ADMINISTRATOR") && song.user.id != member.id)
            return roleid.id
        else
            return false;
    }
}
async function stealEmoji(message, args, options = []) {
	try {
		if (!message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS'))
			return message.channel.send(
				'❌ You Must Have • Server Moderator or ・ Admin Role To Use This Command ❌'
			)

		const attachment = message.attachments.first()
		const uri = attachment
		if (!uri) {
			if (args[0] == 'https://cdn.discordapp.com/emojis') {
				let url = args[0]

				if (args[1]) {
					name = args[1]
				} else {
					name = 'emojiURL'
				}
				message.guild.emojis
					.create(url, name)
					.then((emoji) => {
						if (options.credit === false) {
							foot = options.embedFoot || 'Emojis'
						} else {
							foot = 'Credits Mik ツ#6472'
						}

						const mentionav = new Discord.MessageEmbed()
							.setTitle(
								options.embedTitle ||
									`Emoji Added\n\nEmoji Name: \`${emoji.name}\`\nEmoji ID: \`${emoji.id}\``
							)
							.setThumbnail(url)
							.setColor(options.embedColor || 0x075fff)
							.setFooter(foot)

						message.channel.send({ embeds: [mentionav] })
					})
					.catch((err) =>
						message.channel.send({ content: 'Error Occured. ' + err })
					)
			} else {
				const hasEmoteRegex = /<a?:.+:\d+>/gm
				const emoteRegex = /<:.+:(\d+)>/gm
				const animatedEmoteRegex = /<a:.+:(\d+)>/gm

				const emoj = message.content.match(hasEmoteRegex)

				if ((emoji = emoteRegex.exec(emoj))) {
					const url =
						'https://cdn.discordapp.com/emojis/' + emoji[1] + '.png?v=1'

					if (args[1]) {
						name = args[1]
					} else {
						name = emoji[1]
					}

					message.guild.emojis
						.create(url, name)
						.then((emoji) => {
						if (options.credit === false) {
							foot = options.embedFoot || 'Emojis'
						} else {
							foot = 'Credits Mik ツ#6472'
						}

							const mentionav = new Discord.MessageEmbed()
								.setTitle(
									options.embedTitle ||
										`Emoji Added ;)\n\nEmoji Name: \`${emoji.name}\`\nEmoji ID: \`${emoji.id}\``
								)
								.setThumbnail(url)
								.setColor(options.embedColor || 0x075fff)
								.setFooter(foot)

							message.channel.send({ embeds: [mentionav] })
						})
						.catch((err) =>
							message.channel.send({ content: 'Error Occured. ' + err })
						)
				} else if ((emoji = animatedEmoteRegex.exec(emoj))) {
					const url =
						'https://cdn.discordapp.com/emojis/' + emoji[1] + '.gif?v=1'

					if (args[1]) {
						name = args[1]
					} else {
						name = emoji[1]
					}
					message.guild.emojis
						.create(url, name)
						.then((emoji) => {
							if (options.credit === false) {
							foot = options.embedFoot || 'Emojis'
						} else {
							foot = 'Credits Mik ツ#6472'
						}

							const mentionav = new Discord.MessageEmbed()
								.setTitle(
									options.embedTitle ||
										`Emoji Added\n\nEmoji Name: \`${emoji.name}\`\nEmoji ID: \`${emoji.id}\``
								)
								.setThumbnail(url)
								.setColor(options.embedColor || 0x075fff)
								.setFooter(foot)

							message.channel.send({ embeds: [mentionav] })
						})
						.catch((err) =>
							message.channel.send({ content: 'Error Occured. ' + err })
						)
				} else {
					message.channel.send({
						content: options.failedMsg || "Couldn't find an emoji from it"
					})
				}
			}
		} else if (uri) {
			if (uri.size > 256000) {
				const mentionav = new Discord.MessageEmbed()
					.setTitle(`Oh no.. Its too big`)
					.setDescription(
						'The image/gif is too big'
					)
					.setThumbnail(uri)
					.setColor(0xc90000)
					.setFooter(foot)

				message.channel.send({ embeds: [mentionav] })
			} else {
				if (args[0]) {
					name = args[0]
				} else {
					name = 'image'
				}
				const url = attachment.url
				message.guild.emojis
					.create(url, name)
					.then((emoji) => {
							if (options.credit === false) {
							foot = options.embedFoot || 'Emojis'
						} else {
							foot = 'Credits Mik ツ#6472'
						}

						const mentionav = new Discord.MessageEmbed()
							.setTitle(
								options.embedTitle ||
									`Emoji Added\n\nEmoji Name: \`${emoji.name}\`\nEmoji ID: \`${emoji.id}\``
							)
							.setThumbnail(url)
							.setColor(options.embedColor || 0x075fff)
							.setFooter(foot)

						message.channel.send({ embeds: [mentionav] })
					})
					.catch((err) =>
						message.channel.send({ content: 'Error Occured. ' + err })
					)
			}
		}
	} catch (err) {
		console.log(`Error Occured. | stealEmoji | Error: ${err.stack}`)
	}
}

module.exports.stealEmoji = stealEmoji;

