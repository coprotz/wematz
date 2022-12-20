import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import ChatLists from './ChatLists'
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SendMessage from './SendMessage';
import MessageCard from './MessageCard';
import { BsBell, BsCameraVideo, BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import VideoChat from './VideoChat';
import 'webrtc-adapter'
import { doOffer } from '../../hooks/FirebaseModule';
import {doc,  addDoc, collection, deleteDoc } from 'firebase/firestore';
import moment from 'moment';




const ViewChat = () => {
    const { id } = useParams()
    const { user, alert, setAlert } = useAuth()
    const { users, chats, messages, doctors, marriages, lawyers, calls, blocks, donates } = useData()

    const [viewAction, setViewAction] = useState(null)
    const [receivingCall, setReceivingCall] = useState(null)
    

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const dr = doctors?.find(p=>p.userId === user.uid)
    const law = lawyers?.find(p=>p.userId === user.uid)

    

    const chat = chats?.find(c => c.id === id)

    const myid = chat?.members.find(m => m === cuUser?.id || marry?.id || dr?.id || law?.id)

    // console.log('myid', myid)

    const myname = cuUser?.name || marry?.username || dr?.name || law?.name
    const myphoto = cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + `${cuUser?.avatar}` || marry?.photo || dr?.photo || law?.photo
    const memberId = chat?.members.find(m =>m !== myid)
 
    

      const isMarry = marriages?.find(m => m.id === memberId)
      const isDoc = doctors?.find(d => d.id === memberId)
      const isLaw = lawyers?.find(l => l.id === memberId)
      const isUser = users?.find(a =>a.id === memberId)
     

      const Name = () => {
        if(isMarry){
          return (
            <>{isMarry?.username || isMarry?.name }</>
          )
        }else if(isDoc){
          return (
            <>{isDoc?.name}</>
          )
        }else if(isLaw){
          return (
            <>{isLaw?.name}</>
          )
        }else if(isUser){
          return (
            <>{isUser?.name}</>
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
        }else if(isUser) {
          return (
            <img src={isUser?.photo || process.env.PUBLIC_URL + `${cuUser?.avatar}`} />
          )
        }
      }

      // console.log('memberId', memberId)
      // console.log('name', Name())

    const chatMessages = messages?.filter(m =>m.room === id)
    const navigate = useNavigate()

    const handleVideo = () => {
      doOffer()
    }

    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    const [videoChat, setVideoChat] = useState(null)

    const call = calls.find(c => c.to === memberId)


    const handleNavigate = () => {
      if(isMarry){
        navigate(`/nikah/${isMarry?.id}`)
      }else if(isDoc){
        navigate(`/health/doctors/${isDoc?.id}`)
      }else if(isLaw){
        navigate(`/legals/${isLaw?.id}`)
      }else if(isUser){
        navigate(`/profile/${isUser?.id}`)
      }
    }

    const blocksRef = collection(db, 'blocks')

    const myblocks = blocks?.filter(b => b.user_id === myid)
    const isbloc = myblocks && myblocks.find(m => m.target_id === memberId)

    const myblocked = blocks?.filter(b => b.target_id === myid)
    const bloc_me = myblocked.find(m => m.user_id === memberId)

    const blocRef = doc(db, 'blocks', `${isbloc?.id}`)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today

    // console.log('bloc_me', bloc_me)
    // console.log('myblocks', myblocks)
    // console.log('isbloc', isbloc)
    // console.log('myblocked', myblocked)

    const handleBlock = async(e) => {
      e.preventDefault()

      const data = {
        target_id: memberId,
        user_id: myid
      }

      if(!isbloc){
        await addDoc(blocksRef, data)
        // setAlert('Umemblock')
        // setInterval(() => {
        //   setAlert('')
        // },3000)
      }else {
        await deleteDoc(blocRef)
        // setAlert('Umemuachia')
        // setInterval(() => {
        //   setAlert('')
        // },3000)
      }
    }

    console.log('mes', chatMessages)

    const exitChat = chats?.find(c => c.id === id)

    const deletechat = async () => {
       if(exitChat){
        try {
          await deleteDoc(doc(db, 'chats', `${id}`))
          navigate('/messages')
        } catch (error) {
          console.log(error.message)
         }
       }else {       
        navigate('/messages')
       }
      
      
    }

   

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
                        <span onClick={handleNavigate}>Angalia Wasifu Wake</span>
                        <span onClick={handleBlock}>{isbloc? 'Ruhusu Mawasiliano': 'Zuia Mawasiliano'}</span>
                        <span>Mripoti kwa Kudhalilisha</span>
                        <span onClick={deletechat}>Ondoa chat hii</span>
                        
                      </div>}
                    </div> 
                  
                </div>
            </div>
            {!videoChat?
            <div className="chat_room_bottom">
                <div className="chat_messages" ref={scrollRef}>
                    {chatMessages?.map(m => (
                       <MessageCard m={m}/>
                      
                    ))}
                </div>
                {!valid? <span className='block_user'>Huwezi kutuma ujumbe kama sio Mjahidi</span> :
                <SendMessage chat={chat} myid={myid}/>}
            </div> :
            <VideoChat 
              myname={myname} 
              memberId={memberId} 
              call={call}
              receivingCall={receivingCall} 
              setReceivingCall={setReceivingCall} 
              roomId ={id}/>
            }
          </div>
    </div>
    )
 
}

export default ViewChat
