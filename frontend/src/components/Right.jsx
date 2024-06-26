import React, { useContext, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import Message from './Message';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ViewProfile from './ViewProfile';
import { UserContext } from '../context/userContext';

const Right = ({ messages, name, id, email, count, socket }) => {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/chat/${id}`, data);
      socket?.emit('sendMessage', { ...data, chatRef: id, sender: user._id, receiver: id });
      resetField('message');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-[70%] bg-[#57A6A1] max-h-[87vh] min-h-[87vh] rounded-lg px-4 py-6'>
      {(count || messages.length !== 0) ? (
        <>
          <div className='flex items-center pb-4 px-6 justify-between'>
            <h1 className='text-3xl font-semibold'>{name}</h1>
            <ViewProfile name={name} email={email} />
          </div>
          <div className='px-4 py-2 bg-[#5ED4CC] h-[75vh] rounded-lg'>
            <div className='w-full h-[67vh] overflow-y-auto mb-3 flex justify-end flex-col'>
              {messages.map((message, index) => (
                <Message key={index} message={message} senderId={message?.sender?._id} />
              ))}
            </div>
            <div className='flex items-center justify-between gap-2 pb-2'>
              <Input
                type='text'
                _hover={{ borderColor: 'transparent' }}
                _focus={{ borderColor: 'transparent' }}
                color={'black'}
                bg='#C6F6D5'
                placeholder='Enter a message...'
                {...register('message')}
              />
              <Button 
                variant="ghost" 
                bg={'#1e1e1e'}
                _hover={{ bg: "black" }}
                onClick={handleSubmit(onSubmit)}
              >
                Send
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center max-h-[82vh] min-h-[82vh]'>
          <h1 className='text-4xl'>
            Click on a chat to start conversation
          </h1>
        </div>
      )}
    </div>
  );
}

export default Right;
