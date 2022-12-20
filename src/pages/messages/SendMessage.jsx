import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { db, useAuth } from '../../hooks/useAuth';
import {  HiOutlinePaperClip, HiOutlineCamera } from "react-icons/hi";
import {  ImCamera, ImImage } from "react-icons/im";
import { MdOutlineSend } from "react-icons/md";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import useData from '../../hooks/useData'
import { useState } from 'react';
import Loading from '../../components/loading/Loading';
import { chats } from '../../data';
import { useParams } from 'react-router-dom';


const SendMessage = ({chat}) => {

  // console.log('chat', chat)
  const { id } = useParams()

  console.log('id', id)


    const { users, marriages, doctors, lawyers, donates, chats } = useData();
    const { user } = useAuth()
    const { uid } = user
    const [message, setMessage] = useState('')
    const [loading, setLoding] = useState(null)

    const messageRef = collection(db, 'messages')
    const [error, setError] = useState('')

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const dr = doctors?.find(p=>p.userId === user.uid)
    const law = lawyers?.find(p=>p.userId === user.uid)

    const myid = chat?.members.find(m => m === cuUser?.id || marry?.id || dr?.id || law?.id)  
 
 
    const myMarry = marriages?.find(m =>m.id === myid) 
    const memberId = chat?.members?.find(m => m !== myid)

  
    const isMarry = marriages?.find(m => m.id === memberId)
    // const isDoc = doctors?.find(d => d.id === memberId)
    // const isLaw = lawyers?.find(l => l.id === memberId)

   
 
 
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoding(true)
    const data = {
            uid,
            name: isMarry? myMarry.name || myMarry.username : cuUser?.name,
            photo: isMarry? myMarry.photo : cuUser?.photo || cuUser?.avatar ,        
            createdAt: serverTimestamp(),
            // avatar: '/images/profile.webp',
            text: message,
            room: chat?.id,
            isRead: false
           
    }


    const notificRef = collection(db, 'notifics')
    const exitChat = chats?.find(c => c.id === id)

    console.log('exi', exitChat)

    const newNotific = {
      target_id: memberId,
      uid: user.uid,
      type: 'message',
      action: 'amekutumia',
      type: 'message',
      type_id: chat?.id,
      isSeen: false,
      createdAt: serverTimestamp()
    }

    if(exitChat){
      try {
        await addDoc(messageRef, data)
        await addDoc(notificRef, newNotific)
        setLoding(null);
        setMessage('');
    } catch (error) {
        console.log(error.message)
    } 
      
    }else if(!exitChat){
      alert('Chat hii imeondolewa')
    }

  
};

  return (
    <div className='form_container' >      
    <form onSubmit={handleSubmit} className='form_inner_wrapper'>       
      <div className="form_outer">
          {!message &&          
          <div className="emoj">
            <button className='btn_form' type='button'><HiOutlinePaperClip/></button>
          </div> 
          }
          <input 
            type="text" 
            value={message} 
            className='send_input' 
            placeholder='Message'
            onChange={(e) =>setMessage(e.target.value)} 
            />  
            {!message &&        
            <button className='btn_form' type='button'><HiOutlineCamera/></button>
            }
      </div> 
      <button 
        className='btn_send_msg'
        disabled={!message}
        >{loading? <Loading/> : <MdOutlineSend/>}
      </button>   
  </form>
  </div>
  )
}

export default SendMessage
