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