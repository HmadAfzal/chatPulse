import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/userContext'
const Message = ({message, senderId}) => {
  const { user, setUser } = useContext(UserContext);
  const [currUser , setCurrUser]=useState(null)
  useEffect(()=>{
   setCurrUser(user?.user);
  },[])

  return (
    <>
    <div className={`flex w-full px-2 my-1 mx-2 ${currUser?._id == senderId && 'justify-end'} `}>
    <div className={`${currUser?._id == senderId ? 'bg-[#000000] text-white'  : 'bg-[#57A6A1] text-black'} font-normal rounded-lg p-4 max-w-80`}>
    {message?.message}
    </div>
  </div>
</>
  )
}

export default Message