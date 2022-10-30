import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import ChatLists from './ChatLists'
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SendMessage from './SendMessage';
import MessageCard from './MessageCard';


const ViewChat = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const { users, chats, messages, doctors, marriages } = useData()

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)

    const chat = chats?.find(c => c.id === id)
    
    const memberId = 
    // cuUser? chat?.members?.find(m =>m !== cuUser?.id) :
    marry? chat?.members?.find(m =>m !== marry?.id) : null

    const Name = () => {
        if(marriages?.find(a => a.id === memberId)){
          return (
            <>{member?.username }</>
          )
        }else {
          return (
            <>{member?.fname+" "+member?.lname}</>
          )
        }
      }
    
    
    
    const member = 

    // users?.find(a => a.id === memberId) ||           
    marriages?.find(a => a.id === memberId)
    
   
    const chatMessages = messages?.filter(m =>m.room === id)
    const navigate = useNavigate()

    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    console.log('chats', chats)
    console.log('messages', messages)

  return (   
    <div className='main_messages'>
        <div className="view_chatlists">
            <ChatLists/>
        </div>
          
          <div className="chat_room_body">
            <div className="chatroom_head">
            <div className="view_que_back">
                <button onClick={() =>navigate('/messages')} className='btn_back'><HiOutlineArrowLeft/></button>
            </div>
                <div className="chat_rec_photo">
                    <img src={member?.photo} />
                </div>
                <div className="chat_body">
                    <h4>{member?.username}</h4>                    
                </div>
            </div>
            <div className="chat_room_bottom">
                <div className="chat_messages" ref={scrollRef}>
                    {chatMessages?.map(m => (
                       <MessageCard m={m}/>
                      
                    ))}
                </div>
                <SendMessage chat={chat}/>
            </div>
          </div>
    </div>
    )
 
}

export default ViewChat
