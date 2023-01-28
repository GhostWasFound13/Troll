module.exports = {
name: 'betrayal', 
code: `Reminder: People who are on cell phones can't play this game, it's only for people on computers (you can still go on Discord but in the site if you really want to play and you are on a cell phone)

$djseval[
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {
 return message.channel.send(invite.code);
});]
$onlyif[$voiceID!=; you need to be in a vc to do this]
`
}  
a

