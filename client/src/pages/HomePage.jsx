import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent gap={4} >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        w="100%"
        bg="white"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" textAlign="center">
          Break the Distance
        </Text>
      </Box>
      <Box bg='white' w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"} >
<Tabs variant='soft-rounded' >
  <TabList mb={"1em"} >
    <Tab w={"50%"}>Signup</Tab>
    <Tab w={"50%"} > Login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    
    <Signup />
    </TabPanel>
    <TabPanel>
    <Login />
    </TabPanel>
  </TabPanels>
</Tabs>


      </Box>
    </Container>
  );
};

export default HomePage;
