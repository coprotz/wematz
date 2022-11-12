import React from 'react'
import useData from '../../hooks/useData'


const PartPhoto = ({part}) => {
    const { users } = useData()
    const memberName = users.find(u => u.id === part.userId)
  return (
    <div className="memb_photo">
        <img src={memberName?.photo} alt="" />                                            
    </div>
  )
}

export default PartPhoto
