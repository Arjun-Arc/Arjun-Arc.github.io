//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//send a chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  //get the message
  const message = newChatForm.message.value.trim();
  
  //add msg to doc
  chatroom.addChat(message)
    .then(() => {newChatForm.reset()})
    .catch(err => console.log(err));
});


//update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  
  //update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  
  //show update msg
  updateMsg.innerText = `Username updated to ${newName}`;
  setTimeout(() => updateMsg.innerText =``, 3000);
});


//update chat room
rooms.addEventListener('click', e => {
  //clear chat window
  if(e.target.tagName === 'BUTTON'){
    chatui.clear();
  }
  //update room with chats
  chatroom.updateRoom(e.target.getAttribute('id'));
  chatroom.getChats(chat => chatui.render(chat));
});


//check local storage for username
const username = localStorage.username ? localStorage.username : 'anonymous';


//class instances
const chatui = new ChatUI(chatList);
const chatroom = new Chatroom('gaming',username);


//get chats and render
chatroom.getChats(data => chatui.render(data));