module.exports = {
name: "neo", 
type: 'interaction', 
prototype: "selectMenu", 
code: `
$interactionReply[You have got the role;;;;yes]
$giveRoles[$authorID;890846754344411217]
$onlyIf[$interactionData[values[0]]==0;]
`
}