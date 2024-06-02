import React,{useContext, useState, useEffect} from 'react'
import { UserContext } from '../context/userContext'
import ChatComponent from './ChatComponent'
const Left = ({chats}) => {
  const { user, setUser } = useContext(UserContext);


  return (
    <div className='w-[28%] bg-[#68D391] max-h-[87vh] min-h-[87vh] rounded-lg px-4 py-6 '>
        
<div className='flex items-center pb-4'>
    <h1 className='text-3xl font-semibold'>My Chats</h1>
</div>

<div className='px-4 py-2 bg-[#93f4b8] h-[75vh] rounded-lg overflow-y-auto'>
  {
    chats.map((chat)=>{
      return <ChatComponent text={chat?.lastMessage.message} name={chat?.participants[0].name} key={chat?._id}/>
    })
   
  }

</div>
    </div>
  )
}

export default Left