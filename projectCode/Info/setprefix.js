module.exports = ({
  name: 'setprefix',
  aliases: 'changeprefix',
  usage: 'Setprefix <new prefix>',
  description: 'Sets a new prefix for bot',
  cooldown: '3s',
  code: `$author[1;Prefix Updated;$userAvatar[$clientID]]
$thumbnail[1;$serverIcon[$guildID]]
$description[1;
<a:emoji:903831706291822663> New prefix for this server is \`$message[1]\`]
$color[1;GREEN]
$setServerVar[tommy_prefix;$message[1]]

$onlyIf[$charCount[$message[1]]<6;{newEmbed:{description:<a:c_s:902787152318984192> Prefix cannot be more than 5 characters!}{color:#ff0000}}]
$footer[1;$username[$authorID];$authorAvatar]
$addTimestamp[1]

$onlyIf[$message[1]!=;{newEmbed:{description: Invalid Args in \`prefix\`}{color:#ff0000}}]

$onlyIf[$message[1]!=$toLowercase[$getServerVar[tommy_prefix]];{newEmbed:{description: \`$getServerVar[tommy_prefix]\` is already a prefix!}{color:#ff0000}}]

$onlyPerms[manageserver;{newEmbed:{description: Missing \`Manage Server\` perms!}{color:#ff0000}}]

$cooldown[$commandInfo[setprefix;cooldown];{newEmbed:{description: Wait for %time% to try again}{color:#ff0000}}]
`
});a