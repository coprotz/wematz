import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {  BsArrowLeft } from "react-icons/bs";
import useData from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import moment from 'moment';
import DeleteConfirm from '../../components/confirm/DeleteConfirm';
import AlertSms from '../../components/alert/AlertSms';
import { useState } from 'react';



const MyMeetings = () => {
    const navigate = useNavigate()
    const { rooms } = useData()
    const { user } = useAuth()
    const [messageAlert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)

    const mymeets = rooms?.filter(r => r.createdBy === user.uid)

  return (
    <motion.div 
    initial={{ x:'100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }}  
    className='add_meeting'>
         {confirm && <DeleteConfirm setConfirm={setConfirm} id ={confirm} body='Unataka kufuta huu mkutano..?' setAlert={setAlert}/> }
    <div className="top_meeting_wrapper my_meetings" >
    {messageAlert && <AlertSms alert={messageAlert}/>}  
 
        <div className="meeting_top">            
            <button onClick={() => navigate('/meetings')} className='btn_btn'><BsArrowLeft/></button>
            <h4>Midaharo Yangu</h4> 
          
        </div>  
        <table className='table'>
          <thead>
            <th className='descr'>SN</th>
            <th className='qty'>Jina la Mdaharo</th>
            <th className='total'>Aina ya Ukumbi</th>
            <th className='total'>Washiriki</th>  
            <th className='total'>Tarehe</th> 
            <th className='total'>Muda</th>    
            <th className='total'>Hali</th>     
            {/* <th className='total'>Status</th> */}
            <th className='total'>Hatua</th>
          </thead>
          {mymeets?.length > 0 ? 
          <tbody className='total'>
            {mymeets.map((m, index) => (
              <tr key={m.id}>
                  <td data-label='SN'>{index+1}</td>     
                  <td data-label='Jina la Mdaharo' className='tab_column'>{m.name}</td>
                  <td data-label='Aina ya Ukumbi' className='tab_column'>Wazi</td>
                  <td data-label='Washiriki' className='tab_column'>Wote</td>
                  <td data-label='Tarehe' className='tab_column'>{moment(m.start_date).format('DD-M-YYYY') }</td>
                  <td data-label='Muda' className='tab_column'>{m.start_time}</td>   
                  <td data-label='Hali' className='tab_column'><button onClick={() =>alert('Page under construction')}>Jiunge Sasa</button></td>  
                  <td data-label='Hatua' className='tab_column'>
                    <button onClick={() => navigate('/meetings/edit')}>Badili</button>
                    <button onClick={() =>setConfirm(m.id)}>Ondoa</button>
                  </td>          
              
              </tr>
            ))}
        
          </tbody> : <span>Hauna mikutano</span> }
      </table>          
    </div>
      
    </motion.div>
  )
}

export default MyMeetings
