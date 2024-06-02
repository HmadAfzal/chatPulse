import React, { useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import Message from './Message';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import ViewProfile from './ViewProfile';
const Right = ({messages, name, id, email, count}) => {

  const {register, handleSubmit, resetField}=useForm()


 const onSubmit=async(data)=>{
try {
  let response=await axios(`api/chat/${id}`,{
    method:'post',
    data:data
  });
  resetField('message');
} catch (error) {
  console.log(error)
}
  }

  return (
    <div className='w-[70%] bg-[#68D391] max-h-[87vh] min-h-[87vh] rounded-lg px-4 py-6'>
      <div className='flex items-center pb-4 px-6 justify-between'>
        <h1 className='text-3xl font-semibold'>{name}</h1>
       <ViewProfile name={name} email={email}/>
      </div>

      <div className='px-4 py-2 bg-[#93f4b8] h-[75vh] rounded-lg '>
        <div className='w-full h-[67vh] overflow-y-auto mb-3 flex justify-end flex-col'>

          {
           messages?.map((message, index)=>{
return <Message message={message} key={index} senderId={message?.sender?._id}/>
           })
          }
        </div>

        <div className='flex items-center justify-between gap-2 pb-2'>
          <Input
            type='text'
            _hover={{ borderColor: 'transparent' }}
            _focus={{ borderColor: 'transparent' }}
            color={'black'}
            bg='#C6F6D5'
            placeholder='enter a message...'
            {...register('message')}
          />
          <Button 
            variant="ghost" 
            bg={'#1e1e1e'}
            _hover={{
              bg: "black",
            }}
            onClick={handleSubmit(onSubmit)}>
            send
          </Button>
        </div>
      </div>  
    </div>
  );
}

export default Right;

// {
//   messages.length !==0 ?  :<div className='flex items-center justify-center max-h-[82vh] min-h-[82vh]'>
//   <h1 className='text-4xl'>
// Click on a chat to start conversation
//   </h1>
// </div>