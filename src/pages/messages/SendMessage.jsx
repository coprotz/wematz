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

  const messageRef = collection(db, 'messages')
  const [error, setError] = useState('')

  console.log('chat', chat)

  const memberId = chat?.members?.find(m => m !== user.uid)

  const doc = doctors?.find(d => d.userId === memberId)
  const law = lawyers?.find(d => d.userId === memberId)

  const isDoc = doc?.userId === memberId
  const isLaw = law?.userId === memberId

  console.log('isDoc', isDoc)
  console.log('isLaw', isLaw)

  const cuUser = users?.find(u => u.id === user.uid)
  const marry = marriages?.find(p=>p.userId === user.uid)

  const Name = () => {
    if(isDoc){
      return (
        <>{cuUser?.fname+" "+cuUser?.fname}</>
      )
    }else if(isLaw){
      return (
        <>{cuUser?.fname+" "+cuUser?.fname}</>
      )
    }else{
      <>{marry.username}</>
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoding(true)
    const data = {
            uid,
            name: isDoc? cuUser?.fname+" "+cuUser?.fname : isLaw? cuUser?.fname+" "+cuUser?.fname: marry.username, 
            photo: isDoc? cuUser?.photo : isLaw? cuUser?.photo : marry.photo,       
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
