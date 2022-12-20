import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { GrLike } from 'react-icons/gr'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import './remarks.css'




const Remarks = ({p, setShow, type}) => {
  const { comments, likes } = useData()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const coms = comments?.filter(c => c.docId === p?.id)
  const lks = likes.filter(c =>c?.target_id === p?.id)

  const isLike = lks.find(l =>l.user_id === user.uid)

  // console.log('p', p)
 

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

    setLoading(true)

    const data = {
      target_id : p.id,
      user_id: user.uid
    }

    try {
      if(!isLike){
        await addDoc(likeRef, data)
        await addDoc(notificRef, newNotific)
        setLoading(null)
      }else{
        alert('Ushaipenda hii')
        setLoading(null)
    }
    } catch (error) {
      console.log(error.message)
    }


  }
  

  
  return (
    <div className="mada_remarks">
        <div className="likes">
          <button 
            className='btn_likes'
            onClick={handleLike}
            >{isLike? <AiFillLike/> : <GrLike/>}</button>
          <span>{lks?.length} Penda</span> 
        </div>
              
        <span onClick={() => setShow(p.id)}>{coms?.length} Maoni</span>
    </div>
  )
}

export default Remarks