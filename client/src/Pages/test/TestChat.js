import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

export const TestChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('1234');

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('message', { message: message, room: room, username: username });
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('message', handleNewMessage);
    socket.emit('join', room);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [room]);

  const handleNewMessage = (newMessage) => {
    console.log(newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  return (
    <>
      <h1>Chat</h1>

      <div className='chat-container'>
        {messages.map((data, index) => (
          <div key={index} className='message'>
            <p>{data.username} : {data.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <label htmlFor="username">username</label>

        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="username">message</label>
        <input type="text" name='message' value={message} onChange={(e) => setMessage(e.target.value)} /><br />

        <button type='submit'>send</button>
      </form>
    </>
  );
}
