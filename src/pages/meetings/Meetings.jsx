import React from 'react'
import './meetings.css'
import {  BsArrowLeft } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddMeeting from './AddMeeting';
import { meetings } from '../../data';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import useData from '../../hooks/useData';
import MeetingCard from './MeetingCard';
import moment from 'moment';



const Meetings = () => {
    const navigate = useNavigate()
    const [add, setAdd] = useState(null)
    const { rooms } = useData()
   

    const today = moment(new Date()).format('YYYY-M-DD') 
    const time = moment(new Date()).format('HH:mm') 

    console.log('today', today)
  
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
            {rooms.filter(r =>r.start_date === today).map(room => (                    
                <MeetingCard room={room} onClick={() =>navigate(`/meetings/${room?.id}`)}/>
            ))}
                        
            </div>
        </div>
        <h3 className='title'>Midahalo Inayokuja</h3> 
        <div className="meetings_inner">                
            <div className="current_meetings">
            {rooms.filter(r =>r.start_date !== today).map(room => (                    
                <MeetingCard room={room}/>
            ))}
                        
            </div>
        </div>

    </div>:
        <AddMeeting setAdd={setAdd}/>}
    </>
  )
}

export default Meetings
