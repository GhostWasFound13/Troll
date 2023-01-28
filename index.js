const Aoijs = require("aoi.js")
 const { Panel } = require("@akarui/aoi.panel");
const Discord = require("discord.js");
const bot = new Aoijs.Bot({
  connectedBots: true, 
sharding: true,
shardAmount: 100,
token: process.env.tommy, 
prefix: "dead", //<- Change whatever with your prefix//
  fetchInvites: true,
applicationCache: true,
intents: "all",
mobilePlatform: true,
database: {
    db: require("dbdjs.db"),
    type: "dbdjs.db",
    path: "./database1/",
    tables: ["main"]
  }
})

 bot.onInteractionCreate()
bot.readyCommand({
  channel: "$getVar[channelstatus]",
  $if: "v4",
  code: `$log[#new tommy bot made by ShadowYtLol
  $userTag[$clientID] has logging to discord]
  $log[command count:$commandsCount
 uptime: $uptime
ping: $pingms
cpu $cpu/100]`,
}) 
const PanelObject = new Panel({
	username: "Ghostwasfound",
	password: process.env.password,
	secret: "aoijs", // Just write whatever the fuck you want <3
	port: 3000,
	bot,
	mainFile: "index.js",
	commands: "Commands"
});

// Panel events
PanelObject.loadPanel();
PanelObject.onError();
bot.variables(require(`./variables.js`))

require('./handler/status')(bot)
bot.onJoin()
bot.onMessage()
bot.onInteractionCreate()
bot.onMessageDelete();


const loader = new Aoijs.LoadCommands(bot);
(async () => {
await loader.load(bot.cmd, "./Commands/")
})()

loader.setColors( loader.themes.default );