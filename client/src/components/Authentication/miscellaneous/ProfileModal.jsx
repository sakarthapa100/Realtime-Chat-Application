import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/button';
import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  Text,
  Image,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex
} from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              justify="center"
              align="center"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
              <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
                Email: {user.email}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileModal;
