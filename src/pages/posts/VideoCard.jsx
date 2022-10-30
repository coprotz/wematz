import React from 'react'
import ReactPlayer from 'react-player'
import Remarks from '../../components/remarks/Remarks'
import img9 from '../../assets/images/img9.jpg'
import moment from 'moment'
import useData from '../../hooks/useData'


const VideoCard = ({p}) => {

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
                <h5 className='author_name'>{user?.fname+" "+user?.lname}</h5>
                <small className='timeago'>{moment(p?.createdAt?.toDate()).fromNow(true)}</small>
              </div>
             
          </div>
          <div className="post_time">
              
          </div>
      </div>
      <div className='home_video'>
        <div className="home_video_player">
            <ReactPlayer
                url={p?.url}
                width='100%'
                height='100%'
                controls={true}            
            />
        </div>
       
    </div>
      <Remarks p={p}/>
  </div>
  )
}

export default VideoCard