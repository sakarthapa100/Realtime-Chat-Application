import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [ chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div className='text-white'>
   {
    chats.map((chat)=> 
    <div key={chat._id}> 
      {chat.chatName}
    </div>
    )
   }
   
  </div>;
};

export default ChatPage;
