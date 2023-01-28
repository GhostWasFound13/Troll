couple script 1

const { FindCouples } = require("leaf-utils");

await FindCouples({
    message: message,
    slash_command: false,
    time: 300000,
    embed: {
        title: "Match the Couples",
        color: "#F5790D",
    },
    colors: {
        correct: "SUCCESS",
        middle: "PRIMARY",
        wrong: "DANGER",
    },
    winMessage: "Congrats {{user}}! You win.",
    endMessage: "Time is up! Game stopped due to inactivity.",
    authorOnly: "Only <@{{author}}> can use these buttons!",
});


two script


const { FootballMatch } = require("leaf-utils");

await FootballMatch({
    message: message,
    slash_command: false,
    embed: {
        title: "Football Match",
        color: "RED",
    },
    buttons: {
        left: "Left",
        middle: "Middle",
        right: "Right",
    },
    emojis: {
        goalkeeper: "🧍‍♂️",
        goal: "🥅",
        soccer: "⚽",
    },
    winMessage: "GG, <@{{winner}}> scored in **{{time}} seconds**.",
    loseMessage: "<@{{player}}> You lose",
    ongoingMessage:
        "A game is already runnning in <#{{channel}}>. You cant start a new one",
    authorOnly: "Only <@{{author}}> can use these buttons!",
});

memes script

const { Meme } = require("leaf-utils");

await Meme({
    message: message,
    slash_command: false,
    footer: true,
    time: 300000,
    label: {
        firstlabel: "Next Meme",
        secondlabel: "Stop",
    },
    emojis: {
        firstbutton: "↪️",
        secondbutton: "🛑",
    },
    colors: {
        firstbutton: "PRIMARY",
        secondbutton: "DANGER",
    },
    embedColor: "RANDOM",
    authorOnly: "Only <@{{author}}> can use these buttons!",
});

npm Search scrips



const { NPMSearch } = require("leaf-utils");

await NPMSearch({
    message: message,
    slash_command: false,
    args: args,
    embedColor: "#FCAD11",
    query: "Give me a package name to search",
    noResult: "I can't find this package",
});



third scfipt
const { TwoZeroFourEight } = require("leaf-utils");

await TwoZeroFourEight({
    message: message,
    slash_command: false,
    time: 300000,
    embed: {
        title: "2048",
        color: "#F38E05",
    },
    left: {
        label: " ",
        style: "SECONDARY",
        emoji: "◀️",
    },
    up: {
        label: " ",
        style: "PRIMARY",
        emoji: "⬆️",
    },
    down: {
        label: " ",
        style: "PRIMARY",
        emoji: "⬇️",
    },
    right: {
        label: " ",
        style: "SECONDARY",
        emoji: "▶️",
    },
    winMessage: "GG, You win",
    loseMessage: "You lose",
    authorOnly: "Only <@{{author}}> can use this button!",
});


four script