 
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'



<BrowserRouter>

</BrowserRouter>

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList ] = useState([])


  
  
    const sendMessage = async () =>{
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes(),

            };
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData ])
        };
    };

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
    
        //sendMessage();
      };

    // useEffect( () =>{
    //     socket.on("receive_message",(data) =>{setMessageList((list) => [...list, data]) });
    // }, [socket])




    useEffect(() => {
        const eventListener = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", eventListener);
    
        return () => socket.off("receive_message", eventListener);
      }, [socket]);


    function GuestCard (messageData){

        return  <div class="msg left-msg">
        <div
         class="msg-img"
        // style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"
        ></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">  {messageData.author}</div>
            <div class="msg-info-time">  {messageData.time}</div>
          </div>
  
          <div class="msg-text">
           {messageData.message}
          </div>
        </div>
      </div>
    }

    function LocalCard(messageData){
        return <div class="msg right-msg">
          <div class="msg-img"
          // style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
          ></div>
    
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name"> {messageData.author}</div>
              <div class="msg-info-time">{messageData.time}</div>
            </div>
            <div class="msg-text">


              {messageData.message}
            </div>
          </div>
        </div>
    }

     function checkforuser(messageData){
        if(username == messageData.author)
            return LocalCard(messageData)
        else{
            return GuestCard(messageData)
        }
      //  return null;
     } 
  return (
    <section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> SimpleChat
      </div>
      <div class="msger-header-options">
        <span><i class="fas fa-cog"></i></span>
      </div>
    </header>


        
  <main class="msger-chat">
        {
        messageList.map((messageContent) =>{
            //return checkforuser(messageContent)
            return checkforuser(messageContent)
        })}



  </main>


            
  <form onSubmit={handleSubmit} class="msger-inputarea">
    <input type="text" class="msger-input" placeholder="Enter your message..." onChange={(e) =>{
        setCurrentMessage(e.target.value)}}/>
    <button type='submit' onClick={sendMessage} class="msger-send-btn">Send</button>
  </form>


    </section>
  )
}

export default Chat;