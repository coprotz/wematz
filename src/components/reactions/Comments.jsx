import React from 'react'
import { FaRegCommentDots } from "react-icons/fa";

const Comments = () => {
  return (
    <div className='btn_members likes'>      
        <span>25</span>
        <div className="likes_action">
            <FaRegCommentDots/>
        </div>
    </div>
  )
}

export default Comments
