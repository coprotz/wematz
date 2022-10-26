import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";

const CreateReview = ({title}) => {
    const [message, setMessage] = useState('')
  return (
    <div className="review_share">
        <div className="share_text">
            <input 
                type="text" 
                placeholder={title}
                className='sel_input'
                style={{width:'100%'}}
                name='message'
                onChange={(e) =>setMessage(e.target.value)}
                />
            
        </div>
        <div className="share_action">
            {/* <div className="share_others">
                <button className='btn_btn'>
                    <BsCardImage/>
                </button>               
                <buttton className='btn_btn'>
                    <BsCaretRightSquareFill/>
                </buttton>
                <buttton className='btn_btn'>
                    <BsPaperclip/>
                </buttton>
                <buttton className='btn_btn'>
                    <BsSoundwave/>
                </buttton>
            </div> */}
            <button 
                className='btn_sign'
                disabled={!message}
                ><BsFillShareFill/></button>
        </div>
    
</div>
  )
}

export default CreateReview
