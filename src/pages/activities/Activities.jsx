import React from 'react'
import { useState } from 'react'
import { nikahs } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import NewDonate from '../donates/NewDonate'
import NewChat from '../messages/NewChat'
import MainCard from '../nikah/MainCard'
import NikahCard from '../nikah/NikahCard'
import moment from 'moment';
import './activities.css'

const Activities = () => {
    const [page, setPage] = useState(1)
    const { likes, marriages, views, donates } = useData();
    const { user } = useAuth()

    const mary = marriages.find(m => m.userId === user.uid)

    const mylikes = likes.filter(l => l.user_id === mary?.id)
    const myliked = likes.filter(l => l.target_id === mary?.id)
    const myviews = views.filter(l => l.user_id === mary?.id)
    const myviewed = views.filter(l => l.target_id === mary?.id)

    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)
    const a = new Date().getTime()

    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
 

    const valid = expire > today

    console.log('user', user.uid)

    const handelNew = (d) => {
        if(!valid){
            setDonate(d)
        }else{
            setOpen(d)
        }
    }


    
    
    const RenderPage = () =>{
        if(page === 1){
            return (
                <div className="activity_res">
                    <h2>Niliowapenda</h2>
                    {mylikes.length > 0 ? 
                        <div className='likes_members'>
                            {mylikes.map(item => (
                               <MainCard id={item.target_id} key={item.id} handelNew={handelNew}/> 
                            ))}
                            
                        </div> 
                    : <span className='span'>Hakuna uliowapenda</span>
                    }
                    
                </div>
            )
        }else if(page === 2){
            return (
                <div className="activity_res">
                    <h2>Walionipenda</h2>
                    {myliked.length > 0 ? 
                        <div className='likes_members'>
                            {myliked.map(item => (
                               <MainCard id={item.target_id} key={item.id}/> 
                            ))}
                            
                        </div> 
                    : <span className='span'>Hakuna walionipenda</span>
                    }
                </div>
            )
        }else if(page === 3){
            return (
                <div className="activity_res">
                    <h2>Niliowaangalia</h2>
                    {myviews.length > 0 ? 
                        <div className='likes_members'>
                            {myviews.map(item => (
                               <MainCard id={item.target_id} key={item.id}/> 
                            ))}
                            
                        </div> 
                    : <span className='span'>Hakuna niliowaangalia</span>
                    }
                </div>
            )
        }else if(page === 4){
            return (
                <div className="activity_res">
                    <h2>Walioniangalia</h2>
                     {myviewed.length > 0 ? 
                        <div className='likes_members'>
                            {myviewed.map(item => (
                               <MainCard id={item.target_id} key={item.id}/> 
                            ))}
                            
                        </div> 
                    : <span className='span'>Hakuna walioniangalia</span>
                    }
                </div>
            )
        }
    }

 


  return (
    <div className='activities'>
        {donate && <NewDonate setDonate={setDonate} item={donate}/>}
        {open && <NewChat setOpen={setOpen} myId={mary.id} item={open}/>}
        <h2>Matukio ya Hivi Karibuni</h2>
        <div className="recipies_cat act_heading">
            <span className={page === 1? 'active_item' : 'cat_recipies'} onClick={() =>setPage(1)}>Niliowapenda</span> 
            <span className={page === 2? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(2)}>Walionipenda</span> 
            <span className={page === 3? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(3)}>Niliowaangalia</span> 
            <span className={page === 4? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(4)}>Walioniangalia</span> 
        </div>
        {RenderPage()}
     
    </div>
  )
}

export default Activities
