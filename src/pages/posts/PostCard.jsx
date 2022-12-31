import React from 'react'
// import img10 from '../../assets/images/img10.jpg'
import Remarks from '../../components/remarks/Remarks'
import moment from 'moment'
import useData from '../../hooks/useData'
import Reviews from '../../components/reviews/Reviews'
import { useState } from 'react'
import Loading from '../../components/loading/Loading'
import ReactPlayer from 'react-player'
import { RiDeleteBinFill } from "react-icons/ri";
import { db, useAuth } from '../../hooks/useAuth'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const PostCard = ({p, setConfirm}) => {
    const { users } = useData()
    const { user } = useAuth()
    const cuUser = users?.find(u => u.id === user.uid)
    const author = users?.find(u => u.id === p?.userId)
    const [show, setShow] = useState(null)
    const navigate = useNavigate()
    

    const RenderPost = () => {
        const { type } = p
        if(type === 'image') {
            return (
                <div className="card_image">
                    {p?.pic ? 
                        <img src={p?.pic} alt="" /> :
                        <Loading/>}
                </div>
             
            )
        }else if(type === 'text') {
            return (
                <div className="card_body">
                    <p>{p?.tex}</p>                   
                </div>
            )
        }
        else if(type === 'video'){
            return (
                <div className="home_video_player">
                    <div className="video">
                        <video className='shared_video_2' controls>
                            <source src={p?.url} type="video/mp4"/>
                        </video>                   
                    </div>                    
                    <h4 className='video_caption'>{p?.caption}</h4>
                </div>
            )
        }
        else if(type === 'audio'){
            return (
                <div className="card_player">
                    <div className="audio_player">           
                        <audio src={p?.clip} controls></audio>
                        <h4 className='video_caption'>{p?.caption}</h4>
                    </div>   

                </div>
            )
        }else {
            return (
                <div className="home_video_player">
                    <Loading/>
                </div>
            )
        }
    }

  

  return (
    <div className='post_card'>
        <div className="post_top">
            <div className="post_card_user">
                <div className="card_user_photo">
                {author?.photo ? <img src={author?.photo} alt="" />: 
                <div 
                    className='avatar2'
                    style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, height:'35px', width:'35px'}}
                    >{author?.name[0]}
                </div>
                } 
                    {/* <img src={author?.photo? author?.photo : process.env.PUBLIC_URL + author?.avatar} alt="" /> */}
                </div>
                <div className="card_username">
                     <h5 className='author_name' onClick={() =>navigate(`/members/${author.id}`)}>{author?.name}</h5>
                     <small className='timeago'>{moment(p?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
                </div>
                {cuUser?.isAdmin == true &&
                <button className='btn_del' onClick={() => setConfirm(p.id)}><RiDeleteBinFill/></button>}
               
            </div>          
        </div>
        {RenderPost()}
        <Remarks p={p} setShow={setShow} type='post' />
        {show &&
        <Reviews doc={p} setShow={setShow} type='post'/>
        }
    </div>
  )
}

export default PostCard