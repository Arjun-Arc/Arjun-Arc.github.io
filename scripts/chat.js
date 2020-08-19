class Chatroom{
  constructor(room,username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }

  //add chat documents
  async addChat(message){
    //format chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    //save chat document
    const response = await this.chats.add(chat);
    return response;
  }

  //real time chat updates
  getChats(callback){
    this.unsub = this.chats
      .where('room','==',this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            callback(change.doc.data());
          } 
        });
      });
  }

  //update username
  updateName(username){
    this.username = username;
    localStorage.setItem('username',username);
  }

  //update chatroom
  updateRoom(room){
    this.room = room;
    if(this.unsub){
      this.unsub();
    }
  }
}



// const chatroom = new Chatroom ('gaming','steve');

// chatroom.getChats((data) => {
//   console.log(data);
// });


// setTimeout(() => {
//   chatroom.updateRoom('general');
//   chatroom.updateName('Dwight');
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat('BattleStar Gallactica!');
// }, 3000);