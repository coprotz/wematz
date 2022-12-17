import React from 'react'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
// import { users } from '../../data'
import useData from '../../hooks/useData'
import { useState } from 'react'
import Reviews from '../../components/reviews/Reviews'
import Loading from '../../components/loading/Loading'



const ImageCard = ({p}) => {
    const { users } = useData()
    const user = users?.find(u => u.id === p?.userId)
    const [show, setShow] = useState(null)
    // console.log('user', users)
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
        {p?.pic ?
        <div className="card_image">
            <img src={p?.pic} alt="" />
        </div>
        :
        <div className="card_image">
            <Loading/>
        </div>}
        <Remarks p={p} setShow={setShow}/>
        {show &&
        <Reviews doc={p} setShow={setShow}/>
        }
    </div>
  )
}


export default ImageCard
