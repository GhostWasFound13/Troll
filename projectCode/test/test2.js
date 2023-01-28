module.exports = {
    name: "FindEmoji",
	category: 'Leaf',
    code: `$djsEval[const { Flood } = require("leaf-utils");

await Flood({
    message: message,
    slash_command: false,
    time: 300000,
    difficulty: 13,
    embed: {
        title: "Flood",
        color: "#FFAE0E",
    },
    emojis: {
        redsquare: "🟥",
        bluesquare: "🟦",
        yellowsquare: "🟨",
        greensquare: "🟩",
        purplesquare: "🟪",
        style: "SECONDARY",
    },
    authorOnly: "Only <@{{author}}> can use these buttons!",
});]`}