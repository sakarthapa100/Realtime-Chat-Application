import { ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Box,
  FormControl,
  Input,
  Text,
  Spinner,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../../context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameloading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chats/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameloading(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setRenameloading(false);
    }
    setGroupChatName("");
  }

  const handleRemove = async (user1) => {
  if(
    selectedChat.groupAdmin._id !== user._id && user1._id !== user._id  ) {
    toast({
      title: "Only Admins can remove someone",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chats/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      fetchMessages()
      setFetchAgain(!fetchAgain);
 
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`/api/users?search=${query}`, config);
      console.log('API Response:', data);
      setLoading(false);
      if (Array.isArray(data.users)) {
        setSearchResult(data.users);
      } else {
        setSearchResult([]);
        console.error('Unexpected data format:', data);
        toast({
          title: 'Error Occurred',
          description: 'Unexpected data format',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left'
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: 'Error Occurred',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
      setLoading(false);
    }
  };

  const handleAddUser = async(user1) => {
   if(selectedChat.users.find((u) => u._id === user1._id)) {
     toast({
       title: "User Already in group!",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
     return;
   }
   if(selectedChat.groupAdmin._id !== user._id) {
     toast({
       title: "Only admins can add someone!",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
     return;
   }
 try {
  setLoading(true);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };
  const { data } = await axios.put(`/api/chats/groupadd`, {
    chatId: selectedChat._id,
    userId: user1._id
  }, config);
  setSelectedChat(data);
  setFetchAgain(!fetchAgain);
  setLoading(false);
  toast({
    title: "User Added",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
 } catch (error) {
  toast({
    title: "Error Occurred!",
    description: error.response.data.message,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  })
 }

  }

  return (
    <div>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}>Open Modal</IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              w={"100%"}
              display="flex"
              flexWrap="wrap"
              p="3"
            >
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult.length > 0 ? (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              ) : (
                <Text>No users found</Text>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateGroupChatModel
