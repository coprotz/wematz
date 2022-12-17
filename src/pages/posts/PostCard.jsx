import React from 'react'
// import img10 from '../../assets/images/img10.jpg'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
import useData from '../../hooks/useData'
import Reviews from '../../components/reviews/Reviews'
import { useState } from 'react'

const PostCard = ({p}) => {
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
                     <h5 className='author_name'>{user?.name}</h5>
                     <small className='timeago'>{moment(p?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
                </div>
               
            </div>
            <div className="post_time">
                
            </div>
        </div>
        <div className="card_body">
            <p>{p?.tex}</p>
        </div>
        <Remarks p={p} setShow={setShow}/>
        {show &&
        <Reviews doc={p} setShow={setShow}/>
        }
    </div>
  )
}

export default PostCard