module.exports = [{
name: "c-queue", 
code: `Created \`/queue\` command.
$createApplicationCommand[global;queue;Lets you see the songs you played in the queu;true;slash;song:please insert a number between 1 and the number of the queue:true:3]`
},{

name:"queue",
type:"interaction",
$if: "v4",
prototype: 'slash', 
code:`
$interactionreply[;
{newEmbed:
{title:Music queue}
 {author:Queue:$useravatar[$clientID]}
 {thumbnail:$songinfo[thumbnail]} 
{description:$queue[$replaceText[$replaceText[$checkCondition[$isnumber[$message[1]]==true];true;$replaceText[$replaceText[$checkCondition[$queue[$message[1];10;{title}]!=];false;1];true;$message[1]]];false;1];11;{title}]

}
{footer:Page $replaceText[$replaceText[$checkCondition[$isnumber[$message[1]]==true];true;$replaceText[$replaceText[$checkCondition[$queue[$message[1];10;{title}{url}
]!=];false;1];true;$message[1]]];false;1] / $replaceText[$replaceText[$checkCondition[$getTextSplitLength==1];true;$truncate[$divide[$queueLength;10]]];false;$replaceText[$replaceText[$checkCondition[$splitText[2]==0];true;$truncate[$divide[$queueLength;10]]];false;$sum[$truncate[$divide[$queueLength;10]];1]]]:$authoravatar}



}

}

        

 $textSplit[$divide[$queueLength;10];.]`
}]