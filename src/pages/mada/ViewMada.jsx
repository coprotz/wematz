import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import parser from 'html-react-parser'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment';
import {GrClose } from "react-icons/gr";
import Reviews from '../../components/reviews/Reviews'


const ViewMada = () => {
    const { id } = useParams()    
    const { madas, users } = useData()
    const mada = madas.find(m => m.id === id)
    const { user } = useAuth()
    const author = users.find(u => u.id === mada?.uid)
    const navigate = useNavigate() 
    
  return (
    <div className='view_mada'>
        <div className="author_photo">
            <img src={author?.photo} alt="" />
        </div>
        <div className="mada_contents">
            <div className="mada_author_wrapper">
                <div className="mada_top_auth">               
                    <span>{moment(mada?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</span>
                    <h3 className='author_name'>{author?.name}</h3>                
                </div>
                <button className='btn_btn' onClick={() => navigate(-1)}><GrClose/></button>
            </div>
            
            <h1 className='mada_heading'>{mada?.title}</h1>
            <p className='mada_main_body'>{parser(`${mada?.body}`)}</p>
            <div className="view_post_comments">
                <Reviews doc={mada}/>
            </div>
        </div>
        

      
    </div>
  )
}

export default ViewMada
