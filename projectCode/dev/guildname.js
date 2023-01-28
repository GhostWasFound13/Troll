module.exports = {
name: "setguildname",
code: `
$color[1;RANDOM]
$author[1;Guild name]
$description[1;**Server name has been changed to** \`$message\`]
$setGuildName[$message]
$onlyIf[$ownerid==$authorid;Server owner only]`
}