import React from 'react'
import { GrClose } from 'react-icons/gr'
import { motion } from 'framer-motion';
import useData from '../../hooks/useData';
import { useContext } from 'react';
import { ChatContext } from '../../hooks/chatsContext';
import { useState } from 'react';
import SearchUser from './SearchUser';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import Loading from '../../components/loading/Loading';
import { db, useAuth } from '../../hooks/useAuth';

const FindUser = ({setNew}) => {
    const {  users } = useData()
    const { user } = useAuth()
    const [sending, setSending] = useState(null)
    const { dispatch, setActive } = useContext(ChatContext)
    const [member, setMember] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const handleNewMsg = async () => {
        setSending(true)

        const data = {
            uid: member.id,
            name: member.name,
            photo: member?.photo || member.avatar
          }
          const combinedId = user.uid > member.id ? user.uid + member.id : member.id + user.uid;
          try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if(!res.exists()){
              await setDoc(doc(db, 'chats', combinedId), { messages: [] });
  
              await updateDoc(doc(db, 'userChats', user.uid), {
                [combinedId + ".userInfo"]: data,          
                [combinedId + ".createdAt"]: serverTimestamp()
              });
              await updateDoc(doc(db, 'userChats', member.id), {
                [combinedId+".userInfo"]: {
                  uid: member.id,
                  name: member.name,
                  photo: member.photo || member.avatar
                },
                [combinedId+".createdAt"]: serverTimestamp()
              });
            }
            setSending(false) 
            setMember(false)          
            dispatch({ type: 'CHANGE_USER', payload: data })
            setActive(true)
  
          } catch (error) {
            console.log(error.message)
        }

    }

  return (
    <motion.div 
     initial={{ x:'100vw'}}
     animate={{x:0}} 
     transition={{ ease: "easeOut", duration: 0.5 }} 
    className='find_user'>
        <div className="find_user_wrapper">
            <div className="finduser_top">                
                <h3 className='find_title'>Ujumbe Mpya</h3>
                <button onClick={() =>setNew(null)} className='btn_close'><GrClose/></button>
            </div>
            {member && 
            <div className="found_user">
                <div className="user_found_info">
                    <div className="found_user_img">
                        <img src={member?.photo || process.env.PUBLIC_URL + `${member?.avatar}`} alt="" />
                    </div>
                    <h4>{member.name}</h4>
                </div>                
                <div className="found_btns">
                    <button className='btn_ok' onClick={handleNewMsg}>{sending ? <Loading/> : 'Sawa'}</button>
                    <button className='btn_cancel' onClick={() =>setMember(null)}>Hapana</button>
                </div>
            </div>}
            <div className="find_user_input">
                <input 
                    type="text"                    
                    placeholder='Andika kutafuta' 
                    className='input_find'
                    onChange={(e) =>setSearchTerm(e.target.value)}
                    />
            </div>
            <div className="users_found">
                {users?.filter((val) => {
                if(searchTerm === ''){
                    return undefined
                }else if(val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return val
                }
                    }).map(d => (
                    <SearchUser d={d} setMember={setMember}/>
                ))}
            </div>
        </div>
        
      
    </motion.div>
  )
}

export default FindUser
