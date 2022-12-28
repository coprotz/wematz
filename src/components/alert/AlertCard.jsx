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
import { RiMessage3Fill, RiAccountPinBoxFill, RiArticleFill, RiImage2Fill } from "react-icons/ri";




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

    // console.log('sender', sender)

    const handleNavigate = async () => {
        
        if(item?.type === 'message'){
          setAlert(null)
          navigate('/messages')
          dispatch({ type: "CHANGE_USER", payload: data })
          setActive(true)
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
        }else if(item?.type === 'post'){
          navigate('/')
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})          
          setAlert(null)
        }else if(item?.type === 'follow'){
          navigate(`/members/${sender?.id}`)
          setAlert(null)         
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
          
        }else if(item?.type === 'nikah') {
          navigate(`/nikah/${sender?.id}`)
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
          setAlert(null)
        }else if(item?.type === 'que') {
          navigate(`/questions/${item?.type_id}`)
          await updateDoc(doc(db, 'notifics', `${item?.id}`), {isSeen: true})
          
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

    // console.log('item', item)

    // useEffect(() => {             
    //    if(Notification.permission !== "denied") {
    //       Notification.requestPermission().then((permission) => {                      
    //         if(permission === "granted" ){
    //             new Notification("Wema Forum", {
    //             body: `${sender?.name || sender?.username+" "+item?.action}`,
    //             icon: "logo_512.png",
    //             tag: `${item?.uid}`

    //           })
    //         }
    //       })
            
        
          
    //     }
    //   }, [item?.id])

    // const today = new Date().getTime()
  return (
    <div className="alert_card">    
        <div className="alert_card_wrapper" >
          <div className="alert_card_top">
            {item?.type === 'follow'? <RiAccountPinBoxFill/> : item?.type === 'message'? <RiMessage3Fill/> :<RiArticleFill/> }
            
            <h4 className='alert_card_title'>{item.type}</h4>
            <h3>-</h3>
            <span>{moment(item?.createdAt.toDate()).fromNow(true)}</span>
          </div>
          <div className="alert_card_body">
            <div className="alert_card_left">
              <h4>{sender?.name || sender?.username}</h4>
              {item?.cat === 'image' ? <div className='image_last'><RiImage2Fill/></div>  :
              <span>{item?.action}</span>}
            </div>
            <div className="alet_card_photo">
                <img src={sender?.photo || process.env.PUBLIC_URL + sender?.avatar} />
            </div>
          </div>
          <div className="alert_card_footer">           
            <button  onClick={handleNavigate} style={{backgroundColor:'#e1e1e1'}}>{item?.type === 'message'? 'JIBU' : 'ANGALIA'}</button>
            <button onClick={() =>updateDoc(doc(db, 'notifics', `${item.id}`), {isSeen: true})}>ONDOA</button>
          </div>                     
        </div>
        
    </div>
  )
}

export default AlertCard
