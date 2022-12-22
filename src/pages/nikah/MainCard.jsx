import React from 'react'
import Likes from '../../components/reactions/Likes'
import { useNavigate } from 'react-router-dom'
import NewChat from '../messages/NewChat'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'



const MainCard = ({id, handelNew, type}) => {
    const navigate = useNavigate();
    const { marriages, users, likes, views } = useData()
    const item = marriages.find(m => m.id === id)
    const { user } = useAuth()
    const myid = marriages.find(m => m.userId === user.uid)?.id
    // const mary = marriages.find(m => m.userId === user.uid)
    const mylikes = likes.filter(l => l.user_id === myid)

    const isLike = mylikes.find(m => m.target_id === id)
    // console.log('isLike', isLike)

    const notificRef = collection(db, 'notifics')
    const viewsRef = collection(db, 'views')
    const viewed_them = views?.filter(v => v.user_id === myid)
    // const exitChat = chats?.find(c => c.id === id)

    // console.log('viewed_them', viewed_them)
    // console.log('id', id)

    const exitView = viewed_them?.find(v=> v.target_id === id)

    const newNotific = {
      target_id: id,
      uid: myid,
      action: 'ameangalia profile yako',
      type,
      type_id: id,
      isSeen: false,
      createdAt: serverTimestamp()
    }

    const data = {
        target_id : id,
        user_id: myid,
        viewedAt: serverTimestamp()
    }

    const handleView = async () => {
        if(!exitView){
            await addDoc(viewsRef, data)
            await addDoc(notificRef, newNotific) 
            navigate(`/nikah/${item.id}`)
        }else{
            navigate(`/nikah/${item.id}`)
        }
       
    }

  return (
    <div className="nikah_card">
        <div className="nikah_img">
            <img src={item?.photo} alt="" />
        </div>
        <div className="nikah_main_info">
            <div className="nikah_info">
                <h4>{item?.username || item?.name}, {item?.age}</h4>
                <div className="nikah_loc">
                    <span>{item?.tribe} -</span>
                    <span> {item?.location}</span>
                </div>
            </div>                       
            <div className="meetings_actions">
                {!isLike &&                     
                <button className='btn_btn'><Likes p={item} myId={myid} type='nikah'/></button>}
                <button onClick={handleView} className='btn_btn'><BsFillPersonFill/></button>
                {/* <NewChat item={item} myId={myid?.id}/>  */}
                {/* <button className='btn_btn' onClick={() =>handelNew(item)}><BsChatLeftDotsFill/></button>        */}
            </div>
        </div>
    </div>
  )
}

export default MainCard
