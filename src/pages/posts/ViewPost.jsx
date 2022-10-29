import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import moment from 'moment'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import ReactPlayer from 'react-player'
import Reviews from '../../components/reviews/Reviews';

const ViewPost = () => {
    const { id } = useParams()
    const { posts, users } = useData()
    const post = posts?.find(p => p.id === id)
    const user = users?.find(u => u.id === post?.userId)
    const navigate = useNavigate()

    const RenderItem = () => {
        if(post?.type === 'image'){
            return (
                <div className="card_image">
                    <img src={post?.pic} alt="" />
                </div>
            )
        }else if(post?.type === 'video'){
            return (
                <div className='home_video'>
                <div className="home_video_player" style={{minHeight: '40vw'}}>
                    <ReactPlayer
                        url={post?.url}
                        width='100%'
                        height='100%'
                        controls={true}            
                    />
                </div>
               
            </div>
            )
        }else if(post?.type === 'audio'){
            return (
                <div className="card_player">
                    <div className="audio_player">           
                        <audio src={post?.clip} controls></audio>
                    </div>   
        
            </div>
            )
        }else if(post?.type === 'text'){
            return (
                <div className="card_body">
                    <p>{post?.tex}</p>
                </div>
            )
        }
    }

    // console.log('post', post)
  return (
    <div className='view_post'>
        <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_back'><HiOutlineArrowLeft/>Rudi Nyuma</button>
        </div>
        <div className="post_card_user">
            <div className="card_user_photo">
                <img src={user?.photo} alt="" />
            </div>
            <div className="card_username" style={{marginTop: '10px', marginBottom: '10px'}}>
                <h5>{user?.fname+" "+user?.lname}</h5>
                <small className='timeago'>{moment(post?.createdAt?.toDate()).fromNow(true)}</small>
            </div>
               
        </div>
        <div className="view_post_bofy">
            {RenderItem()}
        </div>
        <div className="view_post_comments">
            <Reviews doc={post}/>
        </div>
      
    </div>
  )
}

export default ViewPost
