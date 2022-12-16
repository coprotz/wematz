import React from 'react'
import './meetings.css'
import {  BsArrowLeft } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddMeeting from './AddMeeting';
import { meetings } from '../../data';
import { IoCreate,IoCalendar, IoGrid } from 'react-icons/io5';
import useData from '../../hooks/useData';
import MeetingCard from './MeetingCard';
import moment from 'moment';
import { db, useAuth } from '../../hooks/useAuth';
import { collection } from 'firebase/firestore';
import { useRef } from 'react';



const Meetings = () => {
    const navigate = useNavigate()
    const [add, setAdd] = useState(null)
    const { rooms } = useData()
    const { user } = useAuth()

    const dbRef = collection(db, 'rooms')

    // const roomRef = dbRef.child('participants')

    // console.log('room', roomRef)
   

    const today = moment(new Date()).format('YYYY-M-DD') 
    const time = moment(new Date()).format('HH:mm') 

    // const meetRef = useRef()

    // console.log('meetRef', meetRef)

    // const handleRoom = (room) => {
    //     meetRef.current = room.id
    // }
  
  return (
   
    <div className='meetings'>
        <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
                <h4>Ukumbi wa Midahalo</h4> 
            </div>
                   
        </div>
        <div className="meetings_body">
            <div className="create_new" onClick={() =>navigate('/meetings/create')}>
                <IoCreate/>
                <h3>Anzisha Mdaharo</h3>
                <span>Anzisha Mdaharo na kisha alika WanaWema </span>
            </div>
            <div className="create_new" onClick={() =>navigate('/meetings/mymeetings')}>
                <IoGrid/>
                <h3>Midaharo Yangu</h3>
                <span>Angalia Midaharo uliyoianzisha</span>
            </div>
            <div className="create_new" onClick={() =>navigate('/meetings/invited')}>
                <IoCalendar/>
                <h3>Midaharo Niliyoalikwa</h3>
                <span>Angalia Midaharo uliyoalikwa</span>
            </div>
        </div>
    

    </div>
  )
}

export default Meetings
