import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, useAuth } from "./useAuth";


const callsRef = collection(db, 'calls')
// const { user } = useAuth()

export const doOffer = async (localConnectionRef, username, userToCall) => {
    const offer = await localConnectionRef.createOffer()
    const data = {
        type: 'offer',
        from: username,
        to: userToCall,
        offer: JSON.stringify(offer)
    }
    await addDoc(callsRef, data)
}

export const doAnswer = async (call, answer, userId) => {
    await updateDoc(doc(db, 'calls', `${call.id}`), {
        type: 'answer',
        from: userId,
        answer: JSON.stringify(answer)
    })
}

export const doLeave = async (call, userId) => {
    await updateDoc(doc(db, 'calls', `${call.id}`), {
        type: 'leave',
        from: userId
    })
}

export const doCandidate = async (call, userId, candidate) => {
    await updateDoc(doc(db, 'calls', `${call.id}`), {
        type: 'candidate',
        from: userId,
        candidate: JSON.stringify(candidate)
    })
}