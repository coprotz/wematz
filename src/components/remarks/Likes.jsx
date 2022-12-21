import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import LikeCard from './LikeCard'
import './remarks.css'




const Likes = ({p, type}) => {
  const { likes } = useData()
  const { user } = useAuth()
  const lks = likes.filter(c =>c?.target_id === p?.id)
  const isLike = lks.find(l =>l.user_id === user.uid)
  const likeRef = collection(db, 'likes')
  const notificRef = collection(db, 'notifics')

  const newNotific = {
    target_id: p?.userId || p?.uid,
    uid: user.uid,
    type,
    type_id: p?.id,
    action: 'ameipenda',
    isSeen: false,
    createdAt: serverTimestamp()
  }

  const handleLike = async(e) => {
    e.preventDefault()
    const data = {
      target_id : p.id,
      user_id: user.uid
    }

    try {
      if(!isLike){
        await addDoc(likeRef, data)
        await addDoc(notificRef, newNotific)      
      }else{
        alert('Ushaipenda hii')      
    }
    } catch (error) {
      console.log(error.message)
    }
  }

  
  return (  
        <div className="likes">
          <button 
            className='btn_likes'
            onClick={handleLike}
            >{isLike? <AiFillLike/> : <GrLike/>}</button>
          <span>{lks?.length}</span> 
          <div className="likes_t">
            {lks?.slice(-3)?.filter(u =>u !==undefined)?.map(p => (
              <LikeCard item={p} key={p.id}/>
            ))}
            
          </div>
        </div>   
  )
}


export default Likes
