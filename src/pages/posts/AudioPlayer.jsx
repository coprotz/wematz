import React from 'react'
import img8 from '../../assets/images/img8.jpg'
import fatha from '../../assets/audio/fatha.mp3'
import Remarks from '../../components/remarks/Remarks'
// import {  BsCaretRightFill } from "react-icons/bs";


const AudioPlayer = () => {
    // const [perc, setPerc] = useState(0)
    // console.log('perc', perc)
   
  return (
    <div className='post_card'>
    <div className="post_top">
        <div className="post_card_user">
            <div className="card_user_photo">
                <img src={img8} alt="" />
            </div>
            <div className="card_username">
                 <h5>Juma Mbaga</h5>
                 <small>12 March 2022</small>
            </div>
           
        </div>
        <div className="post_time">
            
        </div>
    </div>
    <div className="card_player">
        <div className="audio_player">           
            <audio src={fatha} controls></audio>
        </div>   

    </div>
    <Remarks/>
</div>
  )
}

export default AudioPlayer