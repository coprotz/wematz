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


    const allUsers = query(usersRef, orderBy("createdAt")); 
    const allPosts = query(postsRef, orderBy("createdAt")); 
    const allComments = query(commentsRef, orderBy("createdAt"));
    const allMarriages = query(marriagesRef, orderBy("createdAt"));  
    const allQuestions = query(questionsRef, orderBy("createdAt"));  
    const allDoctors = query(doctorsRef, orderBy("createdAt")); 
    // const allAgents = query(agentsRef, orderBy("createdAt")); 
    // const allPilgrims = query(pilgrimsRef, orderBy("createdAt")); 
    // const allInvoices = query(invoicesRef, orderBy("createdAt")); 

   
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


  

    return {  users, posts, comments, marriages, questions, doctors }
}

export default useData;