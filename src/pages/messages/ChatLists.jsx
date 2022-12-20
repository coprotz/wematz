import React from 'react'
import { chats } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import ChatCard from './ChatCard'
import NewChat from './NewChat'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react'




const ChatLists = () => {

    const { user } = useAuth()
    const {  chats, marriages, doctors, lawyers, users } = useData()

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const doc = doctors?.find(p=>p.userId === user.uid)

    const userChats = chats?.filter(c =>c.members.includes(`${cuUser?.id}`))
    const marryChats = chats?.filter(c =>c.members.includes(`${marry?.id}`))
    const docChats = chats?.filter(c =>c.members.includes(`${doc?.id}`))

    const allChats = userChats.concat(marryChats)

    const mychats = allChats.concat(docChats)

    const adminId = process.env.REACT_APP_ADMIN_ID

    const [viewAction, setViewAction] = useState(null)

    console.log('mychats',mychats)

  return (
    <div className="messages_lists">
        <div className="message_title">
           <h3>Meseji</h3> 
           <div className="member_action" 
            onMouseEnter={() =>setViewAction(true)} 
            onMouseLeave={() =>setViewAction(null)}
            style={{paddingRight:'15px'}}
            >
              <button className='btn_btn' ><BsThreeDotsVertical/></button>
                {viewAction &&
                  <div className="chat_member_action" >                   
                    <span>Mpangilio</span>
                      <span>Anzisha ujumbe kwa Admin</span>                        
                    </div>}
            </div> 
          
        </div>        
        <div className="mes_chatlists">
          {mychats.length > 0 ? 
          <>
            {mychats?.map(chat => (
                <ChatCard chat={chat} key={chat.id}/>
              ))}
          </> : 'Hauna Chats'}
            
        </div>
      </div>
  )
}

export default ChatLists
