import React from 'react'
import './posts.css'
import SharePost from '../posts/SharePost';
import PostCard from '../posts/PostCard';
import VideoCard from '../posts/VideoCard';
import AudioPlayer from '../posts/AudioPlayer';
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';



const Posts = () => {
  const navigate = useNavigate();
    const scrollRef = React.useRef(null);
    React.useLayoutEffect(() => {
        if(scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      })

  return (
    <div className="posts" ref={scrollRef}>
        <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>            
                <h4>Posts</h4>
            </div>
            {/* <div className="create_new">
                Changia
            </div>        */}
        </div>
        <SharePost/>
        <motion.div 
             initial={{ y:'100vw'}}
             animate={{y:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
        className="post_grids">
            <PostCard/>
            <VideoCard/>
            <PostCard/>
            <AudioPlayer/>
            <PostCard/>
        </motion.div>       
    </div>
  )
}

export default Posts