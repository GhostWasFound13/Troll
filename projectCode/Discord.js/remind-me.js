module.exports = {
  name: 'remind-me',
  code: `
$djseval[
const ms = require("millisecond");
var i = "$splittext[1]";
var res = 0;
i.split(' ').map(x => ms(x)).forEach(e => res = res + e);

if (res != 0) {
  setTimeout(() => {  
    guild.members.cache.get(msg.author.id).send("$splittext[2]");
  }, res);
  msg.reply({
    content: 'Okay, I will remind you about it in $splittext[1]!', 
    allowedMentions: {
      parse: [] 
    } 
  });
} else {
  msg.reply({
    content: "I don't think that is a valid time...",
    allowedMentions: {
      parse: []
    }
  });
}]

$onlyif[$splittext[2]!=;You have to provide a valid message...]

$textsplit[$message;/]

$onlyif[$checkcontains[$message;/]==true;You should seperate the time and the message with a \`/\`!]
$onlyif[$message!=;What should I remind you about?]
`
} 
