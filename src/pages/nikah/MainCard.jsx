import React from 'react'
import Likes from '../../components/reactions/Likes'
import { useNavigate } from 'react-router-dom'
import NewChat from '../messages/NewChat'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";



const MainCard = ({id, handelNew}) => {
    const navigate = useNavigate();
    const { marriages, users, likes } = useData()
    const item = marriages.find(m => m.id === id)
    const { user } = useAuth()
    const myid = marriages.find(m => m.userId === user.uid)
    // const mary = marriages.find(m => m.userId === user.uid)
    const mylikes = likes.filter(l => l.user_id === myid?.id)

    const isLike = mylikes.find(m => m.target_id === id)
    console.log('isLike', isLike)

  return (
    <div className="nikah_card">
        <div className="nikah_img">
            <img src={item?.photo} alt="" />
        </div>
        <div className="nikah_main_info">
            <div className="nikah_info">
                <h4>{item?.username}, {item?.age}</h4>
                <div className="nikah_loc">
                    <span>{item?.tribe} -</span>
                    <span> {item?.location}</span>
                </div>
            </div>                       
            <div className="meetings_actions">
                {!isLike &&                     
                <button className='btn_btn'><Likes p={item} myId={myid?.id}/></button>}
                <button onClick={() =>navigate(`/nikah/${item.id}`)} className='btn_btn'><BsFillPersonFill/></button>
                {/* <NewChat item={item} myId={myid?.id}/>  */}
                <button className='btn_btn' onClick={() =>handelNew(item)}><BsChatLeftDotsFill/></button>       
            </div>
        </div>
    </div>
  )
}

export default MainCard
