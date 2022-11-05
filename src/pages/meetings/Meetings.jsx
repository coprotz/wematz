import React from 'react'
import './meetings.css'
import {  BsArrowLeft } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddMeeting from './AddMeeting';
import { meetings } from '../../data';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';



const Meetings = () => {
    const navigate = useNavigate()
    const [add, setAdd] = useState(null)
  return (
    <>
    {!add ?
    <div className='meetings'>
        <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
                <h4>Ukumbi wa Midahalo</h4> 
            </div>
            <div className="create_new" onClick={() =>setAdd(true)}>
                Anzisha Mdahalo
            </div>       
        </div>
        <h3 className='title'>Midahalo Inayoendelea sasa hivi</h3>  
        <div className="meetings_inner"> 
               
                <div className="current_meetings">
                    <div className="current_meeting_card" onClick={() =>navigate('/meetings/1')}>
                        <h3 className='meet_part'>WOTE</h3>
                        <h4>JE KUNA ULAZIMA WA KUSWALI BILA UDHU?</h4>
                        <div className="meeting_teams">
                            <div className="team_photos">
                                {meetings.slice(0,2).map(item => (
                                    <div className="memb_photo">
                                        <img src={item.url} alt="" />                                            
                                    </div>
                                ))}

                            </div>
                            <div className="team_names_wrapper">
                                <div className="team_names">
                                    <span>Kwame Mkuruma</span>
                                    <span>Monica Seka</span>
                                    <span>Ally Mbaya</span>
                                </div>
                                <div className="meeting_status">
                                    <div className="meet_peopl">
                                        <FaRegUser/>12
                                    </div>
                                    <div className="meet_peopl">
                                        <FaRegCommentDots/>12
                                    </div>
                                </div>
                            </div>
                        </div>                    
                        {/* <button className='btn_ask'>Jiunge</button> */}
                    </div>
                        
                    <div className="current_meeting_card">
                        <h3 className='meet_part'>WABABA</h3>
                        <h4>KWANN TATIZO LA NGUVU ZA KIUME LIMEKUWA KUBWA?</h4>
                        <div className="meeting_teams">
                            <div className="team_photos">
                                {meetings.slice(3,5).map(item => (
                                    <div className="memb_photo">
                                        <img src={item.url} alt="" />                                            
                                    </div>
                                ))}

                            </div>
                            <div className="team_names_wrapper">
                                <div className="team_names">
                                    <span>Kwame Mkuruma</span>
                                    <span>Monica Seka</span>
                                    <span>Ally Mbaya</span>
                                </div>
                                <div className="meeting_status">
                                    <div className="meet_peopl">
                                        <FaRegUser/>12
                                    </div>
                                    <div className="meet_peopl">
                                        <FaRegCommentDots/>12
                                    </div>
                                </div>
                            </div>
                        </div>                    
                        {/* <button className='btn_ask'>Jiunge</button> */}
                    </div>
                
                </div>
            </div>
            

    
        </div>:
        <AddMeeting setAdd={setAdd}/>}
     </>
  )
}

export default Meetings
