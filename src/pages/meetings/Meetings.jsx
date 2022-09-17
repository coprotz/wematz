import React from 'react'
import './meetings.css'
import {  BsArrowLeft } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddMeeting from './AddMeeting';

const Meetings = () => {
    const navigate = useNavigate()
    const [add, setAdd] = useState(null)
  return (
    <>
    {!add ?
    <div className='meetings'>
        <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>
                <h4>Meeting Rooms</h4> 
            </div>
            <div className="create_new" onClick={() =>setAdd(true)}>
                Create a Meeting
            </div>       
        </div>
        
        <div className="meetings_inner">          
                <div className="current_meetings">
                    <div className="current_meeting_card">
                        <h3>Wazandaki Meeting</h3>
                        <small>This meeting is about how to establish islamic state in Kondoa</small>
                        <h4>Starts: 12:30</h4>
                        <button className='btn_ask'>Ask to Join the Meeting</button>
                    </div>
                    <div className="current_meeting_card">
                        <h3>Wazandaki Meeting</h3>
                        <small>This meeting is about how to establish islamic state in Kondoa</small>
                        <h4>Starts: 12:30</h4>
                        <button className='btn_ask'>Ask to Join the Meeting</button>
                    </div>
                    <div className="current_meeting_card">
                        <h3>Wazandaki Meeting</h3>
                        <small>This meeting is about how to establish islamic state in Kondoa</small>
                        <h4>Starts: 12:30</h4>
                        <button className='btn_ask'>Ask to Join the Meeting</button>
                    </div>
                    <div className="current_meeting_card">
                        <h3>Wazandaki Meeting</h3>
                        <small>This meeting is about how to establish islamic state in Kondoa</small>
                        <h4>Starts: 12:30</h4>
                        <button className='btn_ask'>Ask to Join the Meeting</button>
                    </div>
                    <div className="current_meeting_card">
                        <h3>Wazandaki Meeting</h3>
                        <small>This meeting is about how to establish islamic state in Kondoa</small>
                        <h4>Starts: 12:30</h4>
                        {/* <button className='btn_ask'>Ask to Join the Meeting</button> */}
                        <button className='btn_back1' onClick={() =>navigate('/meetings/1')}>Back to the Meeting</button>
                    </div>
                </div>
            </div>
            

    
        </div>:
        <AddMeeting setAdd={setAdd}/>}
     </>
  )
}

export default Meetings
