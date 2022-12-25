import {  doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../hooks/useAuth'
import Loading from '../../components/loading/Loading'
import { useContext } from 'react'
import { ChatContext } from '../../hooks/chatsContext'


const NewChat = ({item,  setOpen, cuUser }) => {    
    const [sending, setSending] = useState(null)   
    const navigate = useNavigate();
    const { dispatch, active, setActive } = useContext(ChatContext)

    const handleNew = async () => {
        setSending(true)

        const data = {
          uid: item.id,
          name: item.name,
          photo: item?.photo || item.avatar
        }
        const combinedId = cuUser.id > item.id ? cuUser.id + item.id : item.id + cuUser.id;
        try {
          const res = await getDoc(doc(db, 'chats', combinedId));
          if(!res.exists()){
            await setDoc(doc(db, 'chats', combinedId), { messages: [] });

            await updateDoc(doc(db, 'userChats', cuUser.id), {
              [combinedId + ".userInfo"]: data,          
              [combinedId + ".createdAt"]: serverTimestamp()
            });
            await updateDoc(doc(db, 'userChats', item.id), {
              [combinedId+".userInfo"]: {
                uid: cuUser.id,
                name: cuUser.name,
                photo: cuUser.photo || cuUser.avatar
              },
              [combinedId+".createdAt"]: serverTimestamp()
            });
          }
          setSending(false)
          navigate('/messages')
          dispatch({ type: 'CHANGE_USER', payload: data })
          setActive(true)

        } catch (error) {
          console.log(error.message)
      }
        
    }  

  return (
  
      <div className='new_chat_app' >       
        <div className="pop_new_msg">        
          <div className="pop_new_chat">
              <span>Unatuma meseji kwa <strong>{item?.username || item?.name}</strong>?</span>
              <div className="group_btns">
                  <button onClick={handleNew} className='btn_sign'>{sending? <Loading/>: 'SAWA'}</button>
                  <button onClick={() => setOpen(null)} className='btn_cancel'>BATILISHA</button>
              </div>
          </div>
        </div>
        
        
      </div>
    
    

  )
}

export default NewChat
