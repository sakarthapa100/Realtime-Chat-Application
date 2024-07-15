import React from 'react';
import { ChatState } from '../../../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from '../../SingleChat';

const ChatBox = ({ width , fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={width}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}   />
      {/* Chat content goes here */}
    </Box>
  );
};

export default ChatBox;
