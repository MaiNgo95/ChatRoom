//import moment to get time
const moment = require('moment');


//create function : the text box has name and date time when send a message
function formatMessage(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;