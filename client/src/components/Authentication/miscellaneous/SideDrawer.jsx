import { Box } from '@chakra-ui/react'
import { Tooltip  } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import React, { useState } from 'react'
import { Avatar } from '@chakra-ui/avatar'
import { ChatState } from '../../../context/ChatProvider'
import { useHistory } from 'react-router'
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
// import ProfileModal from './ProfileModal'
const SideDrawer = () => {
  const [ search, setSearch] = useState("")
  const [ searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
const[loadinChat, setLoadingChat] = useState(false)
const {user} =  ChatState()
const history = useHistory()

const logoutHandler = () => {
  localStorage.removeItem("userInfo")
  history.push("/")
}

  return (
    <div>
      <Box className='flex justify-between items-center bg-red-500 w-full p-4 ' >
<Tooltip label="Search users to chat" hasArrow placement='bottom'  >
<Button className=' gap-2 ' variant={"ghost"}>
<i class='fas fa-search'></i>
<Text className='text-white' d={{base:"none", md:"flex"}} >Search User</Text>

</Button>
</Tooltip>

<Text>Talk-A-Tive</Text>

<div>
  <Menu>
<MenuButton className='p-2' >
<BellIcon className='text-xl' />
</MenuButton>
  </Menu>
  <Menu>
    <MenuButton className='p-2'as={Button} rightIcon={<ChevronDownIcon />}  >
<Avatar size={"sm"}  cursor='pointer' name={user.name} />
    </MenuButton>
<MenuList className=''>
  <ProfileModal color={'black'} user={user} >
    <MenuItem color={'black'}  >Profile</MenuItem>
  </ProfileModal>
  
  <MenuItem onClick={logoutHandler} color={'black'} >Logout</MenuItem>
  </MenuList>

  </Menu>
</div>
      </Box>

    </div>
  )
}

export default SideDrawer