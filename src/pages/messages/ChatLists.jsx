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
    const {  chats, marriages, doctors, lawyers } = useData()

    // const cuUser = users?.find(u => u.id === user.uid)
    // const marry = marriages?.find(p=>p.userId === user.uid)
    // const doc = doctors?.find(p=>p.userId === user.uid)

    // const userChats = chats?.filter(c =>c.members.find(m =>m.myId === cuUser?.id))
    // const marryChats = chats?.filter(c =>c.members.find(m =>m.myId === marry?.id))
    // const docChats = chats?.filter(c =>c.members.find(m =>m.myId === doc?.id))

    // const mychats = chats?.filter(c =>c.members.find(m =>m.myId === user?.uid))

    const myId = user.uid || doctors?.find(d => d.userId === user.uid)?.id || 
    marriages?.find(m =>m.userId === user.uid)?.id ||
    lawyers?.find(l => l.userId === user.uid)?.id
    
    const mychats = chats && chats.filter(c => c.members.includes(`${myId}`))
    

    // const allchats = userChats.concat(marryChats)
    // const mychats = allchats.concat(docChats)

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
            {mychats?.map(chat => (
              <ChatCard chat={chat}/>
            ))}
        </div>
      </div>
  )
}

export default ChatLists
