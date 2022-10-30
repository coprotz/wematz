import React from 'react'
import { chats } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import ChatCard from './ChatCard'



const ChatLists = () => {

    const { user } = useAuth()
    const { users, marriages, chats, messages } = useData()

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)

    const userChats = chats?.filter(c =>c.members.includes(`${cuUser?.id}`))
    const marryChats = chats?.filter(c =>c.members.includes(`${marry?.id}`))

    const mychats = userChats.concat(marryChats)

  return (
    <div className="messages_lists">
        <div className="message_title">
           <h3>Meseji</h3> 
        </div>        
        <div className="mes_chatlists">
            {mychats?.map(chat => (
              <ChatCard chat={chat}/>
            ))}
        </div>
      </div>
  )
}

export default ChatLists
