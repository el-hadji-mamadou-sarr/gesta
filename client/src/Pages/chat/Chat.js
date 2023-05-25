import React, { useEffect, useState } from 'react';
import NavigationNavBar from '../../Component/navbar/NavigationNavBar';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

function Chat() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    console.log({ message: message, room: room, user_id: user._id });
    if (message) {
      socket.emit('send_message', { message: message, project_id: room, user_id: user._id });
      setMessage('');
    }
  }

  const handleReceivedMessage = (newMessage) => {
    console.log(newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/projects/member", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include"
    })
      .then(async response => await response.json())
      .then(data => {
        setProjects(data);
        setRoom(data[0]._id);
        setMessages([...data[0].messages])
      });

    fetch("http://localhost:5000/api/users/profile", { method: "GET", headers: { 'Content-Type': 'application/json', }, credentials: "include" })
      .then(response => response.json()).then(data => setUser(data))
  }, []);

  useEffect(() => {
    console.log(messages);
    socket.on('receive_message', handleReceivedMessage);
    socket.emit('join', room);
    return () => {
      socket.off('receive_message', handleReceivedMessage);
    };
  }, [room]);

  return (
    <>
      <NavigationNavBar />
      <div className="flex">
        <div className="menu">
          <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav className="-mx-3 space-y-6 ">
                <div className="space-y-3 ">
                  <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Projets</label>
                  {projects.map(
                    (project) => {
                      return <a key={project._id} onClick={() => setRoom(project._id)} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href={"#" + project.name}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                        </svg>
                        <span id={project.id} className='mx-2 text-sm font-medium'>{project.name}</span>
                      </a>
                    }
                  )}
                </div>
              </nav>
            </div>
          </aside>
        </div>
        <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
          <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

            {messages
              .map((message) => {
                console.log(message);
                return message.user_id !== user._id ? <div className="chat-message" key={message._id}>
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message.message}</span></div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                  </div>
                </div> : <div className="chat-message">
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{message.message}</span></div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                  </div>
                </div>
              })}

          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input onChange={(event) => { setMessage(event.target.value) }} value={message} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button onClick={sendMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
