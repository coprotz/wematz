import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const CreateReview = ({title, doc}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const commentRef = collection(db, 'comments')
    
    const handleComment = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            docId: doc.id,
            userId: user.uid,
            name: cuUser?.fname+" "+cuUser?.lname,
            createdAt: serverTimestamp(),
            text: message,           
            photo: cuUser?.photo
        }

        try {
            await addDoc(commentRef, data)
            setLoading(null)
            setMessage('')
           
        } catch (error) {
            console.log(error.message)
        }

        


    }
  return (
    <div className="review_share">
        <div className="share_text">
            <input 
                type="text" 
                placeholder={title}
                className='sel_input'
                style={{width:'100%'}}
                name={message}
                onChange={(e) =>setMessage(e.target.value)}
                />
            
        </div>
        <div className="share_action">       
            <button 
                className='btn_sign'
                disabled={!message}
                onClick={handleComment}
                >{loading? 'Inatuma' :<BsFillShareFill/> }</button>
        </div>
    
</div>
  )
}

export default CreateReview
