import React from 'react'
import useData from '../../hooks/useData'

const FollowCard = ({m}) => {
    const { users } = useData() 
    const user = users?.find(u => u.id === m)
  return (
    <div className="follow_img">
        <img src={user?.photo? user?.photo : process.env.PUBLIC_URL + user?.avatar} alt="" />
    </div>
  )
}

export default FollowCard
