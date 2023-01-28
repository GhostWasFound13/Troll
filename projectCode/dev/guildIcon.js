module.exports = {
name: "setguildicon",
aliases: "setguildavatar",
code: `
$image[1;$servericon]
$color[1;RANDOM]
$description[1;**Server icon has been changed**]
$setGuildIcon[$message]
$onlyIf[$isValidLink[$message]==true;Not a valid image link]
$onlyIf[$ownerid==$authorid;Server owner only]`
}