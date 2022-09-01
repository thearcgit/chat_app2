import React,{useState,useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
// import './Chat.css'


const Chat = (props) => {
    const [message,setMessage] = useState('')
    const [messageList,setMessageList] = useState([])

    const socket = props.socket

    const sendMessage = async () => {
      
        if(message !=='') {
            const messageData = {
                room:props.room,
                user:props.username,
                message:message,
                time:new Date(Date.now()).getHours() +':'+ new Date(Date.now()).getMinutes()

                
            }
            await socket.emit('send_message',messageData)
            setMessageList((list) => {console.log('List is:',list);return[...list,messageData]})
            setMessage('')
        }
      
    }
    useEffect(() => {
      socket.on('receive_message',(data) => {
        setMessageList((list) => {console.log('List is:',list);return[...list,data]})
        console.log('Data is:',data)
        
      })
    },[socket])


  return (
    <React.Fragment>
        <div className="chat-window">
          <div className="chat-header">
              <p>Live Chat</p>
          </div>

          <div className="chat-body">
            <ScrollToBottom className='message-container'>
              {messageList.map((messageContent,i) => {
                console.log('message content is ',messageContent)
                return (
                  <div className="message" id={props.username === messageContent.user ?'you' : 'other'} >
                    <div>
                      <div className="message-content">
                        <p key={i}>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                      <p key={i} id='time'>{messageContent.time}</p>
                      <p key={i} id='author'>{messageContent.user}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ScrollToBottom>
          </div>

          <div className="chat-footer">
              <input type="text" placeholder='type msg' 
              value={message}
              onChange={(e) => {
                  setMessage(e.target.value)
                }}
                onKeyPress={(e) => {e.key === 'Enter' && sendMessage()}} />

              <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>

    </React.Fragment>
  )
}

export default Chat