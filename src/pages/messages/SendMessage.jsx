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

const SendMessage = ({chat}) => {

  const { users, marriages, doctors, lawyers } = useData();
  const { user } = useAuth()
  const { uid } = user
  const [message, setMessage] = useState('')
  const [loading, setLoding] = useState(null)
  const [attached, setAttached] = useState(null)

  const doctor = doctors?.find(a =>a.userId === user.uid)
  const lawyer = lawyers?.find(l =>l.userId === user.uid)

  const messageRef = collection(db, 'messages')
  const [error, setError] = useState('')

  const myId = 
    user.uid || 
    doctors?.find(d => d.userId === user.uid)?.id || 
    marriages?.find(m =>m.userId === user.uid)?.id ||
    lawyers?.find(l => l.userId === user.uid)?.id


  const myDoc = doctors?.find(d => d.userId === user.uid)
  const myMarry = marriages?.find(m =>m.userId === user.uid)
  const myLaw = lawyers?.find(m =>m.userId === user.uid)


  console.log('chat', chat)

  const memberId = chat?.members?.find(m => m !== myId)

  // const doc = doctors?.find(d => d.id === memberId)
  // const law = lawyers?.find(d => d.id === memberId)
  // const marry = marriages?.find(d => d.id === memberId)

  // const isDoc = doc?.id === memberId
  // const isLaw = law?.id === memberId
  // const isMarry = marry?.id === memberId

    // const isUser = users?.find(u => u.id === memberId)
    const isMarry = marriages?.find(m => m.id === memberId)
    const isDoc = doctors?.find(d => d.id === memberId)
    const isLaw = lawyers?.find(l => l.id === memberId)

  console.log('isDoc', isDoc)
  console.log('isLaw', isLaw)

  const cuUser = users?.find(u => u.id === user.uid)
  // const marry = marriages?.find(p=>p.userId === user.uid)

  // const Name = () => {
  //   if(isMarry){
  //     return (
  //       <>{myMarry?.name}</>
  //     )
  //   }else if(isLaw){
  //     return (
  //       <>{cuUser?.fname+" "+cuUser?.fname}</>
  //     )
  //   }else{
  //     <>{marry.username}</>
  //   }
  // }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoding(true)
    const data = {
            uid,
            name: isDoc? cuUser?.fname+" "+cuUser?.fname : isLaw? cuUser?.fname+" "+cuUser?.fname: isMarry? myMarry.username : myDoc?.name || myLaw?.name,
            photo: isDoc? cuUser?.photo : isLaw? cuUser?.photo :isMarry? myMarry.photo : myDoc?.photo || myLaw?.photo,       
            createdAt: serverTimestamp(),
            text: message,
            room: chat.id,
            isRead: false
           
    }

    try {
        await addDoc(messageRef, data)
        setLoding(null);
        setMessage('');
        
    } catch (error) {
        console.log(error.message)
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
