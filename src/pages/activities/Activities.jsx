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


const Activities = () => {
    const [page, setPage] = useState(1)
    const { likes, marriages, views, donates } = useData();
    const { user } = useAuth()

    const mary = marriages.find(m => m.userId === user.uid)

    const liked_them = likes.filter(l => l.user_id === mary?.id)
    const liked_me = likes.filter(l => l.target_id === mary?.id)
    const viewd_them = views.filter(l => l.user_id === mary?.id)
    const viewed_me = views.filter(l => l.target_id === mary?.id)

    console.log('liked_them', liked_them)
    console.log('liked_me', liked_me)
    console.log('viewd_them', viewd_them)
    console.log('viewed_me', viewed_me)
    console.log('myid', mary?.id)

    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)
    const a = new Date().getTime()

    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
 

    const valid = expire > today

    // console.log('user', user.uid)

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
                    {liked_them.length > 0 ? 
                        <div className='likes_members'>
                            {liked_them.map(item => (
                               <MainCard id={item?.target_id} key={item.id} handelNew={handelNew} type='nikah'/> 
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
                    {liked_me.length > 0 ? 
                        <div className='likes_members'>
                            {liked_me.map(item => (
                               <MainCard id={item?.user_id} key={item.id} handelNew={handelNew} type='nikah'/> 
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
                    {viewd_them.length > 0 ? 
                        <div className='likes_members'>
                            {viewd_them.map(item => (
                               <MainCard id={item?.target_id} key={item.id} handelNew={handelNew} type='nikah' /> 
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
                     {viewed_me.length > 0 ? 
                        <div className='likes_members'>
                            {viewed_me.map(item => (
                               <MainCard id={item?.user_id} key={item.id} handelNew={handelNew} type='nikah'/> 
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
