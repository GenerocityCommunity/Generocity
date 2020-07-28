import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import '../../scss/app.scss';


let socket;
/*------------ currentRoom needs to be updated to a string of both users names-------------*/ 
/*------------ then in theory, each user would have a DB storage of all rooms -------------*/ 

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:3000'
  const name = props.userEmail; // should change this to userFirstName
  const room = props.currentRoom; // default rooom passed down from App, all others from Messages



  useEffect(() => { 
    // const name = props.userEmail;
    socket = io(ENDPOINT)
    console.log('newROOM joined');
    // upon connection to socket.io, emit 'join' event to server
    socket.emit('join', { name, room }, ({error}) => { 
      console.log('error')
    })
 // on disconnectioning from socket or leaving the current room
    return () => {
      socket.emit('disconnect') // emit 'disconnect' event
      socket.off(); // turn socket off
      // clear messages in state - had to do this to force the app to clear the messages displays
      setMessages([]); 
    }
  }, [ENDPOINT, props.currentRoom]);

  useEffect(() => {
    // listen for 'message' event from server
    socket.on('message', (message) => {
      console.log('message received on client', message)
      // update messages state
      setMessages([...messages, message]) // *message is an object with 'user' and 'text' props
    }) 
  }, [messages])

  const sendMessage = event => { // onClick event of 'Send Message' button
    event.preventDefault();
    console.log('message in sendmsg', message)
    socket.emit('sendMessage', message, () => setMessage(''))
  }

  // track text input in state
  const handleChange = e => setMessage(e.target.value);
  

  return (
    <div className="container chatContainer">
  <div className="row chatRow" style={{height: '45vh', width: '100%'}}></div>
        {messages.map((message, index) => { 
          console.log('message.user:', message.user)
          console.log('name', name)

          //if you are the sender, render your message
          if (message.user === name) {
            // console.log('message.user', message.name)
            return (
              <div className="row" key={index} style={{width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0px'}}>
                <p>
                  {message.text}
                </p>
              </div>
            )
          }
          // if someone else is the sender, render their message
          return (
            <div className="row" key={index} style={{width: '100%', display: 'flex', justifyContent: 'flex-start', backgroundColor: 'whitesmoke', margin: '0px'}}>
              <p>
                {message.text}
               </p> 
          </div> 
             )
        })} 

      <form>
    <div class="form-group">
     <label for="exampleFormControlTextarea1"></label>
     <textarea  
     class="form-control" 
     id="exampleFormControlTextarea1" 
     rows="3"
     value={message} 
         onChange={handleChange} 
     ></textarea> 
   </div>
   <button type="submit" class="btn btn-primary w-100 appButton loginAndSignUpBtn" onClick={sendMessage}>Send Message</button>
 </form>

    </div>
  );
};

 
export default Chat;