import React from 'react'
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import useData from '../../hooks/useData';

const MeetingMembers = ({ setViewParts, parts }) => {
  const { users, meetings } = useData()
  const room = meetings?.find(p => p.id === parts?.id)
  const hoster = users?. find(u => u.id === room?.host)

  // console.log('room', room)
 
  const navigate = useNavigate()
  return (
    <motion.div 
    initial={{ x:'100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }}  
    className='add_meeting'>
        <div className='view_parts_outer'>
          <div className="view_parts_inner">
            <div className="top_meeting_wrapper">
              <div className="meeting_top">            
                  <button onClick={() => setViewParts(null)} className='btn_btn'><BsArrowLeft/></button>
                  
                  
                  
              </div>
                    
            </div>
            <div className="view_members_body">
              <div className="meeting_details">
                  <h4 className='title'>{parts?.name}</h4> 
                  <span className='meeting_dt'>Mkutano utakuwa <h4>{parts?.start_date}</h4> saa {parts?.start_time}</span>
                  <span className='meeting_dt'>Hosted by: <h4>{hoster?.name}</h4></span>
              </div>
              <h4 className='view_parts_b'>Washiriki</h4>
              <div className="view_members_grids">
                {room?.participants?.map(m => (
                   <div className="v_chat_card" key={m.id}>
                    <div className="v_chat_photo">
                      <img src={m?.photo? m?.photo : process.env.PUBLIC_URL + m?.avatar} alt="" />
                    </div>
                  </div>
                ))}
               
              </div>
            </div>
          </div>       
        </div>      
    </motion.div>
  )
}

export default MeetingMembers
