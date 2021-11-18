const users =[];

//make a array to get user making the connection and disconnection
function userJoin(id, username,room){
    const user= {id, username, room };
    users.push(user);

    return user;
}

//get current user

function getCurrentUser(id){
    return users.find(user =>user.id === id); //check the user id if it the same
}

module.exports = { //then come to serve.js
    userJoin,
    getCurrentUser
};