import React from 'react'
import useData from '../../hooks/useData'

const LikeCard = ({item}) => {
    const { users } = useData()
    const user = users?.find(u => u.id === item?.user_id)
  return (
    <div className="liks_m">
       {user?.photo ? <img src={user?.photo} alt="" />: 
        <div 
          className='avatar2'
          style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, height:'25px', width:'25px', fontSize:'1rem'}}
          >{user?.name[0]}
        </div>
        }
        {/* <img src={user?.photo || process.env.PUBLIC_URL + user?.avatar} alt="" /> */}
    </div>
  )
}

export default LikeCard
