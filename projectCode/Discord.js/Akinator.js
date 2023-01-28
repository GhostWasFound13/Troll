module.exports = {
  name:"akinator",
  aliases:"aki",
  category: "fun",
  code:`
    $djsEval[(async() => {
      const Discord = require('discord.js');
      const akinator = require('discord.js-akinator')
      akinator(message, client, "en");
    })();]
    $onlyBotPerms[admin;:x: I need \`Administrator\` to do that]
  `
}