import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'


const ShareVideo = ({setVideo}) => {
    const [message, setMessage] = useState('')
    const [caption, setCaption] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const postRef = collection(db, 'posts')

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const { perc, url } = useStorage(file)

    const types = ['video/mp4', 'video/*']

    console.log('file', file)
    console.log('url', url)
    console.log('perc', perc+"%")

    const handleSelect = (e) => {
        let selected = e.target.files[0];
        // setFile(selected)  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an video file (mp4)')
        }
    }


    const handleVideo = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            url,
            caption,
            type: 'video',
            photo: cuUser?.photo || process.env.PUBLIC_URL + cuUser?.avatar
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
        <div className="shared_video"> 
            <h3>Pakia Video</h3>
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}  
            <div className="user_phot">
             { file? 
                <div className="video_wrapper">
                    <video className='shared_video_1' controls>
                        <source src={URL.createObjectURL(file)} type="video/mp4"/>
                    </video> 
                    <small className='video_filename'>{file?.name}</small>
                    <div className="video_progress">
                        <span className="progres_rate" style={{width: `${perc+"%"}`}}></span>
                    </div>
                </div> 
                                      
                  : 
                 <>  
                 <label htmlFor="photo" className='profile_photo'>
                     <input 
                         type="file" 
                         name='photo' 
                         id="photo" style={{display: 'none'}}
                         onChange={handleSelect}
                     />
                     <span className='attached_photo'><BsFillCameraVideoFill/></span>
                 </label>
                 
              </> 
             }
            </div>
            <div className="group_btns">            
                {/* <div className="profile_photo_edit">                            
                        <button className='btn_cancel' onClick={() =>setFile(null)}>BATILISHA</button>
                </div> */}
                {file && <>
                {/* <button 
                    onClick={handleVideo}
                    disabled={!url} 
                    className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}
                </button> */}
                
                <div className="profile_photo_edit">                            
                    <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
                </div>            
                </>}
            </div>
                
        </div>     
            {/* <input 
                type="text" 
                placeholder='Weka Url ya Video kutoka Youtube' 
                className='sel_input3'
                style={{width: '80%'}}
                name='message'
                value={message} 
                // style={{width:'100%'}}
                onChange={(e) =>setMessage(e.target.value)}
            />  */}
             <textarea 
                type="text" 
                placeholder='Weka kichwa cha habari' 
                className='sel_input3'
                name='message'
                value={caption} 
                style={{width: '80%'}}
                // style={{width:'100%'}}
                onChange={(e) =>setCaption(e.target.value)}
            ></textarea>
            <button 
                onClick={handleVideo}
                disabled={!url} 
                style={{width: '95%', margin: '0 auto'}}
                className='btn_sign'>{loading? 'Inatuma' : 'TUMA'}</button>
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setVideo(null)}>ONDOA</button>
            </div>
                 
                
        </div>
    </div> 
  )
}

export default ShareVideo
