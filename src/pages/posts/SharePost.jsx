import React from 'react'
import './posts.css'
import me from '../../assets/images/img8.jpg'
import {  BsCardImage, BsPaperclip, BsCaretRightSquareFill, BsSoundwave, BsFillShareFill } from "react-icons/bs";

const SharePost = () => {
  return (
    <div className="share_post">
        <div className="share_info">
            <div className="share_photo">
                <img src={me} alt="" />
            </div>
            <div className="share_details">
                <div className="share_text">
                    <input type="text" placeholder='Unataka kuwaambia nini Waislamu?' className='sel_input'/>
                    
                </div>
                <div className="share_action">
                     <div className="share_others">
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
                    </div>
                    <button className='btn_sign'><BsFillShareFill/></button>
                </div>
               
            </div>
            
        </div>
      
    </div>
  )
}

export default SharePost