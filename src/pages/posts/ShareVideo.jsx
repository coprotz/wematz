import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'


const ShareVideo = ({setVideo}) => {
    const [message, setMessage] = useState('')
    const [caption, setCaption] = useState('')
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
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            url: message,
            caption,
            type: 'video',
            photo: cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
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
                placeholder='Weka Url ya Video kutoka Youtube' 
                className='sel_input3'
                style={{width: '220px'}}
                name='message'
                value={message} 
                // style={{width:'100%'}}
                onChange={(e) =>setMessage(e.target.value)}
            /> 
             <textarea 
                type="text" 
                placeholder='Weka kichwa cha habari' 
                className='sel_input3'
                name='message'
                value={caption} 
                style={{width: '220px'}}
                // style={{width:'100%'}}
                onChange={(e) =>setCaption(e.target.value)}
            ></textarea>
            <button 
                onClick={handleVideo}
                disabled={!message} 
                style={{width: '220px', margin: '0 auto'}}
                className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}</button>
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setVideo(null)}>ONDOA</button>
            </div>
                 
                
        </div>
    </div> 
  )
}

export default ShareVideo
