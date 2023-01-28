module.exports = [{
    name: "test",
    code: `
    hi
    $addSelectMenu[1;xd;economy;1;1;false;Hello:Description:xd:false:<a:Economy1:916928554275602463>]`
    }, 
    
    {
        name: "xd",
        type: "interaction",
        prototype: "selectMenu",
        code: `
    $interactionUpdates[;{newEmbed:{title:economy}{thumbnail:$userAvatar[$clientID]}{description:haha nerd}{color:$getVar[color]}};;;yes]
`
    }] 
    
a