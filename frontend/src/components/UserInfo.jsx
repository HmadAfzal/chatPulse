import React, { useContext } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate =useNavigate();
  const toast = useToast()
const logout=async()=>{
try {
    const response=await axios('/api/logout',{
      method:'post',
    });
    localStorage.removeItem('user')
    navigate('/auth');
    toast({
      description:'logged out successfully',
      status:'success',
      duration:3000,
      isClosable:true
    });
} catch (error) {
  console.log(error);
  toast({
    description:'error logging out',
    status:'error',
    duration:3000,
    isClosable:true
  });
}
}

  return (

    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<IoIosArrowDown />} bg={'#1e1e1e'} _hover={{
              bg: "black",
            }}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>your Info</MenuItem>
          <MenuItem onClick={logout}>logout</MenuItem>
        </MenuList>
      </Menu>



      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={'#4da39d'} color={'black'}>
          <ModalHeader>Your Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col items-center justify-center pt-6 pb-12 gap-4'>
              <h1 className='text-3xl'>Name: <span>{user?.user?.name}</span></h1>
              <p>Email: <span>{user?.user?.email}</span></p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default UserInfo
