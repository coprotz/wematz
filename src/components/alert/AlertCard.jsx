import React from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'
import { doc, updateDoc } from 'firebase/firestore'
import { GrClose } from "react-icons/gr";
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ChatContext } from '../../hooks/chatsContext'




const AlertCard = ({item, allnots, setAlert}) => {
    const {user} = useAuth()
    const { users, doctors, lawyers, marriages } = useData()
    const { dispatch, setActive } = useContext(ChatContext)
    const cuUser = users.find(u => u.id === item?.uid)
    const navigate = useNavigate()

    

    // const status = allnots?.length
    const data = {
      uid: item?.uid
    }

    const sender = 
      users?.find(u => u.id === item?.uid) || 
      marriages?.find(m => m.id === item?.uid) ||
      doctors?.find(m => m.id === item?.uid) ||
      lawyers?.find(m => m.id === item?.uid)

    // console.log('item', item)

    const handleNavigate = async () => {
        
        if(item?.type === 'message'){
          setAlert(null)
          navigate('/messages')
          dispatch({ type: "CHANGE_USER", payload: data })
          setActive(true)
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
        }else if(item?.type === 'post'){
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          navigate('/')
          setAlert(null)
        }else if(item?.type === 'follow'){
          setAlert(null)
          navigate(`/members/${sender?.id}`)
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
          
        }else if(item?.type === 'nikah') {
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          navigate(`/nikah/${sender?.id}`)
          setAlert(null)
        }else {
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
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
                <img src={sender?.photo || process.env.PUBLIC_URL + sender?.avatar} />
            </div>
            <div className="activies_inner_body">
                <h4>{sender?.name || sender?.username}</h4><span>{item?.action}</span>
                <small className='q_date'>{moment(item?.createdAt.seconds * 1000).format('MMM Do YY, LT') }</small>
            </div>            
        </div>
        <button className='btn_alert' onClick={() =>updateDoc(doc(db, 'notifics', `${item.id}`), {isSeen: true})}><GrClose/></button>
    </div>
  )
}

export default AlertCard
