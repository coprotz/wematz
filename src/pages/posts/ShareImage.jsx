import { addDoc, arrayUnion, collection, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { ChatContext } from '../../hooks/chatsContext'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'
import { v4 as uuid } from 'uuid'
import Loading from '../../components/loading/Loading'



const ShareImage = ({setImage, type}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users, notifics, followers } = useData()
    const { data } = useContext(ChatContext)  
   
    

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
    const notificRef = collection(db, 'notifics')

    const myfollowings = followers?.filter(f => f.following_id === user.uid)
    const res = myfollowings.map(({follower_id}) => follower_id)


    const handleAudio = async(e) => {
        e.preventDefault()

        setLoading(true)

        if(type === 'image'){

       

        const data = {
            userId: user.uid,
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            pic: url,
            type,
            photo: cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        const newNotific = {
            target_ids: res,
            uid: user.uid,
            type:'post',
            action: 'amepost ujumbe wa picha, pitia na comment',
            isSeen: false,
            // type_id: newQue?.id,
            createdAt: serverTimestamp()
          }

        

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
            setImage(null)
            await addDoc(notificRef, newNotific)
        } catch (error) {
            console.log(error.message)
        }
     }else if(type='message'){

        const getNot = notifics?.filter(n => n.uid === user.uid)?.filter(v => v.target_id === data?.isUser.uid)?.find(f => f.type=== 'message')
        const newNotific = {
                target_id: data.isUser.uid,
                uid: user.uid,
                type: 'message',
                action: url, 
                cat: 'image',     
                type_id: data.chatId,
                seen: [], 
                isSeen: false,
                createdAt: serverTimestamp()
              }
    
              const notificRef = collection(db, 'notifics')

        try {
            

            await updateDoc(doc(db, 'chats', `${data.chatId}`), {
                messages: arrayUnion({
                    id: uuid(),
                    message: url,
                    type,
                    uid: user.uid,
                    data: Timestamp.now()
                })
               
            })
            setImage(null)

            await updateDoc(doc(db, 'userChats', `${user.uid}`), {
                [data.chatId + ".lastMessage"]: {
                    message: url,
                    type: 'image'
                },
                [data.chatId + ".createdAt"]: serverTimestamp(),
            })
            await updateDoc(doc(db, 'userChats', `${data.isUser.uid}`), {
                [data.chatId + ".lastMessage"]: {
                    message: url,
                    type: 'image',
                    isRead: false
                },
                [data.chatId + ".createdAt"]: serverTimestamp(),
            })

            if(getNot){
                await updateDoc(doc(db, 'notifics', getNot.id), {
                  isSeen: false, 
                  action: url,
                  cat:'image',
                  createdAt: serverTimestamp()
                })
                
              }else{
               await addDoc(notificRef, newNotific)
              }
            
        } catch (error) {
            console.log(error.message)
        }
       
     }


    }
    // console.log('file', url)
  return (
    <div className="share_video_outer">
        <div className="shared_video"> 
            {!file &&<h3>Pakia Picha</h3>}
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}  
            
             { file? 
                <div className="share_image_container">
                    <img src={URL.createObjectURL(file)} alt="" /> 
                    <div className="video_progress">
                        <span className="progres_rate" style={{width: `${perc+"%"}`}}></span>
                    </div>
                </div>                        
                
                 : 
                 <div className="user_photo"> 
                 <label htmlFor="photo" className='profile_photo'>
                     <input 
                         type="file" 
                         name='photo' 
                         id="photo" style={{display: 'none'}}
                         onChange={handleSelect}
                     />
                     <span className='attached_photo'><BsCardImage/></span>
                 </label>
                 
                </div>
             }
            
            <div className="profile_photo_edit">                            
                    <button className='btn_cancel' onClick={() =>setImage(null)}>BATILISHA</button>
                </div>
            {file && <>
            <button 
                onClick={handleAudio}
                disabled={!url} 
                className='btn_sign'>{loading? <Loading/> : type==='image'? 'POST PICHA' : "TUMA PICHA"}
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
