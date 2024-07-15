import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import MyChats from '../components/Authentication/miscellaneous/MyChats';
import ChatBox from '../components/Authentication/miscellaneous/ChatBox';
import SideDrawer from '../components/Authentication/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats width={{ base: "100%", md: "35%" }} fetchAgain={fetchAgain}  />}
        {user && <ChatBox width={{ base: "100%", md: "65%" }} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
