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
import { db, messaging, useAuth } from '../../hooks/useAuth';
import DeleteConfirm from '../../components/confirm/DeleteConfirm';
import AlertSms from '../../components/alert/AlertSms';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { onMessageListener } from '../../firebase';
// import firebase from '../../hooks/useAuth';





const Posts = () => {
  const navigate = useNavigate();
    const scrollRef = React.useRef(null);
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [image, setImage] = useState(false)
    const { user, getToken } = useAuth()
    const { posts, users, questions, marriages, madas } = useData();
    const cuUser = users?.find(u => u.id === user.uid)
    const [confirm, setConfirm] = useState(null)
    const [messageAlert, setAlert] = useState(null)

    // const [isTokenFound, setTokenFound] = useState(false);
    // getToken(setTokenFound);

    
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

    

    // const [userRespond, setUserRespond] = useState(false)
    // const [show, setShow] = useState(false);
    // const [notification, setNotification]=useState({title:"",body:""});
    // onMessageListener()
    // .then((payload) => {
    //     setShow(true);
    //     setNotification({
    //         title: payload.notification.title,
    //         body: payload.notification.body,
    //     });
    //     console.log(payload);
    // })
    // .catch((err) => console.log("failed: ", err));


    // const [isTokenFound, setTokenFound] = useState(false);                
    // console.log("Token found", isTokenFound);
    // useEffect(() => {
    //   let data;
    //   async function tokenFunc() {
    //     data = await getToken(setTokenFound);
    //     if (data) {
    //       console.log("Token is", data);
    //     }
    //     return data;
    //   }
    //   tokenFunc();
    // }, [setTokenFound]);

    const newQue = questions?.at(-1)
    const newMada = madas?.at(-1)

    // console.log('new', newQue)
   

   

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
                    {users?.slice(-7).map(u => (
                        <div className="new_user" key={u.id}>
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
                    {marriages && marriages.filter(m =>m.gender !== cuUser?.gender).slice(-5).map((item, index) => (
                      <NikahCard key={index} item={item}/>
                     ))}
                </div>       
                </div>
                {/* <div className="donate" onClick={() =>navigate('/subscriptions')}>
                    Tuunge Mkono
                    <button className='btn_next'><BsArrowRight/></button>
                </div>                */}
                  
                <div className="main_right_item" >            
                  <h3 className="card_title">
                      Mada ya Wiki
                      <button className='btn_view' onClick={() =>navigate(`/madas/${newMada?.id}`)}><BsArrowRight/></button>
                  </h3>                            
                  <MadaCard m={newMada}/>
                </div>
                <div className="main_right_item" key={newQue?.id}>
                  <h3 className="card_title">
                    Swali Jipya 
                    <button className='btn_view' onClick={() =>navigate(`/questions/${newQue?.id}`)}><BsArrowRight/></button>
                  </h3>
                  <div className="help" key={newQue?.id}>
                    <div className="help_sender">
                      <img src={newQue?.photo} alt="" />
                    </div>
                    <div className="help_text">
                        <h4>{newQue?.que}</h4> 
                        <span className='timeago'>{moment(newQue?.createdAt?.toDate()).fromNow(true)}</span>
                    </div>
                                    
                  </div>
                  <Remarks p={newQue}/>                                
                </div>
            </div>
        </div>
             
    </div>
  )
}

export default Posts