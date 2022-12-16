import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'

const Vappoint = ({item}) => {
    const { users } = useData()
    const user = users.find(u => u.id === item?.uid)
  return (
    <div className="v_chat_card">
        <div className="v_chat_photo">
            <img src={user?.photo} alt="" />
        </div>
    </div>
  )
}

export default Vappoint
