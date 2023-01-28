module.exports = ({
name: "$alwaysExecute",
code: ` $djsEval[const swearWords = ["shit", "bitch", "fuck" ...];
if( swearWords.some(word => message.content.includes(word)) ) {
 message.reply("Oh no you said a bad word!!!"); 
message.delete();
}] `})test fail