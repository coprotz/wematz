import React from 'react'
import './posts.css'
import SharePost from '../posts/SharePost';
import PostCard from '../posts/PostCard';
import VideoCard from '../posts/VideoCard';
import AudioPlayer from '../posts/AudioPlayer';
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import NikahCard from '../nikah/NikahCard';
import MadaCard from '../mada/MadaCard';
import MeetingCard from '../meetings/MeetingCard';
import Remarks from '../../components/remarks/Remarks';
import {  BsArrowRight } from "react-icons/bs";
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import img6 from '../../assets/images/img6.jpg'
import img7 from '../../assets/images/img7.jpg'
import img9 from '../../assets/images/img9.jpg'


const nikahs = [
  {name: 'Asha Juma', url: img1,  live: 'Tanga', tribe: 'Zaramo', age:'25'},
  {name: 'Juma Rashid', url: img2,  live: 'Moshi', tribe: 'Haya', age:'30'},
  {name: 'Mwana Achi', url: img3,  live: 'Kisarawe', tribe: 'Fipa', age:'18'},
  {name: 'Haruna Shani', url: img4,  live: 'Dar es Salaam', tribe: 'Ruguru', age:'40'},
  {name: 'Shykuru Hamisi', url: img5,  live: 'Zanzibar', tribe: 'Pare', age:'55'},
  {name: 'Mwanaisha Abdul', url: img6,  live: 'Pemba', tribe: 'Sukuma', age:'27'},
  {name: 'Hamisa Mbeto', url: img7,  live: 'Mbeya', tribe: 'Hehe', age:'80'},
  {name: 'Bob Marley', url: img9,  live: 'Iringa', tribe: 'Chaga', age:'12'},
]




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
            {/* <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>            
                <h4>Machapisho</h4>
            </div> */}
            {/* <div className="create_new">
                Changia
            </div>        */}
        </div>
        <div className="posts_wrapper">
          <div className="posts_inner">
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
          <div className="main_right">
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Ukumbi wa Nikah
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>                          
                            <div className="nikah_imgs">
                              {nikahs && nikahs.map((item, index) => (
                                <NikahCard key={index} item={item}/>
                              ))}
                            </div>
                            
                           
                        </div>
                        <div className="donate" onClick={() =>navigate('/subscriptions')}>
                            Tuunge Mkono
                            <button className='btn_next'><BsArrowRight/></button>
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Mada ya Wiki
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>                            
                            <MadaCard/>
                            
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Mikutano
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>
                                
                            <div className="meeting_grids">
                               <MeetingCard/>
                               <MeetingCard/>
                               {/* <MeetingCard/> */}
                              
                            </div>
                            
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Swali Maarufu 
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>
                           
                            <div className="help">
                                <div className="help_sender">
                                    <img src={img7} alt="" />
                                </div>
                                <div className="help_text">
                                  <h4>Je Yafaa kuswali bila udhu?</h4> 
                                  <small>12 June 2022</small> 
                                </div>
                                
                            </div>
                            <Remarks/>
                            
                        </div>
                </div>
        </div>
             
    </div>
  )
}

export default Posts