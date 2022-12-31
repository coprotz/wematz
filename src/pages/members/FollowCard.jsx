import React from 'react'
import useData from '../../hooks/useData'

const FollowCard = ({m}) => {
    const { users } = useData() 
    const user = users?.find(u => u.id === m)
  return (
    <div className="follow_img">
       {user?.photo ? <img src={user?.photo} alt="" />: 
        <div 
            className='avatar2'
            style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, height:'45px', width:'45px'}}
            >{user?.name[0]}
          </div>
        } 
        {/* <img src={user?.photo? user?.photo : process.env.PUBLIC_URL + user?.avatar} alt="" /> */}
    </div>
  )
}

export default FollowCard
