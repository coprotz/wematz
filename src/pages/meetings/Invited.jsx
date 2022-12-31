import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {  BsArrowLeft } from "react-icons/bs";
import useData from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import moment from 'moment';
import MeetingMembers from './MeetingMembers';
import RoomCard from './RoomCard';

const Invited = () => {
    const navigate = useNavigate()
    const [viewParts, setViewParts] = useState(null)
    const { rooms, users, participants, meetings } = useData()
    const { user } = useAuth()

    const others = meetings?.filter(r => r.host !== user.uid)

    const parts = others?.filter(p =>p.participants.filter(t =>t.id.includes(`${user.uid}`)))

    // console.log('parts', parts)
  
  return (
    <>
    {viewParts ? <MeetingMembers parts={viewParts} setViewParts={setViewParts}/> :
    <motion.div 
    initial={{ x:'100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }}  
    className='add_meeting'>
    <div className="top_meeting_wrapper my_meetings" >
        <div className="meeting_top">            
            <button onClick={() => navigate('/meetings')} className='btn_btn'><BsArrowLeft/></button>
            <h4>Midaharo Niliyoalikwa</h4>           
        </div>  
        <table className='table'>
        <thead>
          <th className='descr'>SN</th>
          <th className='qty'>Jina la Mdaharo</th>
          <th className='total'>Aina ya Ukumbi</th>
          <th className='total'>Waalikwa</th>  
          <th className='total'>Tarehe</th> 
          <th className='total'>Muda</th>    
          <th className='total'>Hali</th>     
         
        </thead>
        {parts?.length > 0 ?
        <tbody className='total'>
          {parts.map((m, index) => (
           <RoomCard  m={m} index={index} setViewParts={setViewParts}/>
          ))}
           
       
        </tbody> : 'Hauna mwaliko'}
      </table>          
    </div>
      
    </motion.div> }</>
  )
}
export default Invited
