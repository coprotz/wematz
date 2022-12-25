import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { useNavigate, useParams } from 'react-router-dom'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'
import Appoints from '../appointments/Appoints'
import { BsCamera } from 'react-icons/bs';
import Loading from '../../components/loading/Loading'
import moment from 'moment';
import { ages, regions } from '../../data'
import LoadingPage from '../../components/loading/LoadingPage'
import FollowCard from './FollowCard'



const ViewMember = () => {
    const { id } = useParams()
    const { users, donates, posts, questions, comments, likes, followers } = useData()
    const navigate = useNavigate()
    const { user } = useAuth()
    const member = users?.find(u => u.id === id)
    const [appoints, setAppoints] = useState(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const types = ['image/png', 'image/jpeg']

    const cuUser = users?.find(u => u.id === user?.uid)   
    const userRef = doc(db, 'users', `${cuUser?.id}`)

    const mujaheed = donates?.find(d => d?.user_id === member?.id)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today

    const { perc, url } = useStorage(file)

    const memberPosts = posts?.filter(p =>p.userId === id)
    const allComments = comments?.filter(p =>p.userId === id)
    const memberanswers = comments?.filter(v => v.cat === 'que').filter(p =>p.userId === id)
    const memberComments = allComments?.length - memberanswers?.length
    const memberQue = questions?.filter(p =>p.userId === id)

    const myFollowers = followers?.filter(f => f.follower_id === id)
    const myFollowings = followers?.filter(f => f.following_id === id)
    // console.log('posts', memberPosts)

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
        setLoading(true)
        e.preventDefault()

        try {
            await updateDoc(userRef, {photo: url})
            setLoading(null)
            if(url){
                setFile(null)}
            setMessage('Picha yako imebadilishwa vizuri')
        } catch (error) {
            setError(error.message)
        }
    }

    const isOwn = user.uid === member?.id

    const [editName, setEditName] = useState(null)
    const [editAge, setEditAge] = useState(null)
    const [editLocation, setEditLocation] = useState(null)
    const [editEdu, setEditEdu] = useState(null)
    const [editEmplo, setEditEmplo] = useState(null)
    const [editProf, setEditProf] = useState(null)

  
  
   
    const myFolling = followers.filter(f => f?.follower_id === user.uid)
    const isFollower = myFolling.find(f =>f?.following_id === id)
    const myFolls = followers.filter(f =>f?.following_id === user.uid)
    // console.log('myfoll', myFollowers)


    const followRef = collection(db, 'followers')
    const notificRef = collection(db, 'notifics')
  
    const newNotific = {
      target_id: id,
      uid: user.uid,
      type: 'follow',
      type_id: user.uid,
      action: 'anakufatilia',
      isSeen: false,
      createdAt: serverTimestamp()
    }

  

    const handleFollow = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            follower_id: user.uid,
            following_id: id
        }
        if(!isFollower){
           try {
            await addDoc(followRef, data)
            await addDoc(notificRef, newNotific)
            setLoading(null)
            } catch (error) {
            console.log(error.message)
            }  
        }else{
            alert('Unamfatilia huyu ndugu')
            setLoading(null)
        }
       
    }


    const RenderMember = () => {
        if(member){
            return (
               <div className='view_doctor_wrapper'>
         {appoints && <Appoints setAppoints={setAppoints}/>}
        <div className="view_doc_top">
            <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar} />
            {/* <div className="view_doc_photo">
                <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar} />            
            </div> */}
            { file?  
                <div className="view_doc_photo">
                    <img src={URL.createObjectURL(file)} alt="" />  
                </div>                      
                : 
                <div className="view_doc_photo">
                    <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar } /> 
                    {isOwn && (                                             
                    <label htmlFor="photo" className='user_picture'>
                        <input 
                            type="file" 
                            name='photo' 
                            id="photo" style={{display: 'none'}}
                            onChange={handleSelect}
                        />
                        <span><BsCamera/></span>
                    </label> )}
                </div>
            }
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
            {file &&                                        

            <div className="u_edit_photo">
                <button 
                    className='btn_edit' 
                    onClick={handleChange}
                    disabled={!url}
                    >{loading ? <Loading/> : 'BADILI PICHA'}
                </button>
                <button 
                    className='btn_remove' 
                    onClick={() =>setFile(null)}
                    >ONDOA
                </button>
            </div> 
             }
            <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
        </div>
        <div className="view_doc_inner">
            <div className="view_doc_left">
                <div className="member_edit">
                    {editName ? 
                        <input type='text' value={editName} onChange={(e) =>setEditName(e.target.value)}/> :
                        <div className="name_wrapper">
                            <h2>{member?.name}</h2>
                            {!editName && isOwn && <button className='btn_edit' onClick={() => setEditName(member?.name)}>Edit</button> } 
                        </div>                        
                    }
                    <div>                                               
                        {editName && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {name:editName});setEditName(null)}}
                            >Save
                        </button>
                        }
                        {editName && <button onClick={() =>setEditName(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
                
                <small className='member_time'>Mwachama toka: {moment(member?.createdAt.seconds * 1000).format('MMM Do YY') }</small>
                {/* <div className="member_info_div">
                    <span>Age :</span>
                    <div className="member_edit">
                       <h4>{member?.age}</h4> 
                       <button>Edit</button>
                    </div>
                    
                </div> */}
                <div className="member_info_div">
                    <span className='_info_div'>Age :</span>
                    {editAge ? 
                        // <input type='text' value={editAge} onChange={(e) =>setEditAge(e.target.value)}/> 
                        <select 
                        name='age'  
                        value={editAge}
                        // className='sel_input'
                        // style={{width: '100%'}}
                        onChange={(e) =>setEditAge(e.target.value)}
                        >                                    
                        {ages.map((age, index) => (
                            <option 
                                value={age} 
                                key={index}
                                
                                >{age}</option> 
                        ))}                                
                        </select>
                        :
                        <div className="name_wrapper">
                            <h4>{member?.age}</h4>
                            {!editAge && isOwn && <button className='btn_edit' onClick={() => setEditAge(member?.age)}>Edit</button> } 
                        </div>                        
                    }
                    <div className='_btns'>                                               
                        {editAge && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {age:editAge});setEditAge(null)}}
                            >Save
                        </button>
                        }
                        {editAge && <button onClick={() =>setEditAge(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
               
                <div className="member_info_div">
                    <span className='_info_div'>Elimu :</span>
                    {editEdu ? 
                        // <input type='text' value={editAge} onChange={(e) =>setEditAge(e.target.value)}/> 
                        <select 
                        name='age'  
                        value={editEdu}
                        // className='sel_input'
                        // style={{width: '100%'}}
                        onChange={(e) =>setEditEdu(e.target.value)}
                        >                                 
                         <option value='Cheti' >Cheti</option>
                         <option value='Stashahada' >Stashahada</option>
                         <option value='Shahada' >Shahada</option>
                         <option value='Zaidi ya Shahada' >Zaidi ya Shahada</option>                               
                        </select>
                        :
                        <div className="name_wrapper">
                            <h4>{member?.edu}</h4>
                            {!editEdu && isOwn && <button className='btn_edit' onClick={() => setEditEdu(member?.edu)}>Edit</button> } 
                        </div>                        
                    }
                    <div className='_btns'>                                               
                        {editEdu && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {edu:editEdu});setEditEdu(null)}}
                            >Save
                        </button>
                        }
                        {editEdu && <button onClick={() =>setEditEdu(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
               
                <div className="member_info_div">
                    <span className='_info_div'>Kazi :</span>
                    {editEmplo ? 
                        // <input type='text' value={editAge} onChange={(e) =>setEditAge(e.target.value)}/> 
                        <select 
                        name='age'  
                        value={editEmplo}
                        // className='sel_input'
                        // style={{width: '100%'}}
                        onChange={(e) =>setEditEmplo(e.target.value)}
                        >                                 
                         <option value='Mwanafunzi' >Mwanafunzi</option>
                         <option value='Mfanyabiashara' >Mfanyabiashara</option>
                         <option value='Nimeajiriwa' >Nimeajiriwa</option>
                         <option value='Sina Shughuli Maalum' >Sina Shughuli Maalum</option>                               
                        </select>
                        :
                        <div className="name_wrapper">
                            <h4>{member?.emplo}</h4>
                            {!editEmplo && isOwn && <button className='btn_edit' onClick={() => setEditEmplo(member?.emplo)}>Edit</button> } 
                        </div>                        
                    }
                    <div className='_btns'>                                               
                        {editEmplo && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {emplo:editEmplo});setEditEmplo(null)}}
                            >Save
                        </button>
                        }
                        {editEmplo && <button onClick={() =>setEditEmplo(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
               
                <div className="member_info_div">
                    <span className='_info_div'>Ujuzi :</span>
                    {editProf ? 
                        // <input type='text' value={editAge} onChange={(e) =>setEditAge(e.target.value)}/> 
                        <input 
                        name='age' 
                        type='text'
                        value={editProf}
                        // className='sel_input'
                        // style={{width: '100%'}}
                        onChange={(e) =>setEditProf(e.target.value)}                                                     
                        />
                        :
                        <div className="name_wrapper">
                            <h4>{member?.profes}</h4>
                            {!editProf && isOwn && <button className='btn_edit' onClick={() => setEditProf(member?.profes)}>Edit</button> } 
                        </div>                        
                    }
                    <div className='_btns'>                                               
                        {editProf && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {profes:editProf});setEditProf(null)}}
                            >Save
                        </button>
                        }
                        {editProf && <button onClick={() =>setEditProf(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
                {/* <div className="member_info_div">
                    <span>Anapoishi :</span>
                    <h4>{member?.location}</h4>
                </div> */}
                <div className="member_info_div">
                    <span className='_info_div'>Anapoishi :</span>
                    {editLocation ? 
                        // <input type='text' value={editAge} onChange={(e) =>setEditAge(e.target.value)}/> 
                        <select 
                        name='age'  
                        value={editLocation}
                        // className='sel_input'
                        // style={{width: '100%'}}
                        onChange={(e) =>setEditLocation(e.target.value)}
                        >                                    
                         {regions.map((item, index) => (
                               
                               <option 
                                   value={item.name} 
                                   key={index}
                                   
                                   >{item.name}</option> 
                           ))}                                 
                        </select>
                        :
                        <div className="name_wrapper">
                            <h4>{member?.location}</h4>
                            {!editLocation && isOwn && <button className='btn_edit' onClick={() => setEditLocation(member?.location)}>Edit</button> } 
                        </div>                        
                    }
                    <div className='_btns'>                                               
                        {editLocation && 
                        <button 
                            onClick={() => {updateDoc(doc(db, 'users', `${id}`), {location:editLocation});setEditLocation(null)}}
                            >Save
                        </button>
                        }
                        {editLocation && <button onClick={() =>setEditLocation(null)}>Cancel</button>}
                    </div>                    
                    
                </div>
            </div>
            <div className="doc_body" style={{border: '1px solid #aaa', display: 'flex', justifyContent: 'center', padding: '20px'}}>
                
                {valid ? <h2 className='doc_mjaheed'>Mimi ni <span>Mjaheed</span></h2> : 
                isOwn ? <button className='btn_sign' onClick={() => navigate('/mjaheed')}>Kuwa Mjaheed</button> :
                <h2 className='doc_mjaheed'>Bado sijawa <span>Mjaheed</span></h2>}
            </div>
            {isOwn && (
            <div className="doc_right">
                <button className='btn_sign' onClick={() =>setAppoints(true)} >Angalia Maombi ya Miadi</button>
                <div className="member_info_div">
                    <span>Dini :</span>
                    <h4>{member?.religion}</h4>
                </div>
                <div className="member_info_div">
                    <span>Dhehebu :</span>
                    <h4>{member?.set}</h4>
                </div>
                <div className="member_info_div">
                    <span>Quran :</span>
                    <h4>{member?.quran}</h4>
                </div>
                <div className="member_info_div">
                    <span>Msikiti wa karibu :</span>
                    <h4>{member?.mosque}</h4>
                </div>
                <div className="member_info_div">
                    <span>Swala :</span>
                    <h4>{member?.prayer}</h4>
                </div>
            </div> )}
        </div>
        <div className="member_activities">
            <h3 className='title'>shughuli za mwanaWema</h3>
            <div className="member_activities_grids">
                <div className="activity_card">
                    <h3>{memberPosts?.length}</h3>
                    <span>Posti alizoanzisha</span>
                </div>
                <div className="activity_card">
                    <h3>{memberComments}</h3>
                    <span>Comments alizochangia Mada, Post, Habari</span>
                </div>
                <div className="activity_card">
                    <h3>{memberQue?.length}</h3>
                    <span>Maswali aliyouliza</span>
                </div>
                <div className="activity_card">
                    <h3>{memberanswers?.length}</h3>
                    <span>Majibu aliyotoa kwa maswali yaliyoulizwa</span>
                </div>                
            </div>
        </div>
        <div className="member_follows">
            <div className="member_followings">
                <h3 className='title'>{user.uid === id? 'Unaowafatilia' : 'Anaowafatilia'} ({myFollowers?.length})</h3>
                <div className="followings_grids">
                    {myFollowers?.map(m => (
                       <FollowCard m={m.following_id} key={m.id}/> 
                    ))}
                    
                  
                </div>
            </div>
            <div className="member_followings">
                <h3 className='title'>{user.uid === id? 'Wanaokufatilia' : 'Wanaomfatilia'} ({myFollowings?.length})</h3>
                <div className="followings_grids">
                    {myFollowings?.map(m => (
                       <FollowCard m={m.follower_id} key={m.id}/>
                    ))}
                    
                  
                </div>
            </div>
        </div>
        <div className="follow_btn">
            {/* <button className='btn_reg'>Mfatili</button> */}
            <button 
                className={isFollower? 'btn_isFollow' : 'btn_reg'}
                onClick={handleFollow}
                >{loading? <Loading/> : isFollower? 'Unamfatilia' : 'Mfatilie'}
            </button>
        </div>
      
    </div>  
            )
        }else {
            return (
                <div className="loading_wrapper">
                    <LoadingPage/>
                </div>
                
            )
        }
    }

  return (
   <>{RenderMember()}</>
  )
}

export default ViewMember
