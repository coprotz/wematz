import React from 'react'
import { chats } from '../../data'
import ChatCard from './ChatCard'



const ChatLists = () => {
    const myId = 'gdggdgdgd'
    const mychats = chats?.filter(c =>c.members.find(m => m.includes(`${myId}`)))
  return (
    <div className="messages_lists">
        <div className="message_title">
           <h3>Meseji</h3> 
        </div>        
        <div className="mes_chatlists">
            {mychats?.map(chat => (
              <ChatCard chat={chat} myId={myId}/>
            ))}
        </div>
      </div>
  )
}

export default ChatLists
