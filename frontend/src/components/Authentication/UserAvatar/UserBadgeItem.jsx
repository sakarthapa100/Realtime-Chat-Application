import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      m={1}
      mb={2}
      variant="solid"
      fontSize="12px"
      backgroundColor="purple"
      textColor="white"
      cursor="pointer"
      borderRadius="lg"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
