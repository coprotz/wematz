import React from 'react'
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import useData from '../../hooks/useData';

const MeetingMembers = ({ setViewParts, parts }) => {
  const { participants } = useData()
  const room = participants?.find(p => p.room === parts?.id)

  console.log('room', room)
 
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
                  <h4 className='title'>{parts?.name}</h4> 
                  
              </div>
                    
            </div>
            <div className="view_members_body">
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
