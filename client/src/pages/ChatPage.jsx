import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import MyChats from '../components/Authentication/miscellaneous/MyChats';
import ChatBox from '../components/Authentication/miscellaneous/ChatBox';
import SideDrawer from '../components/Authentication/miscellaneous/SideDrawer';
import {Box } from '@chakra-ui/react'

const ChatPage = () => {
 const {user} =  ChatState()

  return (
    <div className='w-full text-white'>
{
  user && <SideDrawer />
}
<Box className='flex justify-between w-full p-4 ' >
  { user && <MyChats /> }
  { user && <ChatBox /> }
</Box>
    </div>
  )
};

export default ChatPage;
