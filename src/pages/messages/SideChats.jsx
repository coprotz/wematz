import { doc, onSnapshot } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { BsChatLeftDots, BsThreeDotsVertical } from 'react-icons/bs'
import { HiChatAlt, HiOutlineArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../../hooks/chatsContext'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import SearchUser from './SearchUser'
import ChatCard from './ChatCard'
import FindUser from './FindUser'

const SideChats = () => {
    const { user } = useAuth()
    const {  marriages, doctors, lawyers, users, userChats } = useData()
    const [newChat, setNew] = useState(null)
    const [chats, setChats] = useState([])
    // const { dispatch, active, setActive } = useContext(ChatContext)

    const navigate = useNavigate()

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

  
  return (
    <div className="side_chats">
        <div className="message_title">
          <div className="heading_top">                
              <div className="view_que_back">
                <button onClick={() =>navigate('/')} className='btn_btn'><HiOutlineArrowLeft/></button>
              </div>
              <h2 className='title'>Meseji</h2>                  
            </div>            
           <div className="member_action" 
            // onMouseEnter={() =>setViewAction(true)} 
            // onMouseLeave={() =>setViewAction(null)}
            style={{paddingRight:'15px'}}
            >
              {/* <button className='btn_btn' ><BsThreeDotsVertical/></button> */}
               
            </div> 
          
        </div>  
        {/* <div className="search_user">
          <Search setCurrentUser={setCurrentUser} currentUser={currentUser}/> 
        </div> */}
             
        <div className="mes_chatlists">
          {newChat && <FindUser setNew={setNew}/>}
          {Object?.entries(chats)?.length > 0 ? 
          <>
            {Object.entries(chats)?.sort((a,b)=>b[1].createdAt - a[1].createdAt).map(chat => (
               <ChatCard chat = {chat} key={chat[0]}/>
              ))}
          </> : 'Hauna Chats'}
            <button className='btn_new_chat' onClick={() =>setNew(true)}><HiChatAlt/></button>
        </div>
      </div>
  )
}
export default SideChats
