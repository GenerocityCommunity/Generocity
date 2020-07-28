import React, { useState } from "react";
import '../../scss/app.scss';
import Chat from './Chat.jsx'

const Messages = (props) => {
  const [currentRoom, setRoom] = useState('no one');


  const changeRoom = e => setRoom(e.target.value);


/*--- Ultimately, 'listOfRooms' is intended to store a list of references to the
    user-to-user socket.io connections (aka 'rooms')
    that the current user has ever made. These would be stored in and fetched from the DB, 
    along with the messages themselves. For instance, if 
    Michelle reaches out to Dave for the first time,
    we would want to add a reference to that 'connection' in the DB.
    Then, when we map over the 'listOfRooms' array,
    we want to create a button (list item) for each connection 
    that displays only the OTHER users name.-------*/ 
  const listOfRooms = props.msgRooms.map(user => {
    return (
      <button type="button" class="list-group-item list-group-item-action" value={user} onClick={changeRoom} style={{ height: '6vh' }}>{user}</button>
    )
  })

  return (
    <div className="container msgContainer mx-10vh">
      <div className="row" style={{ height: '100vh' }}>
        {/* --- LIST OF USER MESSAGE ROOMS ---- */}
        <div className="col-3 msgList " style={{ marginTop: '30vh', fontSize: '1.2rem', lineHeight: '1.1' }} >

          <div class="list-group-flush">
          <button type="button" class="list-group-item list-group-item-action" value="no one" style={{ height: '6vh' }} >Choose someone:</button>

            {listOfRooms}
            <button type="button" class="list-group-item list-group-item-action" value="Catherine" style={{ height: '6vh' }} onClick={changeRoom}>
              Catherine
            </button>
            <button type="button" class="list-group-item list-group-item-action" value="Serena" onClick={changeRoom} style={{ height: '6vh' }} >Serena</button>
            <button type="button" class="list-group-item list-group-item-action" value="Dave" onClick={changeRoom} style={{ height: '6vh' }} >Dave</button>
            <button type="button" class="list-group-item list-group-item-action" value="John" onClick={changeRoom} style={{ height: '6vh' }}>John</button>
            <button type="button" class="list-group-item list-group-item-action" value="Michelle" onClick={changeRoom} style={{ height: '6vh' }}>Michelle</button>
            <button type="button" class="list-group-item list-group-item-action" value="Erin" onClick={changeRoom} style={{ height: '6vh' }}>Erin</button>
          </div>
        </div>

        {/*---- CHAT AREA ----- */}
        <div className="col-9 chatContainer">

          <Chat currentRoom={currentRoom} userEmail={props.userEmail} />

        </div>

        {/* closing row + container divs */}
      </div>
    </div>
  );
}

export default Messages;