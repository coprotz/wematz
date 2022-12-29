import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import Loading from '../loading/Loading';
import './reactions.css'

const Likes = ({p, myId, type}) => {
    // const [like, setLike] = useState(null)
    const { setAlert, user } = useAuth()
    const { likes } = useData()
    const lks = likes.filter(c =>c?.target_id === p?.id)
    const isLike = lks.find(l =>l.user_id === myId)

    const [loading, setLoading] = useState(false)

    const likeRef = collection(db, 'likes')

    const handleLike = async(e) => {
      e.preventDefault()
  
      setLoading(true)
  
      const data = {
        target_id : p.id,
        user_id: myId
      }

      const notificRef = collection(db, 'notifics')

      const newNotific = {
        target_id: p.userId,
        uid: user.uid,
        type,
        action: 'amekupenda',       
        isSeen: false,
        seen: [], 
        createdAt: serverTimestamp()
      }
  
      try {
        if(!isLike){
          await addDoc(likeRef, data)
          await addDoc(notificRef, newNotific)
          // setAlert(`Umempenda ${p.username}`)
          // setLoading(null)
          // setInterval(() => {
          //   setAlert('')
          // },3000)
        }else{
          alert('Ushaipenda hii')
          setLoading(null)
      }
      } catch (error) {
        console.log(error.message)
      }
  
  
    }

  return (
   
        <button 
          className="btn_btn"
          onClick={handleLike}
          >
            {isLike? <FcLike/> : loading? <Loading/> : <FcLikePlaceholder/>}
        </button>
    
  )
}

export default Likes
