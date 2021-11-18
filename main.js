//set the button send message when click 
const chatForm = document.getElementById('chat-form');

//get the scroll down 
const chatMessages = document.querySelector('.chat-messages');

//get the username and room number from URL then move to server after io.on make server take name and roon info
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true, //avoid get the symbol 
});

const socket = io(); //connect front to the server, send the message through socket emit 

//receive the meesage as the 'welcome in server.js

socket.on('message', message =>{ //message 
    console.log(message);
    outputMessage(message); 

    //set the scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;

 });


//to avoid the default need a function to prevent that issue (e)
 chatForm.addEventListener('submit',  (e) =>{
     e.preventDefault();

     //get the text in text inbox 
     const msg = e.target.elements.msg.value;
     //get the message to server=> into io.on the connection 
     socket.emit('chatMessage', msg); 

     //delete the message in text box
     e.target.elements.msg.value=" ";
     e.target.elements.msg.focus();  
 });


 //create a fucntion to get message to DOM
 function outputMessage(message){
     const div = document.createElement('div'); //create class DOM maniputation 
     //add the message with the box message
     div.classList.add('message');
     //get the formatin chat.html
     div.innerHTML = ` <p class="meta"> ${message.username} <span>${message.time}</span></p> <p class ="text"> ${message.text} </p>`; //backstick 
    //make the child of this box by calling the class as query
    document.querySelector('.chat-messages').appendChild(div);


 }