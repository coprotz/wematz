import React from 'react'
import useData from '../../hooks/useData'

const LikeCard = ({item}) => {
    const { users } = useData()
    const user = users?.find(u => u.id === item?.user_id)
  return (
    <div className="liks_m">
        <img src={user?.photo || process.env.PUBLIC_URL + user?.avatar} alt="" />
    </div>
  )
}

export default LikeCard
