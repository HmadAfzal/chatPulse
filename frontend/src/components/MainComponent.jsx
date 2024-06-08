import React,{useState, useEffect} from 'react'
import Right from './Right'
import axios from 'axios'
import TextComponent from './TextComponent'

const MainComponent = ({Uname,Uemail,Uid, count, socket, setSocket}) => {
  const [chats, setChats]=useState([]);
  const [reciverId, setReciverId]=useState(null);
  const [messages, setMessages]=useState([]);
  const [name,setName]=useState(null);
  const [email,setEmail]=useState(null);
  const [id,setId]=useState(null)

  useEffect(()=>{
 try {
   const getChats=async()=>{
   const response=await axios('api/chat',{
     method:'get'
   })
   setChats(response?.data);
   }
   getChats()
 } catch (error) {
  console.log(error)
 }
  },[messages]);

const getChatMessages=async(id, name,email)=>{
 setName(name);
 setId(id);
 setEmail(email)
try {
    const response=await axios(`/api/chat/${id}`, {
      method:'get'
    });
    setMessages(response?.data);
} catch (error) {
  console.log(error)
}
}

  return (
<div className='flex w-full justify-between items-center p-6 h-full text-black' >
<div className='w-[28%] bg-[#57A6A1] max-h-[87vh] min-h-[87vh] rounded-lg px-4 py-6 '>
        
        <div className='flex items-center pb-4'>
            <h1 className='text-3xl font-semibold'>My Chats</h1>
        </div>
        
        <div className='px-4 py-2 bg-[#5ed4cc] h-[75vh] rounded-lg overflow-y-auto'>
          {
            chats.map((chat)=>{
            return  <div className='bg-[#489893] rounded-lg p-2 my-2 cursor-pointer hover:bg-[#4da39d]' key={chat?._id} onClick={() => getChatMessages(chat?.participants[0]._id, chat?.participants[0].name, chat?.participants[0].email )}>
              <TextComponent  name={chat?.participants[0].name}/>
              <TextComponent text={chat?.lastMessage.message}/>
              </div>
            })
           
          }
        
        </div>
            </div>
<Right messages={messages} name={name || Uname} id={id || Uid} email={email || Uemail} count={count} socket={socket} setSocket={setSocket}/>
</div>
  )
}

export default MainComponent