import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages && messages.map((message, index) => (
        <div
          key={message._id}
          style={{
            display: "flex",
            justifyContent: message.sender._id === user._id ? "flex-end" : "flex-start", // Align messages based on sender
            marginBottom: "10px", // Adjust margin for better spacing between messages
          }}
        >
          {/* Display sender avatar if it's a new message or last message */}
          {(isSameSender(messages, message, index, user._id) || isLastMessage(messages, index, user._id)) && (
            <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={message.sender.name}
                src={message.sender.pic}
              />
            </Tooltip>
          )}
          <span
            style={{
              background: `${message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
              marginLeft: isSameSenderMargin(messages, message, index, user._id),
              marginTop: isSameUser(messages, message, index) ? 3 : 10,
              alignSelf: message.sender._id === user._id ? "flex-end" : "flex-start",
            }}
          >
            {message.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
