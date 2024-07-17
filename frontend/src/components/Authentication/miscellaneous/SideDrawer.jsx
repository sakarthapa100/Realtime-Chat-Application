import React, { useState, useEffect } from 'react';
import { Box, useDisclosure, useToast, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Drawer, DrawerBody, Input, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Spinner, Tooltip } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../../config/ChatLogics';
import { ChatState } from '../../../context/ChatProvider';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
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
      const { data } = await axios.get(`/api/users?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <div>
      <Box className='flex justify-between items-center bg-red-500 w-full p-4'>
        <Tooltip label='Search users to chat' hasArrow placement='bottom'>
          <Button onClick={onOpen} className='gap-2' variant={'ghost'}>
            <i className='fas fa-search'></i>
            <Text className='text-white' d={{ base: 'none', md: 'flex' }}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text>Chat-Gram</Text>

        <div>
          <Menu>
            <MenuButton className='p-1'>
              <NotificationBadge count={notification.length} effect={Effect.SCALE} />
              <BellIcon className='text-xl' m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {notification && notification.length === 0 && 'No New Messages'}
              {notification && notification.length > 0 &&
                notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              className='p-2'
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar size={'sm'} cursor='pointer' name={user.name} />
            </MenuButton>
            <MenuList>
              <ProfileModal color={'black'} user={user}>
                <MenuItem color={'black'}>Profile</MenuItem>
              </ProfileModal>

              <MenuItem onClick={logoutHandler} color={'black'}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={'1px'}>Search Users</DrawerHeader>
          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml='auto' display='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
