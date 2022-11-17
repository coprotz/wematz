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
import VideoChat from './VideoChat';




const ViewChat = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const { users, chats, messages, doctors, marriages, lawyers } = useData()

    const [viewAction, setViewAction] = useState(null)
    const [receivingCall, setReceivingCall] = useState(null)
    

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const doc = doctors?.find(p=>p.userId === user.uid)
    const law = lawyers?.find(p=>p.userId === user.uid)

    const chat = chats?.find(c => c.id === id)

    const myname = cuUser?.fname || marry?.username || doc?.name || law?.name

    // const userChat = chat?.members.find(m =>m !== cuUser?.id)
    // const marryChat = chat?.members.find(m =>m !== marry?.id)
    // const docChat = chat?.members.find(m =>m !== doc?.id)
    // const lawChat = chat?.members.find(m =>m !== law?.id)

    // const myId = 
    //   user.uid || 
    //   doctors?.find(d => d.userid === user.uid).id || 
    //   marriages?.find(m =>m.userId === user.uid) ||
    //   lawyers?.find(l => l.userId === user.uid)

    const memberId = 
      chat?.members.find(m =>m !== cuUser?.id) ||
      chat?.members.find(m =>m !== marry?.id) ||
      chat?.members.find(m =>m !== law?.id) ||
      chat?.members.find(m =>m !== doc?.id)

      const isMarry = marriages?.find(m => m.id === memberId)
      const isDoc = doctors?.find(d => d.id === memberId)
      const isLaw = lawyers?.find(l => l.id === memberId)
      const isUser = users?.find(a =>a.id === memberId) 

      const [ idToCall, setIdToCall ] = useState(null)

      // console.log('myId', myId) 

    // console.log('memberId', memberId)   
    // console.log('userchat',userChat)
    // console.log('marryChat',marryChat)
    // console.log('docChat',docChat)
    // console.log('chat', chat)
    // console.log('member', member)
    
    // console.log('isDoc', isDoc)
    // console.log('isLaw', isLaw)
    // console.log('isMarry', isMarry)
    

      const Name = () => {
        if(isMarry){
          return (
            <>{isMarry?.username }</>
          )
        }else if(isDoc){
          return (
            <>{isDoc?.name}</>
          )
        }else if(isLaw){
          return (
            <>{isLaw?.name}</>
          )
        }else {
          return (
            <>{isUser?.fname+" "+isUser?.lname}</>
          )
        }
      }
  
      const Photo = () => {
        if(isMarry){
          return (
            // <>{member?.photo }</>
            <img src={isMarry?.photo} />
          )
        }else if(isDoc){
          return (
            <img src={isDoc?.photo} />
          )
        }else if(isLaw){
          return (
            <img src={isLaw?.photo} />
          )
        }else {
          return (
            <img src={isUser?.photo} />
          )
        }
      }

      // console.log('memberId', memberId)
      // console.log('name', Name())

    const chatMessages = messages?.filter(m =>m.room === id)
    const navigate = useNavigate()

    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    const [videoChat, setVideoChat] = useState(null)

   

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
                    <button className='btn_btn' onClick={() =>setVideoChat(!videoChat)}><BsCameraVideo /></button> 
                    <div className="member_action" onMouseEnter={() =>setViewAction(true)} onMouseLeave={() =>setViewAction(null)}>
                      <button className='btn_btn' ><BsThreeDotsVertical/></button>
                      {viewAction &&
                      <div className="chat_member_action" >
                        <span onClick={() => navigate(`/nikah/${memberId}`)}>Angalia Wasifu Wake</span>
                        <span>Zuia Mawasiliano</span>
                        <span>Mripoti kwa Kudhalilisha</span>
                        
                      </div>}
                    </div> 
                  
                </div>
            </div>
            {/* {videoChat?
            <div className="chat_room_bottom">
                <div className="chat_messages" ref={scrollRef}>
                    {chatMessages?.map(m => (
                       <MessageCard m={m}/>
                      
                    ))}
                </div>
                <SendMessage chat={chat}/>
            </div> : */}
            <VideoChat 
              myname={myname} 
              memberId={memberId} 
              receivingCall={receivingCall} 
              setReceivingCall={setReceivingCall} 
              roomId ={id}/>
            {/* } */}
          </div>
    </div>
    )
 
}

export default ViewChat
