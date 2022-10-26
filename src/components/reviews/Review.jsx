import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { db, useAuth } from '../../config'
import { BsXLg } from "react-icons/bs";

const Review = ({setReview, doctor, setMessage}) => {
    const { user } = useAuth()
    const { uid, displayName, photoURL } = user
    const [rate, setRate] = useState('')
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState('')

    const reviewsRef = collection(db, 'reviews')

    const handleReview = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {            
            displayName,
            photoURL,
            rate,
            body,
            doctorId: doctor.userId,           
            patientId: uid
        }

        try {
            await addDoc(reviewsRef, data)
            setLoading(null)
            setReview(null)
            setMessage(' your review has been submitted successful')  
            setTimeout(() => {
                setMessage('')
            }, 3000) 
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="appointment_outer">
    <form className="appointment_inner" onSubmit={handleReview}>
        <h3>Make a review</h3>
        {error && <span className='error'>{error}</span>}
        
        <button onClick={() => setReview(null)} className='btn_close'><BsXLg/></button>
        <div className="group_items">
            <h4>Rate</h4>
            <input 
                type="date" 
                className='input_item'
                name={rate}
                onChange={(e) => setRate(e.target.value)}
                />
           
        </div>
        <div className="group_items">
            <h4>Message</h4>
            <textarea                    
                id="" 
                cols="30" 
                rows="10" 
                placeholder='Message' 
                className='input_item'
                name={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>                    
        </div>
        <button 
            className='btn_submit'
            type='submit'
        >{loading ? 'Sending...' : 'Submit'}</button>
    </form>
</div>
  )
}

export default Review
