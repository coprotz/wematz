import React from 'react'
import './appointment.css'
import {GrClose } from "react-icons/gr";
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';

const Appointment = ({appoint, setAppoint}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(null)
    const { user } = useAuth()

    const handleAppoint = async () => {
        setLoading(true)
        const appointRef = collection(db, 'appoints')
        const data = {
            date,
            time,
            body,
            uid: user.uid,
            target_id: appoint?.id,
            status: 'Pending',
            createdAt: serverTimestamp()
        }

        try {
            await addDoc(appointRef, data)
            setLoading(null)
            setAppoint(null)
        } catch (error) {
            console.log(error.message)
        }
    }
   
  return (
    <div className='view_outer'>
    <div className='view_wrapper'>
      <div className='view_inner_top'>
        <button className='btn_btn' onClick={() => setAppoint(null)}><GrClose/></button>
      </div>
      <div className='view_body'>          
        <div className='appoint_photo'>
          <img src={appoint?.photo}/>
        </div>
   
      </div> 
     
      <div className="appoints_contents">
        <h3>Weka Miadi na {appoint?.name}</h3>      
        <div className="group_inputs">
            <h4>Tarehe ya Miadi</h4>
            <input 
                type="date"
                className='sel_input3'
                value={date}
                style={{width: 'auto'}}
                onChange={(e) => setDate(e.target.value)}
                 />
        </div>
        <div className="group_inputs">
            <h4>Muda wa Miadi</h4>
            <input 
                type="time"
                className='sel_input3'
                style={{width: 'auto'}}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                 />
        </div>
        <div className="group_inputs">           
            <textarea 
                type="time"
                className='sel_input3'
                style={{width: 'auto'}}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={`Weka sababu za Kutaka Kukutana ${appoint?.name}`}
            ></textarea>
        </div>
        <div>
            <button className='btn_sign' onClick={handleAppoint}>{loading ? <Loading /> : 'Tuma Miadi'}</button>
        </div>
        
      </div>
    </div>
    
  </div>
  )
}

export default Appointment
