import React from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import './profile.css'
import { motion } from 'framer-motion';
import { BsCamera } from 'react-icons/bs';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import useStorage from '../../hooks/useStorage';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';
import Success from '../../components/success/Success';


const Profile = () => {

    const { id } = useParams()

    

    const { user } = useAuth()
    const { users, marriages } = useData()
    const cuUser = users?.find(u => u.id === user?.uid)

   

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [fname, setFname] = useState(cuUser?.fname)
    const [lname, setlname] = useState(cuUser?.lname)
    const [message, setMessage] = useState("")

    const types = ['image/png', 'image/jpeg']

   
    const userRef = doc(db, 'users', `${cuUser?.id}`)

    const { perc, url } = useStorage(file)

    const handleSelect = (e) => {
        let selected = e.target.files[0];  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }

    const handleChange = async(e) => {
        e.preventDefault()

        try {
            await updateDoc(userRef, {
                photo: url
            })
            setMessage('Picha yako imebadilishwa vizuri')
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <motion.div 
    initial={{y:'100vh', opacity:0}}
    animate={{y: '0', opacity:1}} 
    transition={{ ease: "easeOut", duration: 0.5 }} >
    <div className="profile_wrapper"> 
        <Navbar/>
        {message && <Success message={message}/>}
        <div className="profile_inner">            
            { file?  
                <div className="user_photo1">
                    <img src={URL.createObjectURL(file)} alt="" />  
                </div>                      
                : 
                <div className="user_photo1">
                    <img src={cuUser?.photo || process.env.PUBLIC_URL+`/${cuUser?.photo}` } />                                              
                    <label htmlFor="photo" className='user_picture'>
                        <input 
                            type="file" 
                            name='photo' 
                            id="photo" style={{display: 'none'}}
                            onChange={handleSelect}
                        />
                        <span><BsCamera/></span>
                    </label>
                </div> 
            }
                        
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
            {file && <>                                       
            {/* <div className="progress-bar"  style={{width: perc + '%'}}></div>   */}
          
            <div className="profile_photo_edit">                            
                <button 
                    className='btn_cancel' 
                    onClick={() =>setFile(null)}

                    >ONDOA</button>
            </div>
            </>
        
        }

       

        {/* <div className="share_text" style={{marginTop: '50px'}}>
                <input 
                    type="text" 
                    placeholder='Unataka kuwaambia nini WanaWema?' 
                    className='sel_input'
                    name={fname}
                    // value={cuUser?.fname} 
                    style={{width:'100%'}}
                    onChange={(e) =>setFname(e.target.value)}
                /> 
                 <input 
                    type="text" 
                    placeholder='Unataka kuwaambia nini WanaWema?' 
                    className='sel_input'
                    name={lname}
                    value={cuUser?.fname || ''} 
                    style={{width:'100%'}}
                    onChange={(e) =>setFname(e.target.value)}
                /> 
            </div> */}
        <div className="items_group">
            <button 
                className='btn_reg' 
                onClick={handleChange}
                disabled={!url}
                >BADILI PICHA</button>
        </div> 
        </div>
        <Footer/>
    </div> 
</motion.div>
  )
}

export default Profile
