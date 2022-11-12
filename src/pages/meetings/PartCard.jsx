import React from 'react'
import { BsMicMute, BsChatLeftText } from "react-icons/bs";
import useData from '../../hooks/useData';



const PartCard = ({item}) => {
  const { users } = useData()
  const memberName = users.find(u => u.id === item.userId)
  return (
    <div className="part_card">
      <div className="part_info" key={item?.id}>
          <img src={memberName?.photo} alt="" />
          <button className='part_audio'><BsMicMute/></button>
      </div> 
      <div className="part_action">
          <h4>{memberName?.fname+" "+memberName?.lname}</h4>                                    
      </div>
  </div>
  )
}

export default PartCard
