
import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {

  const[email, setEmail] = useState()
  const[password, setPassword] = useState()
  const [ show, setShow] = useState(false)
const [loading, setLoading] = useState(false)
  const toast = useToast();
  const history = useHistory();

  const handleclick = ()=> {
    setShow(!show)
  }
  const submitHandler =async () => {
    setLoading(true);
    if ( !email || !password ) {
      toast({
        title: 'Please fill all the fields.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
  }
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', {  email, password }, config);
    toast({
      title: 'Login Successful',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
    history.push('/chats');
  } catch (error) {
    toast({
      title: 'Error Occurred',
      description: error.response.data.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom',
    });
    setLoading(false);
  }
};

  return (
    <VStack>
   <FormControl id='email'  isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter your email'  value={email} onChange={(e) =>setEmail(e.target.value) } />
      </FormControl>


      <FormControl   isRequired>
        <FormLabel>Password</FormLabel>
<InputGroup>
   <Input type={show ? "text" :  'password'} value={password} placeholder='Enter your password'  onChange={(e) =>setPassword(e.target.value) } />
   
   <InputRightElement>
<Button onClick={handleclick} >
  {show ? "Hide" : "Show"}
</Button>

</InputRightElement>
</InputGroup>
      </FormControl>

      <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }}
onClick={submitHandler}
isLoading={loading}
> 
  Login 
</Button>

<Button variant={"solid"} colorScheme='red' width={"100%"} style={{ marginTop: 15 }}
onClick={()=> {
  setEmail("guest@example.com")
  setPassword("123456")
}}

> 
  Get Guest User Credentials 
</Button>

    </VStack>
  )

}

export default Login