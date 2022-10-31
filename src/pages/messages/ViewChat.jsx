import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import ChatLists from './ChatLists'
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SendMessage from './SendMessage';
import MessageCard from './MessageCard';
import { BsBell, BsCameraVideo, BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';




const ViewChat = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const { users, chats, messages, doctors, marriages } = useData()

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const [viewAction, setViewAction] = useState(null)

    const chat = chats?.find(c => c.id === id)
    
    // const memberId = chat?.members?.find(m => m?.memberId)?.memberId
    // cuUser? chat?.members?.find(m =>m !== cuUser?.id) :
    // marry? chat?.members?.find(m =>m !== marry?.id) : null

    const memberId = chat?.members?.find(m => m !== user.uid)

    const member = doctors?.find(a => a.userId === memberId) || marriages?.find(a => a.userId === memberId)

               
    

    const Name = () => {
      if(marriages?.find(a => a.userId === memberId) && marriages?.find(a => a.id === chat?.chatId)){
        return (
          <>{member?.username }</>
        )
      }else if(doctors?.find(a => a.userId === memberId) && doctors?.find(a => a.id === chat?.chatId)){
        return (
          <>{member?.name}</>
        )
      }else {
        return (
          <>{member?.fname+" "+member?.lname}</>
        )
      }
    }

      const Photo = () => {
        if(marriages?.find(a => a.userId === memberId) && marriages?.find(a => a.id === chat?.chatId)){
          return (
            // <>{member?.photo }</>
            <img src={member?.photo} />
          )
        }else if(doctors?.find(a => a.userId === memberId) && doctors?.find(a => a.id === chat?.chatId)){
          return (
            <img src={member?.photo} />
          )
        }else {
          return (
            null
          )
        }
      }

      console.log('memberId', memberId)
    
    
    
    
    
   
    const chatMessages = messages?.filter(m =>m.room === id)
    const navigate = useNavigate()

    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    console.log('chats', chats)
    console.log('member', member)

  return (   
    <div className='main_messages'>
        <div className="view_chatlists">
            <ChatLists/>
        </div>
          
          <div className="chat_room_body">
            <div className="chatroom_head">
                <div className="chat_head_left">
                    <div className="view_que_back">
                        <button onClick={() =>navigate('/messages')} className='btn_btn'><HiOutlineArrowLeft/></button>
                    </div>
                    <div className="chat_rec_photo">
                      {Photo()} 
                    </div>
                    <div className="chat_body">
                        <h4 className='chat_member_name'>{Name()}</h4>                    
                    </div>
                </div>
                <div className="chat_head_right">
                    <button className='btn_btn'><BsCameraVideo /></button> 
                    <div className="member_action" onMouseEnter={() =>setViewAction(true)} onMouseLeave={() =>setViewAction(null)}>
                      <button className='btn_btn' ><BsThreeDotsVertical/></button>
                      {viewAction &&
                      <div className="chat_member_action" >
                        <span onClick={() => navigate(`/nikah/${member?.id}`)}>Angalia Wasifu Wake</span>
                        <span>Zuia Mawasiliano</span>
                        <span>Mripoti kwa Kudhalilisha</span>
                        
                      </div>}
                    </div> 
                  
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
