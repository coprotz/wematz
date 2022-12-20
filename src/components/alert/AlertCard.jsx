import React from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'
import { doc, updateDoc } from 'firebase/firestore'
import { GrClose } from "react-icons/gr";
import { useEffect } from 'react'




const AlertCard = ({item}) => {
    // const {user} = useAuth()
    const { users } = useData()
    const cuUser = users.find(u => u.id === item?.uid)

    // const today = new Date().getTime()
  return (
    <div className="alert_card">    
        <div className="activity_card" >
            <div className="activity_photo">
                <img src={cuUser?.photo || process.env.PUBLIC_URL + cuUser?.avatar} />
            </div>
            <div className="activies_inner_body">
                <h4>{cuUser?.name}</h4><span>{item?.action+" "+item?.type}</span>
                <small className='q_date'>{moment(item?.createdAt.seconds * 1000).format('MMM Do YY, LT') }</small>
            </div>            
        </div>
        <button className='btn_alert' onClick={() =>updateDoc(doc(db, 'notifics', `${item.id}`), {isSeen: true})}><GrClose/></button>
    </div>
  )
}

export default AlertCard
