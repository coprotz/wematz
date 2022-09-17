import React from 'react'
import img10 from '../../assets/images/img10.jpg'
import Remarks from '../../components/remarks/Remarks'

const PostCard = () => {
  return (
    <div className='post_card'>
        <div className="post_top">
            <div className="post_card_user">
                <div className="card_user_photo">
                    <img src={img10} alt="" />
                </div>
                <div className="card_username">
                     <h5>Maher Zahir</h5>
                     <small>12 March 2022</small>
                </div>
               
            </div>
            <div className="post_time">
                
            </div>
        </div>
        <div className="card_body">
            <p>With modern browsers supporting the full spectrum of 24-bit color, there are 16,777,216 different color
                 possibilities. Use our color picker to explore all 16.7 million of them, or if that’s too many, check
                  out our color charts for a selection of palettes focused on flat design, Material design and web safe colors.
            </p>
        </div>
        <Remarks/>
    </div>
  )
}

export default PostCard