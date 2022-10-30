import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'



const ShareImage = ({setImage}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()
    

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const { perc, url } = useStorage(file)

    const types = ['image/png', 'image/jpeg']

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


    const handleAudio = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.fname+" "+cuUser?.lname,
            createdAt: serverTimestamp(),
            pic: url,
            type: 'image',
            photo: cuUser?.photo
        }

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
            setImage(null)
        } catch (error) {
            console.log(error.message)
        }


    }
    // console.log('file', url)
  return (
    <div className="share_video_outer">
        <div className="shared_video"> 
            <h3>Pakia Picha</h3>
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}  
            <div className="user_photo">
             { file?                         
                 <img src={URL.createObjectURL(file)} alt="" /> : 
                 <>
                 
                                               
                 <label htmlFor="photo" className='profile_photo'>
                     <input 
                         type="file" 
                         name='photo' 
                         id="photo" style={{display: 'none'}}
                         onChange={handleSelect}
                     />
                     <span className='attached_photo'><BsCardImage/></span>
                 </label>
                 
              </> 
             }
            </div>
            <div className="profile_photo_edit">                            
                    <button className='btn_cancel' onClick={() =>setImage(null)}>BATILISHA</button>
                </div>
            {file && <>
            <button 
                onClick={handleAudio}
                disabled={!url} 
                className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}
            </button>
            
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
            </div>
            </>}
                
        </div>
    </div> 
  )
}


export default ShareImage
