import React from 'react'
import useData from '../../hooks/useData'

const Vchat = ({item, item_id}) => {
    const { users } = useData()    
    const memberId = item?.members.find(m =>m !== item_id)
    const user = users?.find(u => u.id === memberId)
  return (
    <div className="v_chat_card">
        <div className="v_chat_photo">
            <img src={user?.photo} alt="" />
        </div>
    </div>
  )
}

export default Vchat
