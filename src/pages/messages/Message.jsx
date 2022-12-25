import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { ChatContext } from '../../hooks/chatsContext'
import { db } from '../../hooks/useAuth'
import ChatMessage from './ChatMessage'
import SendChat from './SendChat'
import SendMessage from './SendMessage'
import { motion } from 'framer-motion';
import useData from '../../hooks/useData'
import { useNavigate } from 'react-router-dom'

const Message = () => {
    const [messages, setMessages] = useState([])
    const { data, active, setActive } = useContext(ChatContext)
    const { users } = useData()

    const user = users?.find(u => u.id === data.isUser.uid)
    const navigate = useNavigate()
    // console.log('user', user)


    


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [data.chatId])
    // console.log('messages', messages)
  return (
    <>
    
    {active ? 
     <motion.div 
     initial={{ x:'100vw'}}
     animate={{x:0}} 
     transition={{ ease: "easeOut", duration: 0.5 }}  
    className='message_container'>
        <div className="message_container_top">
            <div className="message_user_info">
                <div className="chat_head_left">
                    <div className="view_que_back">
                        <button onClick={() =>setActive(null)} className='btn_btn'><HiOutlineArrowLeft/></button>
                    </div>
                    <div className="chat_rec_photo">
                      <img src={user?.photo || process.env.PUBLIC_URL + `${user?.avatar}`} alt="" /> 
                    </div>
                    <div className="member_status">
                        <h4 className='chat_member_name' onClick={() =>navigate(`/members/${user?.id}`)}>{user?.name}</h4> 
                        {user?.isOnline == true ? 
                        <span className="status_ind" style={{backgroundColor: '#0df60f'}}></span> :
                        <span className="status_ind" style={{backgroundColor: '#aaa'}}></span>
                        }                   
                    </div>
                </div>
            </div>
        </div>
        <div className="messages_wrapper">
            {messages.map(m => ( 
               <ChatMessage message={m} key={m.id}/>
              
             ))}
            
        </div>
        <div className="message_send">
            <SendChat/>
        </div>
    </motion.div> 
    :   <div className='no_chats'>
            <h3>Chagua kutoka chatlist kuendeleza chats au anzisha chat mpya</h3>
        </div>}
    
    </>
  )
}

export default Message
