import React from 'react'
import img8 from '../../assets/images/img8.jpg'
import fatha from '../../assets/audio/fatha.mp3'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
import useData from '../../hooks/useData'
// import {  BsCaretRightFill } from "react-icons/bs";


const AudioPlayer = ({p}) => {
    // const [perc, setPerc] = useState(0)
    // console.log('perc', perc)

    const { users } = useData()
    const user = users?.find(u => u.id === p?.userId)
   
  return (
    <div className='post_card'>
    <div className="post_top">
        <div className="post_card_user">
            <div className="card_user_photo">
                <img src={user?.photo} alt="" />
            </div>
            <div className="card_username">
                 <h5>{user?.fname+" "+user?.lname}</h5>
                 <small className='timeago'>{moment(p?.createdAt?.toDate()).fromNow(true)}</small>
            </div>
           
        </div>
        <div className="post_time">
            
        </div>
    </div>
    <div className="card_player">
        <div className="audio_player">           
            <audio src={p?.clip} controls></audio>
        </div>   

    </div>
    <Remarks p={p}/>
</div>
  )
}

export default AudioPlayer