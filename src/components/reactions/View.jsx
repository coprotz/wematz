import React from 'react'
import { GrView } from "react-icons/gr";

const View = () => {
  return (
    <div className='btn_members likes'>      
        <span>25</span>
        <div className="likes_action">
            <GrView/>
        </div>
    </div>
  )
}

export default View
