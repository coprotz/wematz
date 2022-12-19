import React from 'react'
import './posts.css'
import SharePost from '../posts/SharePost';
import PostCard from '../posts/PostCard';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import NikahCard from '../nikah/NikahCard';
import MadaCard from '../mada/MadaCard';
import Remarks from '../../components/remarks/Remarks';
import {  BsArrowRight } from "react-icons/bs";
import useData from '../../hooks/useData';
import ShareVideo from './ShareVideo';
import { useState } from 'react';
import ShareAudio from './ShareAudio';
import ShareImage from './ShareImage';
import moment from 'moment'
import Search from '../../components/search/Search';
import { db, useAuth } from '../../hooks/useAuth';
import DeleteConfirm from '../../components/confirm/DeleteConfirm';
import AlertSms from '../../components/alert/AlertSms';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';





const Posts = () => {
  const navigate = useNavigate();
    const scrollRef = React.useRef(null);
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [image, setImage] = useState(false)
    const { user } = useAuth()
    const { posts, users, questions, marriages, madas } = useData();
    const cuUser = users?.find(u => u.id === user.uid)
    const [confirm, setConfirm] = useState(null)
    const [messageAlert, setAlert] = useState(null)

    // console.log('user', user?.displayName)
   

    React.useLayoutEffect(() => {
        if(scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      })

      useEffect(() => {
        try {
            updateDoc(doc(db, 'users', `${user.uid}`), { isOnline: true})
        } catch (error) {
            console.log(error.message)
        }
      },[])

    const [userRespond, setUserRespond] = useState(false)

      useEffect(() => {     
        const  notifyUser = async (text='Asante kwa kuruhusu notification kutoka Wema') => {
            if(!("Notification" in window)) {
                alert("Browser does not support notifications");
            }else if(Notification.permission === 'granted'){
                const notification = new Notification(text);
            }else if(Notification.permission !== 'denied') {
                Notification.requestPermission().then((permission) => {
                    if(permission === 'granted') {
                        const notification = new Notification(text)
                    }
                })
            }
        } 
        notifyUser()
    },[])

    // const notifyuser = () => {
    //     setUserRespond(true)
    //     notifyUser()
    // }
      

  return (
    <div className="posts" ref={scrollRef}> 
        {video && <ShareVideo setVideo={setVideo}/> }   
        {audio && <ShareAudio setAudio={setAudio}/> }   
        {image && <ShareImage setImage={setImage}/> } 
        {confirm && <DeleteConfirm setConfirm={setConfirm} id ={confirm} body='Unataka kuifuta posti hii...?' setAlert={setAlert}/> }
        {messageAlert && <AlertSms alert={messageAlert}/>} 
        {/* {!(userRespond) && !(Notification.permission === 'granted') && <div className='notifs'><button onClick={notifyuser}>Ask</button></div>}         */}
        <div className="posts_wrapper">
          <div className="posts_inner">
            <div className="posts_cont">
                <SharePost setVideo={setVideo} setAudio={setAudio} setImage={setImage}/> 
                <Search title='Tafuta Chapisho'/>  
            </div>
                   
              <motion.div 
                  initial={{ y:'100vw'}}
                  animate={{y:0}} 
                  transition={{ ease: "easeOut", duration: 0.5 }} 
                  className="post_grids">
                    {posts?.map(p => (
                      <PostCard p={p} key={p.id} setConfirm={setConfirm}/>
                    ))}
               </motion.div> 
          </div>
          <div className="main_right">
            <div className="main_right_item">
                <h3 className="card_title">
                    Waliojiunga Punde
                    <button className='btn_view' onClick={() =>navigate('/members')}><BsArrowRight/></button>
                </h3>
                                
                <div className="new_users">
                    {users?.slice(0,7).map(u => (
                        <div className="new_user">
                            <img src={u.photo || process.env.PUBLIC_URL + u?.avatar} alt="" />
                        </div>
                    ))}                              
                </div>
                            
                </div>
            <div className="main_right_item">
                <h3 className="card_title">
                    Ukumbi wa Nikah
                    <button className='btn_view' onClick={() =>navigate('/nikah')}><BsArrowRight/></button>
                </h3>                          
                <div className="nikah_imgs">
                    {marriages && marriages.filter(m =>m.gender !== cuUser?.gender).slice(0,5).map((item, index) => (
                    <NikahCard key={index} item={item}/>
                     ))}
                </div>       
                </div>
                <div className="donate" onClick={() =>navigate('/subscriptions')}>
                    Tuunge Mkono
                    <button className='btn_next'><BsArrowRight/></button>
                </div>

                
                    {madas?.slice(0,1).map(m => (
                    <div className="main_right_item" key={m.id}>            
                        <h3 className="card_title">
                            Mada ya Wiki
                            <button className='btn_view' onClick={() =>navigate(`/madas/${m.id}`)}><BsArrowRight/></button>
                        </h3>                            
                        <MadaCard m={m}/>
                    </div>

                    ))}
                            
                             
                {questions.slice(0,1).map(q => (
                    <div className="main_right_item" key={q.id}>
                        <h3 className="card_title">
                            Swali Maarufu 
                            <button className='btn_view' onClick={() =>navigate(`/questions/${q.id}`)}><BsArrowRight/></button>
                        </h3>
                        <div className="help" key={q.id}>
                            <div className="help_sender">
                                <img src={q.photo} alt="" />
                            </div>
                            <div className="help_text">
                                <h4>{q.que}</h4> 
                                <span className='timeago'>{moment(q?.createdAt?.toDate()).fromNow(true)}</span>
                            </div>
                                    
                        </div>
                        <Remarks p={q}/>                                
                    </div>
                ))}
                           
                            
                        
                </div>
        </div>
             
    </div>
  )
}

export default Posts