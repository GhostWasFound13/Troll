const Aoijs = require("aoi.js")
 const { Panel } = require("@akarui/aoi.panel");

const bot = new Aoijs.Bot({
token: process.env.tommy, 
prefix: "dead", //<- Change whatever with your prefix//
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

const voice = new Aoijs.Voice(bot, {
  cache: {
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/", //Only for "Disk"
    enabled: true
  },
  soundcloud: {
    clientId: "iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX",
    likeTrackLimit: 200
  },
  playerOptions: {
 trackInfoInterval: 150
},
}); 

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


voice.onTrackStart()

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
bot.variables(require(`./variables/variables.js`))


bot.onJoin()
bot.onMessage()
bot.onInteractionCreate()
bot.onMessageDelete();


const loader = new Aoijs.LoadCommands(bot);
(async () => {
await loader.load(bot.cmd, "./commands/")
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
	commands: "commands"
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
const [guildID = d.guild.id,user = d.author.id] = data.inside.splits
data.result = d.client.guilds.cache.get(guildID).members.cache.get(user).avatarURL({ size: 2048 })
return {
code: d.util.setCode(data)
}
}
}) 

//usage: `$memberAvatar[guild id(optional);user id(optional)]
