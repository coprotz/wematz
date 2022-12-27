import { collection, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { PeerContext } from "./PeerContext.js";
import { db, useAuth } from "./useAuth.js";



export const createOffer = async (peerConnection, createdId, receiverId, currentRoom ) => {
    const receiverRef = currentRoom?.participants?.find(p => p === receiverId)
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    const temp = currentRoom?.participants

    console.log('rec', receiverId)

    
    const offerPayload = {
        sdp: offer.sdp,
        type: offer.type,
        userId: createdId
    }

    await updateDoc(doc(db, 'rooms', `${currentRoom?.id}`), {
        participants: [...temp, offerPayload, receiverRef]
    })

 
}