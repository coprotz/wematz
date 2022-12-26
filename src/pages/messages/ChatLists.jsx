import React from 'react'
import { chats } from '../../data'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import ChatCard from './ChatCard'
import NewChat from './NewChat'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react'
import Search from './Search'
import SearchUser from './SearchUser'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'




const ChatLists = () => {

    const { user } = useAuth()
    const {  marriages, doctors, lawyers, users, userChats } = useData()
    const [currentUser, setCurrentUser] = useState(null)
    const [chats, setChats] = useState([])

    const cuUser = users?.find(u => u.id === user.uid)

    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, 'userChats', `${cuUser.id}` ), (doc) => {
        setChats(doc.data());
        });
        return () => {
          unsub()
        };
      };

      cuUser?.id && getChats()
     
    }, [cuUser?.id])

    // console.log(Object.entries(chats))

     

    // const myChats = userChats?.find(u => u?.id === cuUser?.id)

   
    // const marry = marriages?.find(p=>p.userId === user.uid)
    // const doc = doctors?.find(p=>p.userId === user.uid)

    // const userChats = chats?.filter(c =>c.members.includes(`${cuUser?.id}`))
    // const marryChats = chats?.filter(c =>c.members.includes(`${marry?.id}`))
    // const docChats = chats?.filter(c =>c.members.includes(`${doc?.id}`))

    // const allChats = userChats.concat(marryChats)

    // const mychats = allChats.concat(docChats)
    const [searchTerm, setSearchTerm] = useState("")

    // const adminId = process.env.REACT_APP_ADMIN_ID

    const [viewAction, setViewAction] = useState(null)
    const navigate = useNavigate()

    // console.log('mychats',Object.entries(myChats))
    // console.log('chats',userChats)

  return (
    <div className="messages_lists">
        <div className="message_title">
           <h3>Meseji</h3> 
           <div className="member_action" 
            onMouseEnter={() =>setViewAction(true)} 
            onMouseLeave={() =>setViewAction(null)}
            style={{paddingRight:'15px'}}
            >
              <button className='btn_btn' ><BsThreeDotsVertical/></button>
                {viewAction &&
                  <div className="chat_member_action" >                   
                    <span>Mpangilio</span>
                      <span>Anzisha ujumbe kwa Admin</span>                        
                    </div>}
            </div> 
          
        </div>  
        <div className="search_user">
          <Search setCurrentUser={setCurrentUser} currentUser={currentUser}/> 
        </div>
             
        <div className="mes_chatlists">
          {currentUser && <SearchUser currentUser={currentUser}/>}
          {Object.entries(chats)?.length > 0 ? 
          <>
            {Object.entries(chats)?.map(chat => (
                <ChatCard chat={chat} key={chat[0]}/>
              ))}
          </> : 'Hauna Chats'}
            
        </div>
      </div>
  )
}

export default ChatLists
