module.exports = {
  name: "stealemoji",
  code: `$djsEval[
const { stealEmoji } = require(process.cwd() + "/handler/functions")

stealEmoji(message, args, {
    embedTitle: '', 
    embedColor: 'RED',
    embedFoot: '',
    failedMsg: 'emoji not found'
})]`
}