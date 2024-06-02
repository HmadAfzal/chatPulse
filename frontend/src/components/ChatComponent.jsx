import React from 'react'
import TextComponent from './TextComponent'

const ChatComponent = ({text, name}) => {
  return (
<div className='bg-[#41d87b] rounded-lg p-2 my-2 cursor-pointer hover:bg-[#5dda8d]'>
<TextComponent  name={name}/>
<TextComponent text={text}/>
</div>
  )
}

export default ChatComponent