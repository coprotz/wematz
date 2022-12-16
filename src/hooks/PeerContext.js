import { createContext, useState } from "react";
import { createOffer } from "./peerConnection";


const PeerContext = createContext()

const PeerContextProvider = ({ children }) => {
    const [userStream, setUserStream] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)

    // useState(() => {

    // },[])

    const stunServers = {
      iceServers: [
          {
              urls: [              
                  "stun:stun.l.google.com:19302" ,                 
              ]
          }
      ]
  }
  

    const addConnection = (currentUser, newUser, mediaStream) => {
        const peerConnection = new RTCPeerConnection(stunServers);
        mediaStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, mediaStream);
        });

        const currentUserKey = Object.keys(currentUser)[0];
        const newUserKey = Object.keys(newUser)[0];

        const sortedIDs = [currentUserKey, newUserKey].sort((a, b) =>
        a.localeCompare(b)
        );
        if (sortedIDs[1] === currentUserKey) {
            createOffer(peerConnection, sortedIDs[1], sortedIDs[0])
        }
    }


    return (
        <PeerContext.Provider value={{ setUserStream, userStream, currentRoom, setCurrentRoom, addConnection }}>
            {children}
        </PeerContext.Provider>
    )

}

export { PeerContext, PeerContextProvider }

