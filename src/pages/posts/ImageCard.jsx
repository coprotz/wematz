import React from 'react'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
// import { users } from '../../data'
import useData from '../../hooks/useData'

const ImageCard = ({p}) => {
    const { users } = useData()
    const user = users?.find(u => u.id === p?.userId)
    // console.log('user', users)
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
        <div className="card_image">
            <img src={p?.pic} alt="" />
        </div>
        <Remarks p={p}/>
    </div>
  )
}


export default ImageCard
