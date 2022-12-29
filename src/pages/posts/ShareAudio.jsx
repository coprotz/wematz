import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { BsSoundwave } from 'react-icons/bs'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'



const ShareAudio = ({setAudio}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users, followers } = useData()
    const [caption, setCaption] = useState('')
    

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const { perc, url } = useStorage(file)

    const types = ['audio/mpeg']

    const handleSelect = (e) => {
        let selected = e.target.files[0];
        // setFile(selected)  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (mpeg or mp3)')
        }
    }

  

    const cuUser = users?.find(u => u.id === user?.uid)

    const postRef = collection(db, 'posts')
    const notificRef = collection(db, 'notifics')

    const myfollowings = followers?.filter(f => f.following_id === user.uid)
    const res = myfollowings.map(({follower_id}) => follower_id)


    const handleAudio = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.fname+" "+cuUser?.lname,
            createdAt: serverTimestamp(),
            clip: url,
            caption,
            type: 'audio',
            photo: cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        const newNotific = {
            target_ids: res,
            uid: user.uid,
            type:'post',
            action: 'amepost ujumbe wa sauti, pitia na comment',
            isSeen: false,
            seen: [], 
            // type_id: newQue?.id,
            createdAt: serverTimestamp()
          }

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
            setAudio(null)
            await addDoc(notificRef, newNotific)
        } catch (error) {
            console.log(error.message)
        }


    }
    console.log('file', url)
  return (
    <div className="share_video_outer">
        <div className="shared_video"> 
            <h3>Pakua Sound Clip (mp3)</h3>
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}       
            { file?                         
            <span>{file?.name}</span> :                                
            <label htmlFor="photo" className='profile_photo' style={{textAlign: 'center'}}>
                <input 
                type="file" 
                name='photo' 
                id="photo" style={{display: 'none'}}
                onChange={handleSelect}
                />
                <span className='attached_photo'><BsSoundwave/> </span>
            </label>
            
            }
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setAudio(null)}>BATILISHA</button>
            </div>
            {file && <>
            
           
            <button 
                onClick={handleAudio}
                disabled={!file || !caption} 
                className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}
            </button>
            <textarea 
                type="text" 
                placeholder='Weka kichwa cha habari' 
                className='sel_input3'
                name='message'
                value={caption} 
                // style={{width:'100%'}}
                onChange={(e) =>setCaption(e.target.value)}
            ></textarea>
            
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
            </div>
            </>}
                
        </div>
    </div> 
  )
}

export default ShareAudio
