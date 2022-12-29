import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import Loading from '../loading/Loading';

const CreateReview = ({title, doc, setShow, type}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const commentRef = collection(db, 'comments')
    const likeRef = collection(db, 'likes')
    const notificRef = collection(db, 'notifics')

    // console.log('doc', doc)
  
    const newNotific = {
      target_id: doc?.userId || doc?.uid,
      uid: user.uid,
      type,
      action: 'amerespond'+" "+`${type}`+" "+'yako',
      isSeen: false,
      seen: [], 
      type_id: doc?.type === 'maoni' ? doc?.docId : doc?.id,
      createdAt: serverTimestamp()
    }
    // console.log('doc', doc)
    
    const handleComment = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            docId: doc.id,
            userId: user.uid,
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            text: message, 
            cat: type,                     
            photo: cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        try {
            await addDoc(commentRef, data)
            await addDoc(notificRef, newNotific)
            setLoading(null)
            setShow(null)
            setMessage('')
            
            
           
        } catch (error) {
            console.log(error.message)
        }

        


    }
  return (
    <div className="review_share">
        <div className="share_text">
            <div className="comment_info">
                <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} alt="" />
            </div>
            <textarea 
                type= 'textarea'  
                placeholder={title} 
                className='comment_input'
                name='message'                        
                value={message} 
                 style={{width:'100%'}}
                onChange={(e) =>setMessage(e.target.value)}>
            </textarea>            
        </div>
        {message &&
        <div className="share_action_btns">    
             <button 
                className='btn_2'                
                onClick={() =>setShow(null)}
            >Batilisha</button>
            <button 
                className='btn_1'
                disabled={!message}
                onClick={handleComment}
            >{loading? <Loading/> :'Tuma' }</button>
        </div>}
    
    </div>
  )
}

export default CreateReview
