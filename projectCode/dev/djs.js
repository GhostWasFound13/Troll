module.exports = {
name: "djs",
  code: `
$title[1;Discord.js Evaluation]
$author[1;$userTag[$authorID];$authorAvatar]
$description[1;
$addField[1;📤 Output:;\`\`\`js
$djsEval[(async () => {
try {
    return $message
} catch (error) {
    return error
}})();yes]\`\`\`;yes]
$addField[1;📥 Input:;\`\`\`js
$message\`\`\`;yes]
]
$color[1;RANDOM]
$onlyForIDs[$botOwnerID;870441674525012018;896846485805744168;]
$suppressErrors
`}