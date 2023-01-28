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

bot.status({
  text: "Music",
  type: "LISTENING",
  time: 3
})

//Callbacks
//bot.onMessage()
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
bot.readyCommand({
 channel: "$getVar[channelstatus]",
 $if: "v4",
 code: `$if[$getVar[channelstatus]==]
$log[$userTag[$clientID] active at $formatDate[$dateStamp;LLLL]]
$else
$sendMessage[<@$clientID> active at <t:$cropText[$dateStamp;10]:F>;no]
$endif
$log[$replaceText[$replaceText[$checkContains[$get[update];up to date];true;No update found.];false;$get[update]
____________________________________________
Require Restart to Update Package.]]
$let[update;$exec[npm i https://github.com/akaruidevelopment/music#main]]
$log[Checking Music Package..]
$log[____________________________________________
YouTube    : $get[youtube]
SoundCloud : $get[soundcloud]
Spotify    : $get[spotify]
____________________________________________
Load       : $numberSeparator[$divide[$sub[$dateStamp;$get[time]];1000]]s
____________________________________________]
$let[youtube;$replaceText[$replaceText[$isValidLink[https://youtube.com/];true;✅];false;❌]]
$let[soundcloud;$replaceText[$replaceText[$isValidLink[https://soundcloud.com/];true;✅];false;❌]]
$let[spotify;$replaceText[$replaceText[$isValidLink[https://spotify.com/];true;✅];false;❌]]
$resetServerVar[buttonmusichannel]
$resetServerVar[buttonmusicmessage]
$resetServerVar[filters]
$let[time;$dateStamp]
$suppressErrors`
})

//const voice = new Aoijs.Voice(bot, {
  //cache: {
 //   cacheType: "Memory", //Disk | None | Memory
//    directory: "./music/", //Only for "Disk"
 //w   enabled: true
 // },
//  soundcloud: {
 //   clientId: "iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX",
//    likeTrackLimit: 200
//  },
//  playerOptions: {
// trackInfoInterval: 150
//},
//}); 

//const app = panel.app;
//app.get("/somenewpagename_which_is_not_already_used", (req,res) =>{
  //let a = panel.isLoggedIn(req, res);
  //if(a==false){
//  res.redirect("/")//}
  //else {
  //  res.send("<html><head><title>Aoi.panel</title></head><body>Aoi.panel is cool ngl.</body></html>")
 // }
//})

  bot.command({
       name: "nowplaying",
       aliases: "np",
       code: `$author[1;Now playing;https://cdn.discordapp.com/emojis/729630163750354955.gif?size=1024]
       $title[1;$songInfo[title]]
       $description[1;$addField[Duration;$songInfo[duration]]
       $addField[1;URL;$songInfo[url]]]
       $footer[1;$botPingms to load it.]
       $thumbnail[1;$songInfo[thumbnail]]
       $color[1;a09fff]
       $onlyIf[$queueLength!=0;Nothing song was playing.]
       $onlyIf[$voiceID!=;You need to join the voice channel first!]
    

` 
})


bot.command({
  name: "join",
  code: `
 Successfully joined <#$voiceid[$authorid]>
 $joinVC[$voiceid[$authorid]]
 $onlyif[$voiceid[$clientid]==;:x: Someone is listening to songs in another Voice Channel\nEither join their Voice Channel or use this command later.]
 $onlyIf[$voiceid[$authorid]!=;:x: Please join a Voice Channel and use this command.]
`
});
 
 bot.command({
 name: "command",
 aliases: ['cmd'],
 description: "Know information about a specific command",
 usage: "command <command name>",
 cooldown: '3s',
 code:
 `
$author[1;$toLocaleUppercase[$commandInfo[$message[1];name]] Command;$userAvatar[$clientID];https://dsc.gg/v!per]
$cooldown[$commandInfo[command;cooldown];{newEmbed:{description::c_s: Wait for %time% to try again!}{color:RED}}]
$color[1;$getVar[color]]

$description[1;**Aliases:**
\`- $toLocaleUpperCase[$replaceText[$replaceText[$checkCondition[$commandInfo[$message[1];aliases]!=];true;$replaceText[$commandInfo[$message[1];aliases];,; | ]];false;None]]\`

**Description:**
\`- $replaceText[$replaceText[$checkCondition[$commandInfo[$message[1];description]!=];true;$commandInfo[$message[1];description]];false;None]\`

**Usage:**
\`- $getServerVar[prefix]$replaceText[$replaceText[$checkCondition[$commandInfo[$message[1];usage]!=];true;$commandInfo[$message[1];usage]];false;None]\`

**Cooldown:**
\`- $toLocaleUpperCase[$replaceText[$replaceText[$checkCondition[$commandInfo[$message[1];cooldown]!=];true;$commandInfo[$message[1];cooldown]];false;None]]\`]

$footer[1;<> = Required | () = Optional;$authorAvatar]
 $onlyIf[$commandInfo[$message[1];name]!=;{newEmbed:{description: Command Not Found}{color:#ff0000}}]
 $onlyIf[$message!=;{newEmbed:{description: Invalid Args
Usage:
\`cmd <cmd name>\`}{color:#ff0000}}]`
});


//voice.onTrackStart()

voice.trackStartCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$getServerVar[maxvol]<=$volume]
$volume[$getServerVar[maxvol]]
$endif
$if[$hasPerms[$guildID;$clientID;deafenmembers]-$getVar[deafenclient]==true-1]
$deafenUser[$clientID;yes]
$endif
$if[$getServerVar[buttonmusic]==0]
$author[1;Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]] 
$title[1;$songInfo[title];$songInfo[url]]
$addField[1;Filters;\`$getServerVar[filters]\`;no]
$addField[1;Loop;\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`;yes]
$addField[1;24/7;$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`];yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addfield[1;Create;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`];yes] 
$addField[1;Likes;\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`;yes]
$addField[1;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com;open.spotify.com];true;Listened];false;Views];\`$numberSeparator[$replaceText[$songInfo[views];null;0]]\`;yes] 
$addField[1;Platform;\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]\`;yes]
$addField[1;Artist;\`$songInfo[author]\`;yes] $addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp] 
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$getServerVar[logmusic]==1]==true;]
$else
$if[$getServerVar[buttonmusicmessage]==]
$loop[1;{};autocontrolmusic]
$setServerVar[buttonmusichannel;$channelID]
$setServerVar[buttonmusicmessage;$get[id]]
$let[id;$sendMessage[{"embeds": "{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]} {title:$replaceText[$songInfo[title];";']} {url:$songInfo[url]} {field:Requested By:<@$songInfo[user.id]>:no} {field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`$replaceText[$replaceText[$checkCondition[$getServerVar[buttonmusicmessage]==];true;];false; - \`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`]:yes} {field:Artist:\`$songInfo[author]\`:yes} {field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]\`:yes} {field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com;open.spotify.com];true;Listened];false;Views]:\`$numberSeparator[$replaceText[$songInfo[views];null;0]]\`:yes} {field:Likes:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes} {field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes} {field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes} {field:Filters:\`$getServerVar[filters]\`:no} {timestamp} {thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]} {color:$getVar[color]}}", "components": "{actionRow:{button::1:queue:no:⏏} {button::3:previous:no:⏮} {button::3:play:no:⏯} {button::3:next:no:⏭} {button::1:stop:no:⏹}} {actionRow:{button:$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;Off];false;$toLocaleUppercase[$loopStatus]]:1:loop:no:🔁} {button:-10s:2:downseek:no:⏪} {button:+10s:2:fastseek:no:⏩} {button::1:shuffle:no:🔀}} {actionRow:{button:$truncate[$volume]%:1:volmute:no:🔈} {button:-10%:2:voldown:no:🔉} {button:+10%:2:volup:no:🔊}}" };yes]]
$else
$editMessage[$getServerVar[buttonmusicmessage];{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]}
{title:$songInfo[title]}
{url:$songInfo[url]}
{field:Requested By:<@$songInfo[user.id]>:no}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\` - \`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$replaceText[$replaceText[$checkCondition[$getCurrentDuration<1000];true;0s];false;$humanizeMS[$getCurrentDuration;4]]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`:yes}
{field:Artist:\`$songInfo[author]\`:yes}
{field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]\`:yes}
{field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com;open.spotify.com];true;Listened];false;Views]:\`$numberSeparator[$replaceText[$songInfo[views];null;0]]\`:yes}
{field:Likes:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes}
{field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes}
{field:Song:\`$numberSeparator[$queueLength]\`:yes}
{field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes}
{field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes}
{field:Filters:\`$getServerVar[filters]\`:no}
{timestamp}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]}
{color:$getVar[color]}}]
$endif
$endif
$setGlobalUserVar[cacheplay;$songInfo[url];$songInfo[user.id]]
$setGlobalUserVar[listenuser;$sum[$getGlobalUserVar[listenuser;$songInfo[user.id]];1];$songInfo[user.id]]
$setServerVar[listenserver;$sum[$getServerVar[listenserver];1]]
$setVar[listenglobal;$sum[$getVar[listenglobal];1]]
$onlyIf[$getCurrentDuration<1;]
$setServerVar[ratetime;$sum[$dateStamp;$getVar[customratetime]]]
$playerConfig[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;yes];1;no];0s;yes]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$suppressErrors
$onlyIf[$getServerVar[ratetime]<$dateStamp;{execute:forcestop}]`
})

voice.trackStartCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$setGlobalUserVar[playlistusercount;$sum[$getGlobalUserVar[playlistusercount;$songInfo[user.id]];1];$songInfo[user.id]]
$setGlobalUserVar[playlistuser;$getGlobalUserVar[playlistuser;$songInfo[user.id]],
"name$getGlobalUserVar[playlistusercount;$songInfo[user.id]]": "[$replaceText[$replaceText[$songInfo[title];";'];:;#COLON#]]($replaceText[$songInfo[url];:;#COLON#])";$songInfo[user.id]]
$if[$getGlobalUserVar[playlistuserbypass;$songInfo[user.id]]$suppressErrors==0]
$onlyIf[$checkContains[$songInfo[url];youtube.com;soundcloud.com;cdn.discordapp.com;open.spotify.com]==true;]
$onlyIf[$checkContains[$getGlobalUserVar[playlistuser;$songInfo[user.id]];$songInfo[url]]==false;]
$endif
$onlyIf[$getGlobalUserVar[playlistuserauto;$songInfo[user.id]]!=off;]
$suppressErrors`
})

bot.awaitedCommand({
 name: "forcestop",
 $if: "v4",
 code: `$if[$getGlobalUserVar[247;$songInfo[user.id]]$suppressErrors==0]
$log[Rate Limited Detected, when playing song at $formatDate[$dateStamp;LLLL]]
$sendMessage[{newEmbed:{title:Rate Limited Detected} {description:Force stop active.} {color:ff0000} {timestamp}};no]
$leaveVC
$else
$log[Rate Limited Detected, when playing song at $formatDate[$dateStamp;LLLL]]
$sendMessage[{newEmbed:{title:Rate Limited Detected} {description:Force stop active.} {color:ff0000} {timestamp}};no]
$stop
$endif
$suppressErrors`
})

voice.onTrackEnd()

voice.trackEndCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$getServerVar[buttonmusic]==1]
$deleteMessage[$get[musicmessage];$get[musichannel]]
$endif
$setServerVar[buttonmusichannel;]
$setServerVar[buttonmusicmessage;]
$let[musichannel;$getServerVar[buttonmusichannel]]
$let[musicmessage;$getServerVar[buttonmusicmessage]]
$setServerVar[filters;$getVar[filters]]
$onlyIf[$hasPlayer!=true;]
$suppressErrors`
})

voice.onQueueEnd()

voice.queueEndCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$setServerVar[buttonmusichannel;]
$setServerVar[buttonmusicmessage;]
$setServerVar[filters;$getVar[filters]]
$if[$getServerVar[buttonmusic]==1]
$deleteMessage[$get[musicmessage];$get[musichannel]]
$let[musichannel;$getServerVar[buttonmusichannel]]
$let[musicmessage;$getServerVar[buttonmusicmessage]]
$endif
$suppressErrors`
})


/*const Aoijs = require('aoi.js');
const fs = require('fs');
const { Bot,LoadCommands,Voice } = require('aoi.js');
const config = require('./config.js');
const bot = new Aoijs.Bot(config.Bot);
/* ... */
//Distube for music has been setup**
//const filters = require('./filters.json')
//const { DisTube } = require("distube");
//const { SpotifyPlugin } = require("@distube/spotify");
//const spotifyoptions = {
 /* parallel: true,
  emitEventsAfterFetching: true,
  api: {
    clientId: 'bf5ee2a72bae40ffadc71a47280e5ff9', // Spotify ClientID
    clientSecret: '053469ffeb3844079fab734ebf3090c2', // Spotify ClientSecret
  },
}

bot.distube = new DisTube(bot, {
emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    nsfw: false,
    emptyCooldown: 25,
    customFilters: filters,
  plugins: [new SpotifyPlugin(spotifyoptions)]
}) 
/* ... */
//const variables = require("./variables")

//bot.variables(variables)
//*
//require('./handler/DistubeEvents')(bot)
require('./handler/status')(bot)

//require('./handler/functions')(bot)
//require("./handler/pathToHandlerFile.js"); not working
//onst loadFunction = require("pathToHandlerFile");


//loadFunction(bot, "pathToFunctionDir"); 
// :/
bot.variables(require(`./variables.js`))


bot.onJoin()
bot.onMessage()
bot.onInteractionCreate()
bot.onMessageDelete();


const loader = new Aoijs.LoadCommands(bot);
(async () => {
await loader.load(bot.cmd, "./Commands/")
})()

loader.setColors( loader.themes.default );
//server host

// const keepAlive = require('./server.js')
//const express = require('express');
//const app = express();
//
//app.get('/', (req, res) => {
	//res.sendFile('invite.html', {root: __dirname })
//*);

//app.get('/invite', (req, res) => {
//	res.sendFile('server.html', {root: __dirname })
//});

//app.listen(3000, () => {
	//console.log('Server started');
//});

//role Commands
 

//aoi panel
const PanelObject = new Panel({
	username: "Ghostwasfound",
	password: process.env.password,
	secret: "aoijs", // Just write whatever the fuck you want <3
	port: 3000,
	bot,
	mainFile: "doggo.js",
	commands: "Commands"
});

// Panel events
PanelObject.loadPanel();
PanelObject.onError();

//events.//*
//*const files = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
//files.forEach( x => {
//require(`./events/${x}`)(bot)
//});{
//}


//const voice = new Voice(bot);

////Handlers™
//Handler({ bot,loader,voice });

//const Lavalink = new aoijs.Lavalink(bot);
//Lavalink.addNode(
//url: "lava.link:80",
 //password: "neo",
 //name: "aoi.js",
 //secure: true,
// })

  //BOT JOIN lEAVE SERVER LOGGER

bot.guildJoinCommand({
channel: "918029927423565864",
code: `
$title[1;I joined a New server!]
$addField[1;Guild Name#COLON#;$guildName;yes] 
$addField[1;Member Count#COLON#;$memberscount;yes]
$addField[1;Guild ID#COLON#;$guildID;yes]
$addField[1;Guild Owner#COLON#;$userTag[$ownerID];yes]
$color[1;RANDOM]`
})
bot.onGuildJoin()

bot.guildLeaveCommand({
channel: "918030061540638771",
code: `
$title[1;I was Removed from server]
$addField[1;Guild Name#COLON#;$guildName;yes]
$addField[1;Member Count#COLON#;$memberscount;yes]
$addField[1;Guild ID#COLON#;$guildID;yes]
$addField[1;Guild Owner#COLON#;$userTag[$ownerID];yes]
$color[1;RANDOM]`
})
bot.onGuildLeave() 

//bot.customFunctions = {
    // djs : new bot.cacheManager.Group() ,
   //  'aoi.js' : new bot.cacheManager.Group() 
//}

//tired of using $findUser?

//i got you



bot.functionManager.createCustomFunction({
  name: "$dogTitle",
  type: "djs",
    params: ['index'],
  code:`const {code} = d.command
    const inside = d.unpack()
    const err = d.inside(inside)
    if (err) return d.error(err)
    let [index, name, url] = inside.splits;
    index = Number(index) - 1
    if (isNaN(index) || index < 0) d.aoiError.fnError(d, "custom", {inside}, "Invalid Index Provided In")
    if (!d.embeds[index]) d.embeds[index] = new d.embed()
    d.embeds[index].setTitle(name.addBrackets());

    if (url && url.trim() !== '') {
        d.embeds[index].setURL(url.addBrackets());
    }
    return {
        code: d.util.setCode({function: d.func, code, inside}),
        embeds: d.embeds
    }
  }`
})  


//$findChar[abc;2] will return b, it basically like indexOf
bot.functionManager.createCustomFunction({
 name: "$dogChar",
 type: "djs",
 code: async d => {
 const data = d.util.openFunc(d)
 const [char,pos] = data.inside.splits
 if(!char || isNaN(pos)) {
 let inside = data.inside
 d.aoiError.fnError(d,"custom",{ inside },"invalid character or position (position must be valid number)");
 }
 else {
 let r = char.substring(pos-1,pos)
 data.result = r
 }
 return {
 
 code: d.util.setCode(data)
 
 }
 }
 
}) 
//const { GiveawaysManager } = require('discord-giveaways');
//bot.giveawaysManager = new GiveawaysManager(bot, {
   // storage: "./giveaways.json",
    //default: {
       // botsCanWin: false,
      //  embedColor: "#1793ff",
       // embedColorEnd: "#EE3C23",
    //reaction: "🎁"
    //}
//})

  //$memberAvatar custom function
bot.functionManager.createCustomFunction({
name: "$dogAvatar",
type: "djs",
code: async d => {
const data = d.util.openFunc(d)
const [guildID = d.guild.id,user = d.author.id] = data.inside.splitsw
data.result = d.client.guilds.cache.get(guildID).members.cache.get(user).avatarURL({ size: 2048 })
return {
code: d.util.setCode(data)
}
}
}) 

//usage: `$memberAvatar[guild id(optional);user id(optional)]




const fetch = require('node-fetch');
bot.comman({
  name: "bozo",
  code: `

Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
Take a guess first before taking a hint
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`3\` tries left, \`$getUserVar[hint]\` hint(s) left.
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess2",
    $if: "v4",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it.
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess2;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`2\` tries left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess3",
    $if: "v4",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$setUserVar[hint;$sub[$getUserVar[hint];1];$authorID]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess3;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! You have \`1\` try left, \`$getUserVar[hint]\` hint(s) left
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$setUserVar[msg;$message[1]]
$endIf
`
})
bot.awaitedCommand({
    name: "guess4",
    $if: "v4",
    code: `
$if[$message[1]==$getUserVar[guess]]
Haha nice! You guessed it
$elseIf[$toLowercase[$message[1]]==hint]
$replaceText[$replaceText[$checkCondition[$getUserVar[msg]>$getUserVar[guess]];true;Your last number \`($getUserVar[msg])\` was too high];false;Your last number \`($getUserVar[msg])\` was too low]
$onlyIf[$getUserVar[hint]>0;You dont have hints anymore, dummy]
$awaitMessages[$authorID;1m;everything;guess4;I have waited for to long, my number is \`$getUserVar[guess]\`]
$endElseIf
$elseIf[$isNumber[$message[1]]==false]
Man, $message wasnt even a number. Try again
$awaitMessages[$authorID;1m;everything;guess4;I have waited for too long, my number is \`$getUserVar[guess]\`]
$endElseIf
$else
Incorrect! My number is \`$getUserVar[guess]\`
$endIf
`
})

bot.command({
name: "splitText",
code: `
$splitText[1] test1
$splitText[2] test2
`
})

bot.joinCommand({
  channel: "$getServerVar[verifchannel]",
  code: `
  <@$authorID>
  $title[1;✅VERIFICATION]
  $description[1;Verify Your Self To Access This Server
  With Send **$getUserVar[code]** At This Channel]
  $image[1;https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.imgur.com%2FOrxlL0R.jpg&text=$getUserVar[code]&text_size=128&y_align=middle&x_align=center]
  $setUserVar[code;$randomString[5]]
  $onlyIf[$getServerVar[verify]oN;]
  `})

  bot.command({
    name: "setup",
    code: `
    $awaitMessages[$authorID;30s;everything;tsp2;Command has been cancelled]
    $sendMessage[**Which Category Do you want to make For Ticket System.
    Provide the Category ID. 
    This Command will be cancelled after** \`30 seconds\`.;no]
    $onlyPerms[admin;Only Users with \`ADMIN\` perms can use this{delete:10s}]
    $suppressErrors[]`
   })
    
   bot.awaitedCommand({
    name: "tsp2",
    code: `
   **✅ Setup ticket is complete**
    $setServerVar[ticketchannel;$message]
    $onlyIf[$channelExists[$message]==true;Provided Category Doesn't Exist{delete:10s}]
    $onlyIf[$isNumber[$message]==true;Please provide Category ID{delete:10s}]`
   })
    
   bot.command({
    name: "ticket",
    code: `
   $newTicket[ticket-$username[$authorID];{newEmbed:{title:Ticket opened!}{description:Hello, <@$authorID>. Here is your ticket!:tickets: Please give the information about your problem or feedback. 
   Thanks in advance for being patient}{footer:Use close to close your ticket}};$getServerVar[ticketchannel];no;<@$authorID>, I failed to create your ticket! Try again]
   $sendMessage[Ticket Successfully opened! Hello, <@$authorID>. Go to **$toLowercase[#$username$discriminator]** to describe your issue!;Something went wrong]
 $deleteCommand`
   })
    
   bot.command({
    name: "close",
    code: `
   $closeTicket[This is not a ticket]
   $onlyIf[$checkContains[$channelName;ticket]==true;This command can only be used in tickets{delete:10s}]
   $suppressErrors`
   })
   
bot.command({
name:"giveaway",
code:`$editmessage[$get[e];{newEmbed:{author:🎉 GIVEAWAY (ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}}]
$sendmessage[Congratulations <@$get[winner]>! You won **$get[prize]**;no]
$onlyif[$getmessagevar[ended]==false;]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$wait[$get[time]]
$setmessagevar[endstamp;$get[endstamp];$get[e]]
$setmessagevar[hoster;$authorid;$get[e]]
$setmessagevar[prize;$get[prize];$get[e]]
$let[e;$apimessage[$channelid;;{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**No one** has joined this giveaway}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE};{actionRow:🎊 Join 🎊,2,3,join:🔁 Reroll 🔁,2,1,reroll:🔚 End 🔚,2,4,end};;yes]]
$let[endstamp;$sum[$datestamp;$ms[$get[time]]]]
$let[prize;$messageslice[1]]
$onlyif[$ms[$get[time]]!=undefined;Invalid time provided]
$let[time;$message[1]]
$onlyif[$message[2]!=;Enter a time and a prize]`})
bot.onInteractionCreate()
bot.interactionCommand({
name:"join",
prototype:"button",
code:`$editmessage[$get[msg];{newEmbed:{author:🎉 GIVEAWAY 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$get[host]>\n**Nº Winners:** 1\n**Ends** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users have participated in this giveaway.}{footer:Ends at:}{timestamp:$get[endstamp]}{color:BLUE}}]
$setmessagevar[joinedusers;$getmessagevar[joinedusers;$get[msg]]$authorid@;$get[msg]]
$setmessagevar[joined;$get[participated];$get[msg]]
$onlyif[$get[condition]==false;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];false;Joined the giveaway];true;You have already joined the giveaway];ended;The giveaway ended];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;ended];false;$get[condition]]]
$let[condition;$checkcontains[$getmessagevar[joinedusers;$interactiondata[message.id]];$authorid]]
$let[participated;$sum[$getmessagevar[joined;$get[msg]];1];$get[msg]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"reroll",
prototype:"button",
code:`$editmessage[$get[e];{newEmbed:{author:🎉 GIVEAWAY (REROLLED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Reroll:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}}]
$sendmessage[Congratulations <@$get[winner]>! You won the reroll of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]
})==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Rerolled the giveaway];true;This giveaway has not ended yet];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];true;$replacetext[$replacetext[$get[condition];true;perform];false;false]];false;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})
bot.interactionCommand({
name:"end",
prototype:"button",
code:`$editmessage[$get[e];{newEmbed:{author:🎉 GIVEAWAY (FORCE ENDED) 🎉:}{thumbnail:$servericon}{title:$get[prize]}{description:**Hosted By#COLON#** <@$authorid>\n**Winner After Force End:** <@$get[winner]>\n**Ended** <t:$truncate[$divide[$get[endstamp];1000]]:R>\n\n**$get[participated]** Users had joined this giveaway}{footer:Ended at:}{timestamp:$get[endstamp]}{color:BLUE}}]
$sendmessage[Congratulations <@$get[winner]>! You won the giveaway(force ended) of **$get[prize]**;no]
$onlyif[$get[winner]!=;No winner decided due to lack of participation]
$setmessagevar[ended;true;$get[e]]
$let[winner;$randomtext[$joinsplittext[;]]]
$removetextsplitelement[$gettextsplitlength]
$textsplit[$getmessagevar[joinedusers;$get[e]];@]
$let[participated;$getmessagevar[joined;$get[e]]]
$let[e;$get[msg]]
$onlyif[$get[condition]==perform;]
$interactionreply[$replacetext[$replacetext[$replacetext[$get[condition];perform;Ended the giveaway];true;This giveaway has already ended];false;You do not have enough perms];;;64]
$let[condition;$replacetext[$replacetext[$getmessagevar[ended;$get[msg]];false;$replacetext[$replacetext[$get[condition];true;perform];false;false]];true;$get[condition]]]
$let[condition;$hasperms[$authorid;manageserver]]
$let[host;$getmessagevar[hoster;$get[msg]]]
$let[endstamp;$getmessagevar[endstamp;$get[msg]]]
$let[prize;$getmessagevar[prize;$get[msg]]]
$let[msg;$interactiondata[message.id]]`})

bot.command({
    name: "shardID",
    code: `Guilds Shard: $shardID`
})
  
bot.command({
name: "create",
code: `$createSlashCommand[$guildID;say;send a message;message:your message:true:3]`})

bot.command({
name: "create",
code: `$createSlashCommand[$guildID;AOIjs;A cool slash command for AOIjs]`
/*
    Code Breakdown:
This will make a slashcommand named "AOIjs" (meaning you'd do /AOIjs),
the description will say "A cool slash command for AOIjs"
*/
})

bot.reactionAddCommand({
  channel:"$channelid",
  code:`$setchannelvar[to;$authorid;$splittext[1]]
  $textsplit[$newticket[ticket-$username-$discriminator;<@$authorid> {newEmbed:{title:Welcome to your ticket, $username!}{description:$advancedtextsplit[$getservervar[tmm];/;$findtextsplitindex[$messageid]]}{color:FFFF}{footer:$username[$clientid] tickets | Created with ❤️:$useravatar[$clientid]}{thumbnail:$authoravatar}{author:$usertag:$replacetext[$replacetext[$checkcondition[$servericon==];true;];false;$servericon]}};$advancedtextsplit[$getservervar[tmc];/;$findtextsplitindex[$messageid]];yes;]; ]
  $clearreactions[$channelid;$messageid;$authorid;$emojitostring]
  $onlyif[$findtextsplitindex[$messageid]!=0;]
  $onlyif[$isbot==false;]
  $textsplit[$getservervar[tmid];/]
  $onlyif[$getservervar[tmid]!=a;]
  $onlyif[\`$emojitostring\`==\`🎫\`;]`})
  bot.onReactionAdd()





    
    
    
    
bot.command({
  name: "addemoji",
  aliases: "steal",
  code:`Emoji $addEmoji[https://cdn.discordapp.com/emojis/$replaceText[$replaceText[$checkCondition[$checkContains[$message[1];<]$checkContains[$message[1];:]$checkContains[$message[1];>]==truetruetrue]$isNumber[$message[1]];truefalse;$replaceText[$advancedTextSplit[$message[1];:;3];>;]];falsetrue;$message[1]];$message[2];yes] added with the name -> **$message[2]**
 $onlyIf[$charCount[$message[2]]>=2;⛔ **You must put a longer name over than \`2 chars\`**]
 $onlyIf[$message[2]!=;**Usage**: \`addemoji <emoji | emojiID> <name>\`]
$onlyPerms[manageemojis;**You dont have the permission to use this command**]
$onlyBotPerms[manageemojis;**I dont have the permission to use this command**]
$suppressErrors`
})

  



 

bot.command({
name: "antilink",
code: `$let[e;$apiMessage[;{newEmbed:{author:$username[$authorID]#$discriminator[$authorID]:$authorAvatar::}{description:✅ -> \`Enable\`\n\n⛔ -> \`Disable\`\n**Antilink status:** $replaceText[$replaceText[$getServerVar[antilink];true;Enabled];false;Disabled]}{timestamp:ms}{color:#5865F2}};{actionRow:Enable,2,1,EnableButton,✅|0|false:Disable,2,1,DisableButton,⛔|0|false};;yes]]
$onlyPerms[admin;Missing permission:\`admin\`]
$onlyBotPerms[admin;Missing permission:\`admin\`]`
})
 
bot.interactionCommand({
 name: "EnableButton",
 prototype:"button",
 code:`$setServerVar[antilink;true]
$interactionReply[;{newEmbed:{title:✅ Done}{description:Antilink successfully enabled!}{color:#7BDE3D}};;0;7]
$onlyIf[$getServerVar[antilink]==false;$interactionReply[Antilink already enabled!;;;0;4]`
})
 
bot.interactionCommand({
 name: "DisableButton",
 prototype:"button",
 code:`$setServerVar[antilink;false]
$interactionReply[;{title:✅ Done}{description:Antilink successfully disabled!!}{color:#179C33};;0;7]
$onlyIf[$getServerVar[antilink]==true;$interactionReply[Antilink already disabled!;;;0;4]`
})
 
 
bot.command({
name: "$alwaysExecute",
code: `
$deleteIn[5s]
<@$authorID>, \`You can't send links here!\` ***Reason***:**Antilink Enabled.**
$deletecommand
$onlyIf[$checkContains[$message;https#COLON#://;http#COLON#//;discord.gg/;https://discord.gg/]==true;]
$onlyIf[$hasAnyPerm[admin;manageserver;managechannels;manageroles]==false;]
 $onlyIf[$getServerVar[antilink]==true;] 
`})



bot.command({
name: "removerole",
code: `$color[1;RANDOM]
$takeRoles[1;$mentioned[1];$mentionedRoles[1]]
$title[1;Removed role to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[1;**$username** has taken <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
name: "giverole",
aliases: ['role' , 'grole'],
code: `$color[1;RANDOM]
$giveRoles[1;$mentioned[1];$mentionedRoles[1]]
$title[1;Role given to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[1;**$username** has given <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
  name: "temprole",
  code: `
$channelSendMessage[$channelID;<@$mentioned[1]>, I removed the $roleName[$findRole[$message[2]]] role, time's up]
$takeRoles[1;$mentioned[1];$findRole[$message[2]]]
$wait[$replaceText[$replaceText[$checkCondition[$message[3]==];true;24d];false;$message[3]]]
$channelSendMessage[$channelID;{newEmbed:{description:✅ | $username[$mentioned[1]]#$discriminator[$mentioned[1]] has been given the $roleName[$findRole[$message[2]]] role. For \`$replaceText[$replaceText[$checkCondition[$message[3]==];true;undefined time];false;$message[3]]\`}{color:RANDOM}}]
$giveRoles[$mentioned[1];$findRole[$message[2]]]
$suppressErrors[{newEmbed:{title:An error occured}{description:Looks like I can't find the role}{color:RED}}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than me on role position]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$argsCheck[>3;Incorrect arguments. Example: temprole @user @role]
$onlyPerms[manageroles;{title:Missing Permissions}{color:RANDOM}{description:You don't have \`MANAGE_ROLES\` permissions to use this command}]`
})



//utility start
bot.deletedCommand({
 channel: "$channelID",
 code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day $month $year - $hour:$minute]`
});
bot.onMessageDelete();
 
bot.command({
name: "snipe",
code: `$color[RANDOM]
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]`
})
 
bot.command({
name: "quote",
code: ` $author[$userTag[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]];$userAvatar[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]]]
$description[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];content]
 
[Jump to message\\]($replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$message];false;https://discord.com/channels/$guildID/$mentionedChannels[1;yes]/$noMentionMessage])]
$textSplit[$message;/]
$color[RANDOM]
$suppressErrors[**⛔ Could not find message**]`
})
 
 
bot.updateCommand({
 channel: "$channelID",
 code: `$setChannelVar[msgEditorID;$authorID]
 $setChannelVar[esnipeOldMsg;$oldMessage]`
})
bot.onMessageUpdate();
 
bot.command({
 name: "editsnipe",
 aliases: ["esnipe"],
 code: `$author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
$description[$getChannelVar[esnipeOldMsg]]
$addTimestamp
$color[RANDOM]
$onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: there is nothing to snipe}{color: RED}]
$suppressErrors[There is nothing to snipe]`
})
//utility end













//moderation
bot.command({
  name: "ban",
  code: `$author[$userTag[$findUser[$message[1];no]] has been banned;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[FF0000]
  $addTimestamp
  $ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]i
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't ban yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't ban the owner of the server]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user was already banned from the server]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't ban me with myself]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
  $argsCheck[1;Invalid command usage, try using it like:
ban [member] (optional reason)
 
Example:
ban @user/ID optional reason]
  $onlyBotPerms[ban;I need \`Ban\` permission to do this]
  $onlyPerms[ban;you need \`Ban\` permission to do this]
  $suppressErrors[user not found]`
})
bot.command({
  name: "kick",
  code: `$author[$userTag[$findUser[$message[1];no]] has been kicked;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[ffd84d]
  $addTimestamp
  $kick[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user is banned from the server]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't kick me with myself]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't kick yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't kick the owner of the server]
   $argsCheck[1;❌ **incorrect usage**
  
  ✅ correct usage: kick @user/ID optional reason]
   $onlyBotPerms[kick;I need \`Kick\` permission to do this]
  $onlyPerms[ban;you need \`Kick\` permission to do this]
  $suppressErrors[user not found]`
})
bot.command({
  name: "setmuterole",
  aliases: "setmute",
  code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $description[the <@&$findRole[$message[1]]> role has been established as a mute role]
  $color[$getRoleColor[$findRole[$message[1]]]]
  $addTimestamp
  $setServerVar[mute;$findRole[$message[1]];$guildID]
  $onlyIf[$roleExists[$findRole[$message[1]]]==true;that role doesn't exist]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$message[1]]];my highest role is lower than the role you choose]
  $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
  $suppressErrors[role not found]`
  })
  bot.command({
  name: "mute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been muted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $giveRole[$findUser[$message[1];no];$getServerVar[mute]]
    $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to mute is higher than my highest role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
  $onlyIf[$hasRole[$findUser[$message[1];$getServerVar[mute]]]==false;this user was already muted]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
    $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to mute the user]`
})
bot.command({
  name: "unmute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been unmuted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $takeRole[$findUser[$message[1];no];$getServerVar[mute]]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to unmute is higher than my highest role]
 
$onlyIf[$hasRole[$findUser[$message[1];no];$getServerVar[mute]]==true;this user is not muted]
  $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
    $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
    $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: unmute @user/ID optional reason]
$onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to unmute the user]`
})
bot.command({
  name: "warn",
  code: `$author[$userTag[$findUser[$message[1];no]] has been warned;$userAvatar[$findUser[$message[1];no]]]
  $title[**Moderator:** $userTag[$authorID]]
  $description[**Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[RANDOM]
  $addTimestamp
  $setUserVar[warn;$sum[$getUserVar[warn;$findUser[$message[1];no]];1];$findUser[$message[1];no]]
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;you can't warn bots]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't warn the owner of the server]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't warn yourself]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: warn @user/ID optional reason]
  $onlyPerms[kick;you need \`Kick\` permission]
  $suppressErrors[user not found]`
})
bot.command({
  name: "warns",
  code: `$author[$userTag[$findUser[$message[1];no]];$userAvatar[$findUser[$message[1];no]]]
  $title[Have: $getUserVar[warn;$findUser[$message[1]]] infractions]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: infractions @user/ID]
  $suppressErrors[user not found]`
})
bot.command({
  name: "tempmute",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$giveRole[$findUser[$message[1]];$getServerVar[mute]]
$setTimeout[$message[2];userID: $findUser[$message[1]]
serverID: $guildID]
$onlyIf[$hasRole[$findUser[$message[1]];$getServerVar[mute]]==false;this user was already muted]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
$onlyIf[$getServerVar[mute]!=;you didn't set the mute role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't mute the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't mute me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempmute @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[manageroles;I need \`Manage roles\` permission]
$onlyPerms[manageroles;you need \`Manage roles\` permission]`
})
bot.command({
  name: "tempban",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$setTimeout[$message[2];userID2: $findUser[$message[1]]
reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;this user was already banned]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't ban the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't ban me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: tempban @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[ban;I need \`Ban\` permission]
$onlyPerms[ban;you need \`Ban\` permission]`
})
bot.command({
  name: "clear",
  aliases: "purge",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully deleted $message[1] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message]]
  $color[RANDOM]
  $addTimestamp
 
$clear[$message[1]]
  $onlyIf[$checkContains[$message[1];-]==false;you can use negative numbers, stop trying to break me smh]
  $onlyIf[$message[1]=>1;you can only clear more than 1 message]
  $argsCheck[>1;❌ incorrect usage
  
  ✅ correct usage: clear <number>]
  $onlyPerms[managemessages;you need \`Manage messages\` permission]
  $onlyBotPerms[managemessages;I need \`Manage messages\` permission]
$suppressErrors[failed to clear the messages]`
})
bot.command({
  name: "clearwarns",
code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $title[$message[last] warnings cleared from $userTag[$findUser[$message[1];no]]]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $onlyPerms[kick;you need \`Kick\` permission]
  $onlyIf[$isNumber[$message[last]]==true;please write a valid number of warnings to clean from the user]
  $onlyIf[$getUserVar[warn;$findUser[$message[1]]]<=$message[last];the user does not have that amount of warnings to clean]
  $onlyIf[$checkContains[$message[last];-]==false;please write a valid **positive number** of warnings to clean from the user]
    $setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message[1];no]];$message[last]];$findUser[$message[1];no]]
  $argsCheck[>1;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $argsCheck[>2;❌ **incorrect usage**
 
  ✅ correct usage: clearwarnings @user/ID (number)]
  $suppressErrors[failed to clear the warnings]`
})
 

 
bot.timeoutCommand({
 
 
code: `$sendDM[$timeoutdata[userID2];you have been unbanned in $serverName[$timeoutdata[serverID]]]
$unban[$timeoutdata[userID2]]`
 
})
 
bot.timeoutCommand({
 
code: `$sendDM[$timeoutdata[userID];you have been unmuted in $serverName[$timeoutdata[serverID]]]
$takeRole[$timeoutdata[userID];$getServerVar[mute;$timeoutdata[serverID]]]`
 
})
//nod end
const files = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
files.forEach( x => {
require(`./events/${x}`)(bot)
});