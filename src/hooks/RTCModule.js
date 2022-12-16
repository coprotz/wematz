

export const createOffer = async(localConnectionRef, localStreamRef, doOffer, username, userToCall) => {
    try {
        localConnectionRef.addStream(localStreamRef)

        const offer = await localConnectionRef.createOffer()
        await localConnectionRef.setLocalDescription(offer)

        doOffer(username, userToCall,localConnectionRef)
    } catch (error) {
       console.log(error.message) 
    }
}

export const initiateLocalStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        return stream
    } catch (error) {
        console.log(error.message)  
    }
}

export const  initiateConnection = async () => {
    try {
        const stunServers = {
            iceServers: [
                {
                    urls: [              
                        "stun:stun.l.google.com:19302" ,                 
                    ]
                }
            ]
        }
        
        

      const conn = new RTCPeerConnection(stunServers)
      return conn;

    } catch (error) {
        console.log(error.message)
    }
}

export const listenToConnectionEvents = (conn,memberId, userId, userVideo, doCandidate) => {
    conn.onicecandidate = (event) => {
        if(event.candidate){
            doCandidate(memberId, userId, event.candidate)
        }


    }

    conn.ontrack = (e) => {
        if(userVideo.current.srcObject !== e.streams[0]) {
            userVideo.current.srcObject = e.streams[0]
        }
    }

}

export const sendAnswer = async (conn, localStream, call, doAnswer, userId) => {
    try {
        conn.addStream(localStream)

        const offer = JSON.parse(call.offer)
        conn.setRemoteDescription(offer)

        const answer = await conn.createAnswer()
        conn.setLocalDescription(answer)

        doAnswer(call.from, answer, userId)
    } catch (error) {
        console.log(error.message)
    }
}

export const startCall = (conn, call) => {
    const answer = JSON.parse(call.anwer)
    conn.setRemoteDescription(answer)
}

export const addCandidate = (conn, call) => {
    const candidate = JSON.parse(call.candidate)
    conn.addIceCandidate(new RTCIceCandidate(candidate))
}