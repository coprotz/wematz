import React from 'react'
import { useState } from 'react'
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import './reactions.css'

const Likes = () => {
    const [like, setLike] = useState(null)
  return (
    <div className='btn_members likes'>      
        <span>25</span>
        <div className="likes_action">
            {like? <FcLike/> : <FcLikePlaceholder/>}
        </div>
    </div>
  )
}

export default Likes
