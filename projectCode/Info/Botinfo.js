module.exports = ({
 name: "botinfo", 
 aliases: ['botstats'],
 description: "Check the bot's information/stats",
 category: "information",
 code: `$title[1;Botinfo ($username[$clientID])]
 $color[1;RANDOM]
 $thumbnail[1;$userAvatar[$clientID]]
 $addField[1;RAM; $ramMB]
 $addField[1;CPU Usage; $cpu/100]
 $addField[1;Ping; $pingms]
 $addField[1;Uptime;$uptime]
 $addField[1;Commands; $commandsCount]
 $addField[1;Users;$allMembersCount]
 $addField[1;Channels;$allChannelsCount]
 $addField[1;Servers;$serverCount]
 $addField[1;version;5.0.5]
 $addField[1;Created;$creationDate[$clientID]]
 $addField[1;Developer;$userTag[$botOwnerID]]
 $cooldown[5s;{description:A bit too fast there. Wait for **%time%**!}{color:RANDOM}]`
 }) 