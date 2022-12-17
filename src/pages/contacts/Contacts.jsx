import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import './contacts.css'
import {
  collection,  
  addDoc,
  serverTimestamp,
  setDoc,
  doc
  
} from "firebase/firestore";
import {useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';
import { db, useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';
import useData from '../../hooks/useData';

const Contacts = () => {

    const { user } = useAuth();
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [sending, setSending] = useState(null)
  const [messageAlert, setMessageAlert] = useState('')

  const navigate = useNavigate()

  const handleMessage = async(e) => {
    e.preventDefault();

    setSending(true)

    const data = { 
        name: cuUser? cuUser.name : name,
        email: cuUser? cuUser.email : email,
        subject,
        message,
    }

    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        timeStamp: serverTimestamp(),
        
      });
    } catch (error) {
      console.log(error)
    }
    setMessageAlert('Your message has been delivered successiful, our team will contact you soon, thank you.')
    setTimeout(() => {
      setMessageAlert('')
    }, 6000);
    setSending(null)
    setName('')
    setEmail('')
    setMessage('')
    setSubject('')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
      <div className='contacts_wrapper'>
        <Nav/>
        <div className="about_inner">              
              <h1 className="about_title">TUWASILIANE</h1>   
              <h1 className='about_body'>Assalaam Aleykum, tunasubiri ujumbe wako ...</h1>             
        </div> 
      
      <div className="contact_wrapper">
        {messageAlert != '' &&
              <div className="message_alert1">
                {messageAlert}
              </div>
        }
      <motion.div initial={{ x: '-100vw'}}
        animate={{x:0}} className="contact_top">
          <div action="" className='form'>
            {!user && <> 
            <div className="form_group">
              <input 
                type="text" 
                placeholder='Andika Jina'
                className='app_input'
                name='subject'
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="form_group">
              <input 
                type="email" 
                placeholder='Andika Barua Pepe'
                className='app_input'
                name='email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div> 
            </>}
            <div className="form_group">
              <input 
                type="text" 
                placeholder='Andika Kichwa cha Habari '
                className='app_input'
                name='subject'
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                />
            </div>           
            <div className="form_group">
              <textarea 
                placeholder='Andika Ujumbe Wako'
                className='app_textarea'
                name='message'
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                >

              </textarea>
            </div>
            <button 
              className='btn_reg'
              onClick={handleMessage}
              disabled={!message || !subject}
              >{sending? <Loading/> : 'TUMA UJUMBE'}</button>
          </div>
        </motion.div>
        
        <motion.div initial={{ y: '-100vh'}}
        animate={{y:0}} className="contact_bottom">
          <div className="top">
            <h3>TUPIGIE</h3>
            <span>Whatsapp: +44 7723 858243</span>
            
          </div>
          <div className="top">
            <h3>TUNAPATIKANA</h3>
            <span>273746 York House</span>
            <span>Green Lane West</span>
            <span>Prestron, Lancashire, PR3 1NJ</span>
            <span>United Kingdom</span>
          </div>
          <div className="top">
            <h3>BARUA PEPE</h3>
            <span>info@wema-tz.com</span>
            <span>www.wema-tz.com</span>
          </div>
        </motion.div>
      </div>
      <Footer/>
      </div>

  )
}

export default Contacts