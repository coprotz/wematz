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
    const [calls, setCalls] = useState([])
    const callsRef = collection(db, 'calls')
    const [views, setViews] = useState([])
    const viewsRef = collection(db, 'views')
    const [donates, setDonates] = useState([])
    const donatesRef = collection(db, 'donates')
    const [blocks, setBlocks] = useState([])
    const blocksRef = collection(db, 'blocks')
    const [madas, setMadas] = useState([])
    const madasRef = collection(db, 'madas')
    const [appoints, setAppoints] = useState([])
    const appointsRef = collection(db, 'appoints')
    const [ratings, setRatings] = useState([])
    const ratingsRef = collection(db, 'ratings')
    const [notifics, setNotifics] = useState([])
    const notificsRef = collection(db, 'notifics')
    const [contacts, setContacts] = useState([])
    const contactsRef = collection(db, 'contacts')
    const [news, setNews] = useState([])
    const newsRef = collection(db, 'news')
    const [meetings, setMeetings] = useState([])
    const meetingsRef = collection(db, 'meetings')

    const allMeetings = query(meetingsRef, orderBy("createdAt")); 
    const allNews = query(newsRef, orderBy("createdAt")); 
    const allUsers = query(usersRef, orderBy("createdAt")); 
    const allnotifics = query(notificsRef, orderBy("createdAt"));
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
        onSnapshot(allMeetings, snapshot => {
            setMeetings(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allNews, snapshot => {
            setNews(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(contactsRef, snapshot => {
            setContacts(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(allnotifics, snapshot => {
            setNotifics(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(ratingsRef, snapshot => {
            setRatings(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(appointsRef, snapshot => {
            setAppoints(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(madasRef, snapshot => {
            setMadas(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(blocksRef, snapshot => {
            setBlocks(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(donatesRef, snapshot => {
            setDonates(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(viewsRef, snapshot => {
            setViews(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
    useEffect(() => {
        onSnapshot(callsRef, snapshot => {
            setCalls(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })
    },[])
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


  

    return {  
        users,
        calls, 
        posts, 
        followers,
        likes, 
        comments, 
        participants, 
        clubs, 
        topics, 
        marriages, 
        questions, 
        doctors, 
        chats, 
        messages, 
        lawyers, 
        rooms,
        views,
        donates,
        blocks,
        madas,
        appoints,
        ratings,
        notifics,
        contacts, 
        news,
        meetings
     }
}

export default useData;