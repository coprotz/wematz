import { doc, onSnapshot } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../hooks/chatsContext'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import Message from './Message'
import SearchUser from './SearchUser'
import SideChats from './SideChats'

const Chats = () => {  
   
    const { active, setActive  } = useContext(ChatContext) 

    const activeClass = active? 'side_bar_active' : 'desktop_class'
    const activeChat = active? 'mob_chat_messgae' : 'desktop_chat'
  
  return (
    <div className="chats_container">  
        <div className="chats_wrapper">
            <div className={`side_chats ${activeClass}`}>
                <SideChats />
            </div>
            <div className={`chat_message ${activeChat}`}>
                <Message />
            </div>
        </div> 
      </div>
  )
}

export default Chats
