module.exports = {
    name: "FindEmoji",
	category: 'Leaf',
    code: `$djsEval[const { FindEmoji } = require("leaf-utils");

await FindEmoji({
    message: message,
    slash_command: false,
    args: args,
    time: 300000,
    embed: {
        title: "Successfully created a new emoji",
        description: "Click on these buttons to find emojis",
        color: "#16BD3B",
    },
    buttons: {
        back: "Back",
        next: "Next",
        add: "Add",
    }, // emojis are optional
    emojis: {
        back: "⬅️",
        next: "➡️",
        add: "⏺️",
    },
    colors: {
        back: "PRIMARY",
        next: "PRIMARY",
        add: "DANGER",
    },
    noResultMessage: "No results found for **{{query}}**",
    errorMessage: "An error has occured. I can't add this emoji",
    authorOnly: "Only <@{{author}}> can use these buttons!",
});]`}