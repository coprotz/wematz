import React, { useRef, useEffect, useState } from 'react'
// import Peer from 'simple-peer'
// import { Peer } from 'peerjs'

import { db, useAuth } from '../../hooks/useAuth'
import { BsBell, BsCameraVideo, BsThreeDotsVertical } from 'react-icons/bs';
import { HiPhoneMissedCall, HiOutlinePhoneMissedCall } from 'react-icons/hi';
import useData from '../../hooks/useData'
import { 
    createOffer, 
    initiateConnection, 
    initiateLocalStream, 
    listenToConnectionEvents, 
    sendAnswer, 
    startCall 
} from '../../hooks/RTCModule'
import { doCandidate, doOffer } from '../../hooks/FirebaseModule'
import { collection, doc, onSnapshot } from 'firebase/firestore'




const VideoChat = ({myname, memberId, call}) => {
    const { user } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user.uid)




    const userId = user.uid
    const userToCall = memberId
    const username = myname

    // const myPeer = new Peer(undefined);

    const [me, setMe] = useState("")
    const [stream, setStream] = useState()    
    const [caller, setCaller] = useState("")
    const [ callerSignal, setCallerSignal ] = useState(null)
    const [ callAccepted, setCallAccepted ] = useState(null)
 
    const [ callEnded, setCallEnded ] = useState(null)
    // const [ name, setName ] = useState(myname)


    const myVideo = useRef()
    const userVideo = useRef()
 

    // const localStreamRef = useRef()
    // const localConnectionRef = useRef()

    const [webCamActive, setWebCamActive] = useState(null)
    const [localConnection, setLocalConnection] = useState(null)

    const stunServers = {
        iceServers: [
            {
                urls: [              
                    "stun:stun.l.google.com:19302" ,                 
                ]
            }
        ]
    }

    const pc = new RTCPeerConnection(stunServers);

 
      

    useEffect(() => {

        const init = async () => {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            const remoteStream = new MediaStream();

            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream)
            });

            pc.ontrack = (event) => {
                event.streams[0].getTracks().forEach((track) => {
                    remoteStream.addTrack(track)
                })
            }
            // const stream = await initiateLocalStream()
            // setLocalStream(stream)
            myVideo.current.srcObject = localStream; 
            userVideo.current.srcObject = remoteStream

            setWebCamActive(true)

            // const connection = await initiateConnection()
            // setLocalConnection(connection)
            // console.log('conn', connection)
        

            // localConnectionRef.current = connection
            // localStreamRef.current = stream
           
        }
        init()
        
        
       

    },[])

    const startCall = async () => {
        const callDoc = collection(db, 'calls')
        const offerCandidates = callDoc.collection('offerCandidates')
        const answerCandidates = callDoc.collection('answerCandidates')

        pc.onicecandidate = (event) => {
            event.candidate && 
                offerCandidates.add(event.candidate.toJSON())
        }

        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription)

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        }

        await callDoc.set({ offer })

        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data()
            if(!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(
                    data.amswer
                )
                pc.setRemoteDescription(answerDescription)
            }
        });

        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added'){
                    const candidate = new RTCIceCandidate(
                        change.doc.data()
                    );
                    pc.addIceCandidate(candidate)
                }
            });
        });
       

        // listenToConnectionEvents(localConnectionRef, userToCall, username, userVideo, doCandidate)
        // createOffer(localConnectionRef, localStreamRef, userToCall, username, doOffer)
    }

    const answerCall = async () => {
        const callDoc = collection(doc(db, 'calls', `123`));
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = event => {
            event.candidate && 
                answerCandidates.add(event.candidate.toJSON());
        }

        const callData = (await callDoc.get()).data()

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(
            new RTCSessionDescription(offerDescription)
        )
    }

 
    console.log('other', userVideo)
    console.log('myvideo', myVideo)

    

    
  return (
    <div className='video_container'>
         <div id="videos">          
                <video 
                    className='video_1' 
                    id='user-1' 
                    autoPlay 
                    playsInline
                    ref={userVideo}
                ></video> 
             
          
            <div className="call_action">
                <button className='btn_end' onClick={() =>startCall(userToCall, username)}><HiOutlinePhoneMissedCall/></button>
                <button className='btn_answer' onClick={() =>startCall(userToCall, username)}>Answer</button>
                {/* <button className='btn_end' onClick={leaveCall}><HiPhoneMissedCall/></button> */}
            </div>
        
                <video 
                    className='video_2' 
                    id='user-2' 
                    autoPlay 
                    playsInline
                    ref={myVideo}
                    >
                </video> 
             
        </div>
    </div>
  )
}

export default VideoChat
