import React from 'react'
import { BsMicMute, BsChatLeftText } from "react-icons/bs";
import { meetings } from '../../data';
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { FaRegHandPeace } from 'react-icons/fa';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import { IoHandRightOutline } from "react-icons/io5";
import useData from '../../hooks/useData';
import PartCard from './PartCard';


const ViewMeeting = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [open, setOpen] = useState(null)
    const { id } = useParams()
    const { rooms, participants, clubs } = useData()
    const room = rooms.find(r => r.id === id)
    const club = clubs.find(c => c.id === room?.clubId)
    const members = participants.filter(p=>p.roomId === id)

    console.log('id', id)
    

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
                        {members.map((item) => (
                           <PartCard item={item} />
                       
                        ))}
                        
                    </div> 
                    <div className="mtngs_actions">                    
                        <button className='btn_btn' style={{backgroundColor: "#fff"}}><BsChatLeftText/></button>                       
                        <button className='btn_btn' style={{backgroundColor: "#fff"}}><IoHandRightOutline/></button>
                        <h4 onClick={() => navigate(-1)} className='leave_btn'><FaRegHandPeace/>Jiondoe</h4>
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
