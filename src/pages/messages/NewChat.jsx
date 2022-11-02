import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import Loading from '../../components/loading/Loading'
import { BsChatLeftDotsFill } from 'react-icons/bs'



const NewChat = ({item}) => {
    const { user } = useAuth()
    const { users, doctors, marriages, chats, lawyers } = useData()

    const isUser = users?.find(u => u.id === item?.id)
    const isMarry = marriages?.find(m => m.id === item?.id)
    const isDoc = doctors?.find(d => d.id === item?.id)
    const isLaw = lawyers?.find(l => l.id === item?.id)

    const myMarryId = marriages?.find(m => m.userId === user.uid)
    const myLawId = lawyers?.find(l => l.userId === user.uid)
    const myDocId = doctors?.find(d => d.userId === user.uid)

    // const cuUser = users && users.find(a => a.id === user.uid)
    // const marry = marriages?.find(a => a.userId === user.uid)
    // const doctor = doctors?.find(a => a.userId === user.uid)

    // const { id, name, photo, userId, username } = item

    const chatsRef = collection(db, 'chats')
    // const [action, setAction] = useState(null)
    const [open, setOpen] = useState(null)
    const [sending, setSending] = useState(null)

    // const myId = user.uid || 
    //   doctors?.find(d => d.userId === user.uid)?.id || 
    //   marriages?.find(m =>m.userId === user.uid)?.id ||
    //   lawyers?.find(l => l.userId === user.uid)?.id

    // const myId = isMarry? 

    const myid = isMarry? myMarryId?.id : isUser? myLawId?.id || myDocId?.id : isDoc? user.uid : isLaw? user.uid : null

    const navigate = useNavigate();

    console.log('myid', myid)
    console.log('otherId', item?.id)

      const mychats = chats?.filter(c =>c.members.includes(`${myid}`))   

      const oldChat = mychats?.find(c => c.members.find(m =>m === item?.id))

      const handleNew = async(e) => {

        e.preventDefault();
        
        setSending(true)
    
        try {

          if(oldChat){          
           navigate(`/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${ myid}`, `${item?.id}`]
             
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
    <div className='new_chat_app' 
      // onMouseEnter={() =>setAction(true)} 
      // onMouseLeave={() =>setAction(null)}
      >
    <button className='btn_btn' onClick={() =>setOpen(item?.id)}><BsChatLeftDotsFill/></button>
    {/* {action && <span className='div_span'>Messeji</span>} */}
    {open &&
    <div className="pop_new_msg">        
      <div className="pop_new_chat">
          <span>Send message to <strong>{item?.username || item?.name}</strong>?</span>
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
