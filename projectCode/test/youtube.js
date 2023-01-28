module.exports = {
 name: "youtube",
 aliases: ['yt'],
 code: `
 $djseval[
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
client.discordTogether.createTogetherCode('$voiceID', 'youtube').then(async invite => {
 return message.channel.send(invite.code);
 });]
 
 $onlyIf[$voiceID!=;you need to join a vc to watch to**YouTube**!]
 `
}