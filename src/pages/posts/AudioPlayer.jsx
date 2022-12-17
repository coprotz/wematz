import React from 'react'
// import img8 from '../../assets/images/img8.jpg'
// import fatha from '../../assets/audio/fatha.mp3'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
import useData from '../../hooks/useData'
import { useState } from 'react'
import Reviews from '../../components/reviews/Reviews'

// import {  BsCaretRightFill } from "react-icons/bs";


const AudioPlayer = ({p}) => {
    // const [perc, setPerc] = useState(0)
    // console.log('perc', perc)

    const { users } = useData()
    const user = users?.find(u => u.id === p?.userId)
    const [show, setShow] = useState(null)
   
  return (
    <div className='post_card'>
    <div className="post_top">
        <div className="post_card_user">
            <div className="card_user_photo">
                <img src={user?.photo? user?.photo : process.env.PUBLIC_URL + user?.avatar} alt="" />
            </div>
            <div className="card_username">
                 <h4 className='author_name'>{user?.name}</h4>
                 <small className='timeago'>{moment(p?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
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
    <Remarks p={p} setShow={setShow}/>
    {show &&
    <Reviews doc={p} setShow={setShow}/>
    }
</div>
  )
}

export default AudioPlayer