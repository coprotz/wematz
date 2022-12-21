import React from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'
import { doc, updateDoc } from 'firebase/firestore'
import { GrClose } from "react-icons/gr";
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'




const AlertCard = ({item, allnots, setAlert}) => {
    const {user} = useAuth()
    const { users } = useData()
    const cuUser = users.find(u => u.id === item?.uid)
    const navigate = useNavigate()

    const status = allnots?.length

    // console.log('item', item)

    const handleNavigate = async () => {
        
        if(item?.type === 'message'){
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          navigate(`/messages/${item?.type_id}`)
          setAlert(null)
        }else if(item?.type === 'post'){
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          navigate('/')
          setAlert(null)
        }else if(item?.type === 'follow'){
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          navigate(`/members/${item?.type_id}`)
          setAlert(null)
        }else {
          // return undefined
          setAlert(null)
        }
      }

    const RenderNavigate = () => {
        if(item?.type === 'message'){
            navigate()
        }
    }

    // console.log('nots', status)

    // useEffect(() => {             
    //    if(Notification.permission !== "denied") {
    //       Notification.requestPermission().then((permission) => {
    //         if(permission === "granted"){
    //           const notification = new Notification("Wema Muslim Ummah", {
    //             body: "Asante kwa kuruhusu notification kutoka Wema",
    //             icon: "logo_512.png",
    //             tag: `${user.uid}`

    //           })
    //         }
    //       })
    //     }
    //   })

    // const today = new Date().getTime()
  return (
    <div className="alert_card" onClick={handleNavigate}>    
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
