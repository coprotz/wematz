import React from 'react'
import { useNavigate } from 'react-router-dom'
import useData from '../../hooks/useData'
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import './meetings.css'
import PartName from './PartName';
import PartPhoto from './PartPhoto';

const MeetingCard = ({room}) => {
  const {participants, clubs} = useData()
  const club = clubs.find(c => c.id === room?.clubId)
  const members = participants.filter(p=>p.roomId === room?.id)
  const navigate = useNavigate()
  return (
    <div className="current_meeting_card" onClick={() =>navigate(`/meetings/${room?.id}`)} key={room.id}>
      <h3 className='meet_part'>{club?.name}</h3>
      <h4 className='room_name'>{room?.name}</h4>
      <div className="meeting_teams">
          <div className="team_photos">
          {members?.slice(0,2).map(item => (
            <PartPhoto part={item}/>
          ))}

          </div>
          <div className="team_names_wrapper">
            <div className="team_names">
              {members.slice(0,5).map(m => (
                <PartName part={m} key={m.id}/>
              ))}
              
             
            </div>
                <div className="meeting_status">
                  <div className="meet_peopl">
                    <FaRegUser/>{members?.length}
                  </div>
                  <div className="meet_peopl">
                      <FaRegCommentDots/>12
                  </div>
                </div>
            </div>
        </div>                    
                        {/* <button className='btn_ask'>Jiunge</button> */}
    </div>
  )
}

export default MeetingCard