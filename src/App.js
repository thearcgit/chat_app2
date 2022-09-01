import React,{useState} from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import './App.css'


const socket = io.connect(`http://localhost:5050`)

const App = () => {
  const [username,setUsername] = useState('')
  const [room,setRoom] = useState('')
  const [showChat,setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !==''){
      socket.emit('join_room',room)
      setShowChat(true)
    }
  }


  return (

    <React.Fragment>
        
      <div className="App">
        {!showChat ? (
        <div className='joinChatContainer'>
          
          <h1>Chat App</h1>
          <h3>Join a Chat</h3>

          <input type="text" placeholder='Name'
          onChange={(e) => {
            setUsername(e.target.value)
          }} /> <br />

          <input type="text" placeholder='Room ID' 
          onChange={(e) => {
            setRoom(e.target.value)
          }}/> <br />

          <button onClick={joinRoom}>Join A Room</button>
        </div>
        )
        :
        (
        <Chat socket={socket} username={username} room={room}/>
        )}
      </div>

    </React.Fragment>
  )
}

export default App
