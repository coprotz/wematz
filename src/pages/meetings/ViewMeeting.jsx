import React from 'react'
import { BsMicMute, BsChatLeftText } from "react-icons/bs";
import { meetings } from '../../data';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FaRegHandPeace } from 'react-icons/fa';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import { IoHandRightOutline } from "react-icons/io5";


const ViewMeeting = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [open, setOpen] = useState(null)

  return (
    <div className='view_meeting'>
        <div className="view_meeting_top">            
            <div className="view_meeting_details">
                <h3 className='meet_part'>WOTE</h3>
                <h1 className='meeting_title'>JE KUNA ULAZIMA WA KUSWALI BILA UDHU?</h1>
            </div>
            
        </div>
        <div className="meeting_status">
            <div className="meet_peopl">
                <FaRegUser/>12
            </div>
            <div className="meet_peopl">
                <FaRegCommentDots/>12
            </div>
        </div>
        <div className="view_meeting_inner">
            <div className="View_meeting_left">
                <div className="v_meeting_left_wrapper">
                    {/* <div className="view_meeting_details">
                        <h4 className='meet_part'>WOTE</h4>
                        <h1>JE KUNA ULAZIMA WA KUSWALI BILA UDHU?</h1>
                    </div> */}
                    {/* <div className="arrow_bar">
                        <span className='span_rec'><BsRecordCircleFill/>Recording 00:25:23</span>
                        <button className='btn' onClick={() => setOpen(!open)}>{open? <BsArrowBarRight/>: <BsArrowBarLeft/>}</button>
                    </div> */}
                    
                </div> 
                
                <div className="part_outer_wrapper">                
                    <div className={open? 'open' : "participants"}>
                        {meetings && meetings.map((item, index) => (
                            <div className="part_card">
                                <div className="part_info" key={index}>
                                    <img src={item.url} alt="" />
                                    <button className='part_audio'><BsMicMute/></button>
                                </div> 
                                <div className="part_action">
                                    <span>{item.name}</span>                                    
                                </div>
                            </div>
                       
                        ))}
                        
                    </div> 
                    <div className="meetings_actions">                    
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
