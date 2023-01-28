module.exports = {
  name: "emoji-info",
  aliases: ["emojiinfo", "emote-info", "emoteinfo"],
  code: `
    $author[1;Emoji Info;$userAvatar[$clientID]]
    $color[1;RANDOM]
    $image[1;attachment://$advancedTextSplit[$message[1];:;2].$replaceText[$replaceText[$checkCondition[$advancedTextSplit[$message[1];:;1]==<a];true;gif];false;png]]
    $attachment[$get[link];$advancedTextSplit[$message[1];:;2].$replaceText[$replaceText[$checkCondition[$advancedTextSplit[$message[1];:;1]==<a];true;gif];false;png]]
    $addField[1;Emoji Preview:;**[Emote Link]($get[link])**;no]
    $addField[1;Emoji Info:;
      ID: \`$advancedTextSplit[$message[1];:;3;>;1]\`
      NAME: $advancedTextSplit[$message[1];:;2];no]
    $let[link;https://cdn.discordapp.com/emojis/$advancedTextSplit[$message[1];:;3;>;1].$replaceText[$replaceText[$checkCondition[$advancedTextSplit[$message[1];:;1]==<a];true;gif];false;png]?size=4096]
    $onlyIf[$stringStartsWith[$message[1];<]==true;]
    $onlyIf[$message[1]!=;]
    `
}