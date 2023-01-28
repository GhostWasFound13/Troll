module.exports = {
  name: "economy", 
  type: "interaction",
  prototype: "button", 
  code: `$interactionReply[;{newEmbed:{title:economy command list}{thumbnail:$userAvatar[$clientID]}{description:test }{color:$getVar[color]}};;;yes]
$onlyif[$interactionData[values[0]]==4;]`
}