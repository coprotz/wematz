import React from 'react'
import {  BsPeople, 
    BsCaretDown, 
    BsPlusSquareDotted, 
    BsRecordCircleFill, 
    BsMic,
    BsTelephoneXFill,
    BsGear,
    BsArrowBarLeft,
    BsArrowLeft,
    BsCaretUp,
    BsArrowBarRight
} from "react-icons/bs";
import { meetings } from '../../data';
import { FiVideo } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { GiSpeaker } from "react-icons/gi";
import { useState } from 'react';

const ViewMeeting = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [open, setOpen] = useState(null)

  return (
    <div className='view_meeting'>
        <div className="view_meeting_top">            
            <div className="meeting_action">
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>
            </div>
            <h4>Wazandaki Meeting</h4>
        </div>
        <div className="view_meeting_inner">
            <div className="View_meeting_left">
                <div className="v_meeting_left_wrapper">
                    <div className="view_meeting_details">
                        <div className="meet_members">
                           <button className='btn_members' onClick={() => setShow(!show)}><BsPeople/>18{show? <BsCaretUp/> : <BsCaretDown/>}</button> 
                           {show &&
                           <div className="meet_member_lists">
                                {meetings.map((item,index) => (
                                    <div className="member_card" key={index}>
                                        <div className="m_photo">
                                            <img src={item.url} alt="" />                                            
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}

                           </div>}
                        </div>
                        
                        <button className='btn_add'><BsPlusSquareDotted/>Add Participant</button>
                    </div>
                    <div className="arrow_bar">
                        <span className='span_rec'><BsRecordCircleFill/>Recording 00:25:23</span>
                        <button className='btn' onClick={() => setOpen(!open)}>{open? <BsArrowBarRight/>: <BsArrowBarLeft/>}</button>
                    </div>
                    
                </div> 
                <div className="part_outer_wrapper">                
                    <div className={open? 'open' : "participants"}>
                        {meetings && meetings.map((item, index) => (
                        <div className="part_info" key={index}>
                                <img src={item.url} alt="" />
                                <div className="part_action">
                                    <span>{item.name}</span>
                                    <button><BsMic/></button>
                                </div>
                            </div> 
                        ))}
                        
                    </div> 
                    <div className="meetings_actions">                    
                        <button className='btn_btn'><BsMic/></button>
                        <button className='btn_btn'><FiVideo/></button>
                        <button className='btn_call'><BsTelephoneXFill/></button>                    
                        <button className='btn_btn'><GiSpeaker/></button>
                        <button className='btn_btn'><BsGear/></button>
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
