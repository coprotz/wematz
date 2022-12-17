import React from 'react'
import ReactPlayer from 'react-player'
import Remarks from '../../components/remarks/Remarks'
import img9 from '../../assets/images/img9.jpg'
import moment from 'moment'
import useData from '../../hooks/useData'
import { useState } from 'react'
import Reviews from '../../components/reviews/Reviews'
import Loading from '../../components/loading/Loading'




const VideoCard = ({p}) => {

  const { users } = useData()
  const user = users?.find(u => u.id === p?.userId)
  const [show, setShow] = useState(null)

  return (
  
      <div className='post_card'>
      <div className="post_top">
          <div className="post_card_user">
              <div className="card_user_photo">
                <img src={user?.photo || process.env.PUBLIC_URL + user?.avatar} alt="" />
              </div>
              <div className="card_username">
                <h5 className='author_name'>{user?.name}</h5>
                <small className='timeago'>{moment(p?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
              </div>
             
          </div>
          <div className="post_time">
              
          </div>
      </div>
      <div className='home_video'>
        {p?.url ?
        <div className="home_video_player">
            <ReactPlayer
                url={p?.url}
                width='100%'
                height='100%'
                controls={true}            
            />
        </div>:
        <div className="home_video_player">
          <Loading/>
        </div>}
       
    </div>
    <Remarks p={p} setShow={setShow}/>
      {show &&
      <Reviews doc={p} setShow={setShow}/>
      }
  </div>
  )
}

export default VideoCard