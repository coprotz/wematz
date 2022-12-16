import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import Loading from '../../components/loading/Loading'
import { BsChatLeftDotsFill } from 'react-icons/bs'
import NewDonate from '../donates/NewDonate'



const NewChat = ({item, myId, setOpen }) => {
    const { user } = useAuth()
    const { users, doctors, marriages, chats } = useData()   

    const chatsRef = collection(db, 'chats')
    // const [open, setOpen] = useState(null)
    const [sending, setSending] = useState(null)
   
    const navigate = useNavigate();

    console.log('myid', myId)
    console.log('otherId', item?.id)

      const mychats = chats?.filter(c =>c.members.includes(`${myId}`))
      const oldChat = mychats?.find(c => c.members.find(m =>m === item?.id))

      // const today = new Date().getTime()

      // console.log('today', today)

      // const mujaheed = donates?.find(d => d?.user_id === user.uid)
      // const mujaheed = new Date(donates?.find(d => d?.user_id === user.uid)?.expiredAt?.seconds * 1000).toLocaleDateString("en-US")
      // const isMujaheed = mujaheed && mujaheed.find(m =>m?.expiredAt > today)

      // const expiredAdate = new Date(mujaheed?.expiredAt?.seconds * 1000).getTime()
  
      

      // const valid = expiredAdate > today

      // console.log('valid', valid)
      // console.log('expiredAdate', expiredAdate)

      const handleNew = async(e) => {

        e.preventDefault();
        
        setSending(true)
       
            try {

              if(oldChat){          
               navigate(`/messages/${oldChat.id}`)       
              }
              else{
                const data = {
                  members : [`${ myId}`, `${item?.id}`]
                 
                }
            
                const chat = await addDoc(chatsRef, data)
                if(chat){
                  navigate(`/messages/${chat.id}`) 
                }         
                setSending(null)            
              }     
          
              
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
