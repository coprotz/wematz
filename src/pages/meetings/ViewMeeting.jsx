import React from 'react'
import { BsMicMute, BsChatLeftText, BsMic } from "react-icons/bs";
import { meetings } from '../../data';
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { FaRegHandPeace } from 'react-icons/fa';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import { IoHandRightOutline } from "react-icons/io5";
import useData from '../../hooks/useData';
import PartCard from './PartCard';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useContext } from 'react';
import { PeerContext } from '../../hooks/PeerContext';



const ViewMeeting = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [open, setOpen] = useState(null)
    const { user } = useAuth()
    const { id } = useParams()
    const { rooms,  clubs, participants } = useData()
    const room = rooms.find(r => r.id === id)
    const club = clubs.find(c => c.id === room?.clubId)
   
    const { userStream, setUserStream, currentRoom } = useContext(PeerContext)
    

    // const participants = [...room?.participants]

   

    const roomRef = doc(db, 'rooms', `${room?.id}`)

     

    console.log('currentRoom', currentRoom)

    const members = room?.participants
   
    const isCreator = room?.createdBy === user.uid

    console.log('stream', userStream)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((mediastream) => {
                mediastream.getAudioTracks()[0].enabled = false;
                setUserStream(mediastream)
            })
    },[])

    

    console.log('isCreator', isCreator)

    const handleLeave = async () =>{
        try {
            if(isCreator){
                navigate(-1)
            }else{
               const updateMembers = members?.filter(m => m !== user.uid)
                await updateDoc(roomRef, {
                    participants: updateMembers
                })
                navigate(-1) 
            }
            
        } catch (error) {
            console.log(error.message)
        }
        

    }
    

  return (
    <div className='view_meeting'>
        <div className="view_meeting_top">            
            <div className="view_meeting_details">
                <h3 className='meet_part'>{club?.name}</h3>
                <h1 className='meeting_title'>{room?.name}</h1>
            </div>
            
        </div>
        <div className="meeting_status">
            <div className="meet_peopl">
                <FaRegUser/>{members?.length}
            </div>
            <div className="meet_peopl">
                <FaRegCommentDots/>12
            </div>
        </div>
        <div className="view_meeting_inner">
            <div className="View_meeting_left">
                <div className="part_outer_wrapper">                
                    <div className={open? 'open' : "participants"}>
                        {members?.map((item) => (
                           <PartCard item={item} />
                       
                        ))}
                        
                    </div> 
                    <div className="mtngs_actions">                    
                        <button className='btn_btn' style={{backgroundColor: "#fff"}}><BsChatLeftText/></button>                       
                        <button className='btn_btn' style={{backgroundColor: "#fff"}}><IoHandRightOutline/></button>
                        <button className='btn_btn' style={{backgroundColor: "#fff"}}><BsMic/></button>
                        <h4 onClick={handleLeave} className='leave_btn'><FaRegHandPeace/>Jiondoe</h4>
                    </div>  
                </div>            
            </div>
            <div className={open? "view_meeting_right" : 'close_message'}>
                <div className="v_m_r_top">
                    <h4>Messages</h4>
                    <div className="v_meet_chats">

                    </div>                   
                </div>
                <div className="message_sending">
                    <input type="text" placeholder='Message' className='input_msg'/>
                    <button>Send</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ViewMeeting
