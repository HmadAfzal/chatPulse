import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Box,
  Input,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import UserInfo from './UserInfo';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Header = ({getData}) => {
  const toast= useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState('left');
  const { register, handleSubmit } = useForm();
  const [searchedUser, setSearchedUser] = useState(null);
const [count,setCount]= useState(1)
  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`/api/user/${data.query}`);
      setSearchedUser(response?.data);
    } catch (error) {
      console.log("Error fetching users:", error);
      toast({
        description:error.response.data.error,
        status:'error',
        duration:3000,
        isClosable:true
      })
    }
  };

 const sendUserData = () => {
  getData(searchedUser,count);
};

  return (
    <div className='bg-[#57A6A1] py-2 px-6 flex items-center justify-between'>
      <>
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            bg={'#1e1e1e'}
            _hover={{
              bg: "black",
            }}>
            Search User
          </Button>
        </Tooltip>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg="#4da39d">
            <DrawerHeader borderBottomWidth='1px' color={'black'}>
              Search User
            </DrawerHeader>
            <DrawerBody>
              <div className='flex items-center justify-between gap-2 pb-12'>
                <Input
                  type='text'
                  _hover={{ borderColor: 'transparent' }}
                  _focus={{ borderColor: 'transparent' }}
                  color={'black'}
                  bg='#C6F6D5'
                  placeholder='search user by name'
                  w={'50'}
                  {...register('query')}
                />
                <Button
                  variant="ghost"
                  bg={'#1e1e1e'}
                  _hover={{
                    bg: "black",
                  }}
                  onClick={handleSubmit(onSubmit)}>
                  Go
                </Button>
              </div>
              {searchedUser &&
                <div
                  className='text-black bg-[#5ED4CC] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#5ccbc4]'
                  onClick={sendUserData}
                >
                  <h3 className='font-semibold text-lg'>{searchedUser?.name}</h3>
                  <p>{searchedUser?.email}</p>
                </div>
              }
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
      <div>
        <h1 className='text-black font-semibold pr-20 text-2xl'>ChatPulse</h1>
      </div>
      <UserInfo />
    </div>
  );
};

export default Header;
