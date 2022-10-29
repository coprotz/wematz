import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'


const ShareVideo = ({setVideo}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const postRef = collection(db, 'posts')


    const handleVideo = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.fname+" "+cuUser?.lname,
            createdAt: serverTimestamp(),
            url: message,
            type: 'video',
            photo: cuUser?.photo
        }

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
            setVideo(null)
        } catch (error) {
            console.log(error.message)
        }


    }
  return (
    <div className="share_video_outer">
        <div className="shared_video"> 
            <h3>Weka Url ya Video</h3>      
            <input 
                type="text" 
                placeholder='Weka Url ya Video' 
                className='sel_input'
                name='message'
                value={message} 
                // style={{width:'100%'}}
                onChange={(e) =>setMessage(e.target.value)}
            /> 
            <button 
                onClick={handleVideo}
                disabled={!message} 
                className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}</button>
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setVideo(null)}>ONDOA</button>
            </div>
                 
                
        </div>
    </div> 
  )
}

export default ShareVideo
