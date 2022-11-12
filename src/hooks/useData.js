import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "./useAuth"


const useData = () => {
  
    const [users, setUsers] = useState([])
    const usersRef = collection(db, 'users')
    const [posts, setPosts] = useState([])
    const postsRef = collection(db, 'posts')
    const [comments, setComments] = useState([])
    const commentsRef = collection(db, 'comments')
    const [marriages, setMarriages] = useState([])
    const marriagesRef = collection(db, 'marriages')
    const [questions, setQuestions] = useState([])
    const questionsRef = collection(db, 'questions')
    const [doctors, setDoctors] = useState([])
    const doctorsRef = collection(db, 'doctors')
    const [chats, setChats] = useState([])
    const chatsRef = collection(db, 'chats')
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, 'messages')
    const [lawyers, setLawyers] = useState([])
    const lawyersRef = collection(db, 'lawyers')
    const [rooms, setRooms] = useState([])
    const roomsRef = collection(db, 'rooms')
    const [clubs, setClubs] = useState([])
    const clubsRef = collection(db, 'clubs')
    const [participants, setParticipants] = useState([])
    const participantsRef = collection(db, 'participants')
    const [topics, setTopics] = useState([])
    const topicsRef = collection(db, 'topics')
    const [followers, setFollowers] = useState([])
    const followersRef = collection(db, 'followers')
    const [likes, setLikes] = useState([])
    const likesRef = collection(db, 'likes')


    const allUsers = query(usersRef, orderBy("createdAt")); 
    const allPosts = query(postsRef, orderBy("createdAt")); 
    const allComments = query(commentsRef, orderBy("createdAt"));
    const allMarriages = query(marriagesRef, orderBy("createdAt"));  
    const allQuestions = query(questionsRef, orderBy("createdAt"));  
    const allDoctors = query(doctorsRef, orderBy("createdAt")); 
    const allLawyers = query(lawyersRef, orderBy("createdAt")); 
    // const allChats = query(chatsRef, orderBy("createdAt")); 
    const allMessages = query(messagesRef, orderBy("createdAt")); 
    const allrooms = query(roomsRef, orderBy("date")); 

    useEffect(() => {
        onSnapshot(likesRef, snapshot => {
            setLikes(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allrooms, snapshot => {
            setRooms(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(followersRef, snapshot => {
            setFollowers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(clubsRef, snapshot => {
            setClubs(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(topicsRef, snapshot => {
            setTopics(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(participantsRef, snapshot => {
            setParticipants(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allUsers, snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(allPosts, snapshot => {
            setPosts(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(allComments, snapshot => {
            setComments(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allMarriages, snapshot => {
            setMarriages(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(allQuestions, snapshot => {
            setQuestions(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allDoctors, snapshot => {
            setDoctors(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])

    useEffect(() => {
        onSnapshot(chatsRef, snapshot => {
            setChats(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allMessages, snapshot => {
            setMessages(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allLawyers, snapshot => {
            setLawyers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])


  

    return {  users, posts, followers,likes, comments, participants, clubs, topics, marriages, questions, doctors, chats, messages, lawyers, rooms }
}

export default useData;