import React from 'react'
import './posts.css'
import me from '../../assets/images/img8.jpg'
import {  BsCardImage, BsPaperclip, BsCaretRightSquareFill, BsSoundwave, BsFillShareFill } from "react-icons/bs";
import { useState } from 'react';

const SharePost = () => {
    const [message, setMessage] = useState('')
  return (
    <div className="share_post">
        <div className="share_info">
            {/* <div className="share_photo">
                <img src={me} alt="" />
            </div> */}
            <div className="share_details">
                <div className="share_text">
                    <input 
                        type="text" 
                        placeholder='Unataka kuwaambia nini WanaWema?' 
                        className='sel_input'
                        name='message'
                        style={{width:'100%'}}
                        onChange={(e) =>setMessage(e.target.value)}
                    /> 
                    {!message &&                  
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
                    </div>}
                    
                    <button 
                    className='btn_sign'
                    style={{minWidth: '70px', height: '50px'}}
                    disabled={!message}
                    ><BsFillShareFill/></button>
                </div>
               
            </div>
            
        </div>
      
    </div>
  )
}

export default SharePost