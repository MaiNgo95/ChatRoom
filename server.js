const path = require('path'); //important to access the localhost http://localhost:3000
const http = require('http'); //node.js command 
const express = require('express');
//bring in the socket.io 
const socketio = require('socket.io');

const formatMessage = require('./contain/message.js');
const { userJoin, getCurrentUser} = require('./contain/users.js'); //call out the function

const app  = express();
const server= http.createServer(app);

//initial socket and pass to server.js
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'design')))

const bot = 'chatroom';

//run when user connect
io.on('connection', socket =>{
    //USERNAME AND ROOM emit to server
    socket.on('joinRoom', ({username, room})=>{
        const user = userJoin(socket.id, username,room); //call uses's information from userJoin fucntion
    
        socket.join(user.room); //get the info of user come to sepcific room

        console.log('New WS connected...');

        socket.emit('message', formatMessage(bot,'welcome to chatroom'));

// message when a user log in but not the current user
        socket.broadcast.to(user.room).emit('message', formatMessage(bot,`${user.username} just join the chat`));
});
    //send message to everyone
    //io.emit()
  
    
//listen to main.js after grasped the message
    socket.on('chatMessage', msg=>{
        //console.log(msg); //check by typing something in the box and it should appear on terminal, 
        //rather use console.log, we will actuall use io.emit('message', msg); to send message from server to everyone
        io.emit('message', formatMessage('USER',msg)); //need to reset to get the message to console inspect page

    });

    //disconnection 
    socket.on('disconnect', () => {
        io.emit('message',formatMessage(bot,`a user left the chat`));
    });
});

//set static as the front end with design file, we need to call path

const PORT =  process.env.PORT || 3000; //process first 3000

server.listen(PORT, () => console.log('Server runs on port ${PORT}')); 