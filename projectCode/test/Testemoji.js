module.exports = {
  name: "emojiID", 
 code: `$title[1;Emoji ID]
$description[1;\`$customEmoji[$message[1];$guildID]\`]
$footer[1;Requested By $username!]
$color[1;00FF00]


$onlyIf[$message[1]!=;{description:\\❌ | Please Type The Emoji's Name!} {color:FF0000}]

$suppressErrors[{title:Emoji Not Found!}
{description: Make sure you have typed the emoji's name correctly with no spaces!}
{footer: Requested By $username!} {color:FF0000}]  
`
}