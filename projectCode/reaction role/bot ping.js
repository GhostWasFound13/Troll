module.exports = {
name: "neo", 
type: 'interaction', 
prototype: "selectMenu", 
code: `
$interactionReply[You got the role;;;;yes]
$giveRoles[$authorID;890880931244691457]
$onlyIf[$interactionData[values[0]]==1;]
`
}a