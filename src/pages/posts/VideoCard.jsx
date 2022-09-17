import React from 'react'
import ReactPlayer from 'react-player'
import Remarks from '../../components/remarks/Remarks'
import img9 from '../../assets/images/img9.jpg'


const VideoCard = () => {
  return (
  
      <div className='post_card'>
      <div className="post_top">
          <div className="post_card_user">
              <div className="card_user_photo">
                  <img src={img9} alt="" />
              </div>
              <div className="card_username">
                   <h5>Juma Mbaga</h5>
                   <small>12 March 2022</small>
              </div>
             
          </div>
          <div className="post_time">
              
          </div>
      </div>
      <div className='home_video'>
        <div className="home_video_player">
            <ReactPlayer
                url='https://www.youtube.com/watch?v=J8juV2ZHaLc'
                width='100%'
                height='100%'
                controls={true}            
            />
        </div>
       
    </div>
      <Remarks/>
  </div>
  )
}

export default VideoCard