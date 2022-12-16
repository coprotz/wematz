import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {  BsArrowLeft } from "react-icons/bs";
import useData from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import moment from 'moment';

const MyMeetings = () => {
    const navigate = useNavigate()
    const { rooms } = useData()
    const { user } = useAuth()
  return (
    <motion.div 
    initial={{ x:'100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }}  
    className='add_meeting'>
    <div className="top_meeting_wrapper my_meetings" >
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
          <tbody className='total'>
            {rooms.filter((r) => r.createdBy === user.uid).map((m, index) => (
              <tr>
                  <td data-label='SN'>{index+1}</td>     
                  <td data-label='Jina la Mdaharo' className='tab_column'>{m.name}</td>
                  <td data-label='Aina ya Ukumbi' className='tab_column'>Wazi</td>
                  <td data-label='Washiriki' className='tab_column'>Wote</td>
                  <td data-label='Tarehe' className='tab_column'>{moment(m.start_date).format('DD-M-YYYY') }</td>
                  <td data-label='Muda' className='tab_column'>{m.start_time}</td>   
                  <td data-label='Hali' className='tab_column'><button>Jiunge Sasa</button></td>  
                  <td data-label='Hatua' className='tab_column'>
                    <button onClick={() => navigate('/meetings/edit')}>Badili</button>
                    <button>Ondoa</button>
                  </td>          
              
              </tr>
            ))}
        
          </tbody>
      </table>          
    </div>
      
    </motion.div>
  )
}

export default MyMeetings
