import React from 'react'
import { useNavigate } from 'react-router-dom'
import useData from '../../hooks/useData'
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import './meetings.css'
import PartName from './PartName';
import PartPhoto from './PartPhoto';
import { db, useAuth } from '../../hooks/useAuth';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { PeerContext } from '../../hooks/PeerContext';


const MeetingCard = ({room}) => {
  const {clubs} = useData()
  const { user } = useAuth()
  const club = clubs.find(c => c.id === room?.clubId)
  const members = room && room.participants
  const isPart = members?.includes(`${user.uid}`)
  const navigate = useNavigate()

  const { mediaStream, setCurrentRoom, addConnection, currentRoom } = useContext(PeerContext)

  const roomRef = doc(db, 'rooms', `${room?.id}`)

  // const roomRef = doc(db, 'rooms' ,`${room?.id}`)

  // console.log('ispart', isPart)
  // console.log('user', user.uid)
  // console.log('currentRoom', currentRoom)

  const participant = room?.participants.find(p =>p !== user.uid)
  const currentUser = user.uid

  const stunServers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        //   "stun:stun.1.google.com:19302",
        //   "stun:stun3.1.google.com:19302",
        //   "stun:stun4.1.google.com:19302",
        //   "stun:stun.services.mozilla.com",
        ]
      }
    ]
  }

        // const rumref = doc(db, 'rooms' ,`${room?.id}`)

        // const parts = rumref.whereArrayContains('participants', `${}`)

        // console.log('parts', parts)




  const handlePart = async(room) => {
    try {
      if(isPart)
      navigate(`/meetings/${room?.id}`)

      else if(!isPart) {
      
        // const prevPart = room?.participants?.find(p => p !== user.uid)

        // console.log('prev', prevPart)

        // const upd_obj = room?.participants?.findIndex(obj => obj === prevPart)

        // console.log('upd', upd_obj)

        // const rumref = doc(db, 'rooms' ,`${room?.id}`)

        // const parts = rumref.whereArrayContains('participants', `${prevPart}`)

        // console.log('parts', parts)

        

        const peerConnection = new RTCPeerConnection(stunServers)
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        const offerPayload = {
          sdp: offer.sdp,
          type: offer.type,
          userId: user.uid
      }

      // console.log('offer', offerPayload)

      // await updateDoc(roomRef, {
      //   participants: [...prevPart, offerPayload]
      // })

      // await updateDoc(roomRef, {
      //   participants: [...members, user.uid]
      // })


      //   setCurrentRoom(room)
   
      //   navigate(`/meetings/${room?.id}`)
      }
    } catch (error) {
      console.log('room is not found')
    }
    
  }

  return (
    <div className="current_meeting_card" onClick={() =>handlePart(room)} key={room.id}>
      <h3 className='meet_part'>{club?.name}</h3>
      <h4 className='room_name'>{room?.name}</h4>
      <div className="meeting_teams">
          <div className="team_photos">
          {members?.slice(0,2)?.map(item => (
            <PartPhoto part={item}/>
          ))}

          </div>
          <div className="team_names_wrapper">
            <div className="team_names">
              {members?.slice(0,5).map(m => (
                <PartName part={m} key={m.id}/>
              ))}
              
             
            </div>
                <div className="meeting_status">
                  <div className="meet_peopl">
                    <FaRegUser/>{members?.length}
                  </div>
                  <div className="meet_peopl">
                      <FaRegCommentDots/>12
                  </div>
                </div>
            </div>
        </div>                    
                        {/* <button className='btn_ask'>Jiunge</button> */}
    </div>
  )
}

export default MeetingCard