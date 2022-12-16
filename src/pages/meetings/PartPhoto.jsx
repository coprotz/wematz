import React from 'react'
import useData from '../../hooks/useData'


const PartPhoto = ({part}) => {
    const { users } = useData()
    const memberName = users.find(u => u.id === part)
  return (
    <div className="memb_photo">
        {memberName?.photo ? <img src={memberName?.photo} alt="" /> : 
        <div 
          className='avatar'
          style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}
          >{memberName?.name[0]}
        </div>
        }                                           
    </div>
  )
}

export default PartPhoto
