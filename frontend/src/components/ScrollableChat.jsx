import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  useEffect(() => {
    // Force re-render when messages change
  }, [messages]);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div
            key={message._id}
            style={{
              display: "flex",
              justifyContent: message.sender._id === user._id ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
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
