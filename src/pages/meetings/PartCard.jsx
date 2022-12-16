import React from 'react'
import { BsMicMute, BsChatLeftText } from "react-icons/bs";
import useData from '../../hooks/useData';



const PartCard = ({item}) => {
  const { users } = useData()
  const memberName = users.find(u => u.id === item)
  return (
    <div className="part_card">
      <div className="part_info" key={item?.id}>
          {/* <img src={memberName?.photo} alt="" /> */}
          {memberName?.photo ? <img src={memberName?.photo} alt="" /> : 
          <div 
            className='avatar2'
            style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}
            >{memberName?.fname[0]+""+memberName?.lname[0]}
          </div>
          } 
          <button className='part_audio'><BsMicMute/></button>
      </div> 
      <div className="part_action">
          <h4>{memberName?.fname}</h4>                                    
      </div>
  </div>
  )
}

export default PartCard
