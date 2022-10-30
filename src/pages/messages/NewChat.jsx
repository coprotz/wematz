import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import Loading from '../../components/loading/Loading'
import { BsChatLeftDotsFill } from 'react-icons/bs'



const NewChat = ({id, name, myid}) => {
    const { user } = useAuth()
    const { users, doctors, marriages, chats } = useData()

    const cuUser = users && users.find(a => a.id === user.uid)
    const marry = marriages?.find(a => a.userId === user.uid)
    const doctor = doctors?.find(a => a.userId === user.uid)

    const chatsRef = collection(db, 'chats')
    const [action, setAction] = useState(null)
    const [open, setOpen] = useState(null)
    const [sending, setSending] = useState(null)
    const navigate = useNavigate();

    const userChats = chats && chats.filter(c => c.members.includes(`${cuUser?.id}`))
    const marryChats = chats && chats.filter(c => c.members.includes(`${marry?.id}`))
    const doctorChats = chats && chats.filter(c => c.members.includes(`${doctor?.id}`))

    const allchats = userChats.concat(marryChats)
    const mychats = allchats.concat(doctorChats)

    // const oldChats = 
    //   cuUser? userChats :
    //   marry? marryChats :
    //   doctor? doctorChats : null

      const oldChat = mychats?.find(c => c.members.includes(`${id}`))

      const myId =  
      cuUser? cuUser.id :
      marry ?  marry?.id :
      doctor ? doctor?.id: null

      const handleNew = async(e) => {

        e.preventDefault();
        
        setSending(true)
    
        try {

          if(oldChat){          
           navigate(`/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${ myid}`, `${id}`]
            }
        
            const chat = await addDoc(chatsRef, data)
            if(chat){
              navigate(`/messages/${chat.id}`) 
            }
            // setCurrentRoom(chat)
            setSending(null)
            
          }     
        //   setSelected(null)
        //   setNewMsg(null)
        //   setNewChat(null)
          
        } catch (error) {
          console.log(error.message)
        }
      }
    

     
      
    

  return (
    <div className='new_chat_app' onMouseEnter={() =>setAction(true)} onMouseLeave={() =>setAction(null)}>
    <button className='btn_btn' onClick={() =>setOpen(id)}><BsChatLeftDotsFill/></button>
    {action && <span className='div_span'>Messeji</span>}
    {open &&
    <div className="pop_new_msg">        
      <div className="pop_new_chat">
          <span>Send message to <strong>{name}</strong>?</span>
          <div className="group_btns">
              <button onClick={handleNew} className='btn_sign'>{sending? <Loading/>: 'SAWA'}</button>
              <button onClick={() => setOpen(null)} className='btn_cancel'>BATILISHA</button>
          </div>
      </div>
    </div>
    
    }
</div>
  )
}

export default NewChat
