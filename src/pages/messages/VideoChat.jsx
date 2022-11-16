import React, { useRef, useEffect, useState } from 'react'
// import Peer from 'simple-peer'
import { Peer } from 'peerjs'
import { io } from 'socket.io-client'
import AgoraRTM from "agora-rtm-sdk"
import { useAuth } from '../../hooks/useAuth'
import { BsBell, BsCameraVideo, BsThreeDotsVertical } from 'react-icons/bs';
import { HiPhoneMissedCall, HiOutlinePhoneMissedCall } from 'react-icons/hi';
import useData from '../../hooks/useData'

const socket = io.connect('https://wema-tz.herokuapp.com/')


const VideoChat = ({myname, memberId, setReceivingCall, receivingCall, roomId}) => {
    const { user } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user.uid)



    const userId = user.uid

    const myPeer = new Peer(undefined);

    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    
    const [caller, setCaller] = useState("")
    const [ callerSignal, setCallerSignal ] = useState(null)
    const [ callAccepted, setCallAccepted ] = useState(null)
    // const [ idToCall, setIdToCall ] = useState("")
    const [ callEnded, setCallEnded ] = useState(null)
    const [ name, setName ] = useState(myname)

    // const myVideo = document.createElement('video')
    const myVideo = useRef()
    const userVideo = useRef()
    myVideo.muted = true

    const connectionRef = useRef()

    console.log('stream', stream)
    console.log('callAccepted', callAccepted)

    const videoGrid = document.getElementById('videos')

    // peer.on('open', id => {
        
    // })

    socket.emit('join-room', roomId, userId)
    socket.on('user-connected', userId => {
        console.log('User connected' + userId)
    })

    // useEffect(() => {
        // navigator.mediaDevices.getUserMedia({
        //     video: true,
        //     audio: true
        // }).then(stream => {
        //     addVideoStream(myVideo, stream)
        // })
    
      
    // },[])

    // function addVideoStream(video, stream){
    //     video.srcObject = stream
    //     video.addEventListener('loadedmetadata', () => {
    //         video.play()
    //     })
    //     videoGrid.append(video)
    // }

   

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        myPeer.on('call', call => {
            call.answer(stream)
            call.on('stream', (stream) => {
                userVideo.current.srcObject = stream
            })
        })

        socket.on('user-connected', userId => {
            connectToNewUser(userId, stream)
        })

        // socket.on("me", (id) => {
        //     setMe(id)
        // })

        // socket.on("callUser", (data) => {
        //     setReceivingCall(true)
        //     setCaller(data.from)
        //     setName(data.name)
        //     setCallerSignal(data.signal)
        //     console.log('data', data)
        // })
        
    },[roomId])

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        call.on('stream', (stream) =>{
            userVideo.current.srcObject = stream
            
        })
    }

    // const callUser = () => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     })

    //     peer.on("signal", (data) => {
    //         socket.emit("callUser", {
    //             userToCall: idToCall,
    //             signalData: data,
    //             from: user.uid,
    //             name: name

                
    //         })
            
    //     })

    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream
    //     })

    //     socket.on("callAccepted", (signal) => {
    //         setCallAccepted(true)
    //         peer.signal(signal)
    //     })

    //     connectionRef.current = peer
    // }

    // const answerCall = () => {
    //     setCallAccepted(true)
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })

    //     peer.on("signal", (data) => {
    //         socket.emit("answerCall", {signal: data, to: caller})
    //     })

    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream
    //     })

    //     peer.signal(callerSignal)
    //     connectionRef.current = peer
    // }

    // const leaveCall = () => {
    //     setCallEnded(true)
    //     connectionRef.current.destroy()
    // }

    console.log('other', userVideo)

    
  return (
    <div className='video_container'>
         <div id="videos"> 
            {/* {stream  &&
                <video 
                    className='video_1' 
                    id='user-1' 
                    autoPlay 
                    playsInline
                    ref={myVideo}
                ></video> 
            }     */}
            {/* {callAccepted && !callEnded? */}
                <video 
                    className='video_1' 
                    id='user-1' 
                    autoPlay 
                    playsInline
                    ref={userVideo}
                ></video> 
                {/* // : null */}
            {/* }               */}
            <div className="call_action">
                {/* <button className='btn_end' onClick={() =>callUser(idToCall)}><HiOutlinePhoneMissedCall/></button> */}
                {/* <button className='btn_end' onClick={leaveCall}><HiPhoneMissedCall/></button> */}
            </div>
            {/* {callAccepted && !callEnded? */}
                <video 
                    className='video_2' 
                    id='user-2' 
                    autoPlay 
                    playsInline
                    ref={myVideo}
                    >
                </video> 
                {/* : null} */}
        </div>
    </div>
  )
}

export default VideoChat
