import React, { useState } from 'react'
import { useEffect } from 'react';
import {  BsArrowRight } from "react-icons/bs";
import './prayer.css'
import axios from 'axios';
import moment from 'moment';


const Prayer = () => {

  const [prayerTimes, setPrayerTimes] = useState({
    loading: false,
    prayers: [],
    errMessage: ''
})

const lat = '-6.181240'
const long= '35.748161'

useEffect(() => {
    const fetchData = async () => {
        try {
          setPrayerTimes({
                ...prayerTimes,
                loading: true,
            });

            const dataUrl = `https://api.aladhan.com/v1/hijriCalendar?latitude=${lat}&longitude=${long}`
            const res = await axios.get(dataUrl);
            setPrayerTimes({
                ...prayerTimes,
                prayers: res.data,
                loading: false,
            })
        } catch (error) {
          setPrayerTimes({
                ...prayerTimes,
                loading: false,                    
                errMessage: 'Sorry Something is wrong',

            });
        }
    }
    fetchData();
},[]);


const currentDate = moment(new Date()).format('DD-M-YYYY') 
const currentTime = moment(new Date()).format('HH:mm') 
const todayTimes = prayerTimes?.prayers?.data?.find(p => p?.date?.gregorian?.date === currentDate)

console.log('todayTimes', todayTimes)




// const Dhuhr = todayTimes?.timings.Dhuhr < currentTime < todayTimes?.timings.Asr



console.log('currentDate', currentDate)
console.log('currentTime', currentTime)

const CurrentTime = () => {
  if(todayTimes?.timings.Isha < currentTime && currentTime < 24 + todayTimes?.timings.Fajr){
    return (
      <div className="prayer_time">
        <div className="current">
        <small>Swala ya Sasa</small>
          <span>Isha</span>
          <h4>{todayTimes?.timings.Isha}</h4>
        </div>
        <div className="next">
          <small>Inayofuata</small>
          <span>Fajr</span>
          <h4>{todayTimes?.timings.Fajr}</h4>
        </div>
      </div>
    )
  }else if(todayTimes?.timings.Fajr < currentTime && currentTime < todayTimes?.timings.Dhuhr ){
    return (
      <div className="prayer_time">
        <div className="current">
        <small>Swala ya Sasa</small>
          <span>Fajr</span>
          <h4>{todayTimes?.timings.Fajr}</h4>
        </div>
        <div className="next">
          <small>Inayofuata</small>
          <span>Dhuhr</span>
          <h4>{todayTimes?.timings.Dhuhr}</h4>
        </div>
      </div>
    )
  }else if(todayTimes?.timings.Dhuhr < currentTime && currentTime < todayTimes?.timings.Asr){
    return (
      // <div className="prayer_time">
      //     <span>Dhuhr</span>
      //     <h4>{todayTimes?.timings.Dhuhr}</h4>
      // </div>
      <div className="prayer_time">
       <div className="current">
        <small>Current</small>
        <span>Dhuhr</span>
        <h4>{todayTimes?.timings.Dhuhr}</h4>
       </div>
       <div className="next">
        <small>Next</small>
        <span>Asr</span>
        <h4>{todayTimes?.timings.Asr}</h4>
       </div>
     </div>
    )
  }else if(todayTimes?.timings.Asr < currentTime && currentTime < todayTimes?.timings.Maghrib){
    return (
      <div className="prayer_time">
        <div className="current">
        <small>Swala ya Sasa</small>
          <span>Asr</span>
          <h4>{todayTimes?.timings.Asr}</h4>
        </div>
        <div className="next">
          <small>Inayofuata</small>
          <span>Maghrib</span>
          <h4>{todayTimes?.timings.Maghrib}</h4>
        </div>
      </div>
    )
  }else if(todayTimes?.timings.Maghrib < currentTime && currentTime < todayTimes?.timings.Isha){
    return (
      <div className="prayer_time">
        <div className="current">
          <span>Maghrib</span>
          <h4>{todayTimes?.timings.Maghrib}</h4>
        </div>
        <div className="next">
          <span>Asr</span>
          <h4>{todayTimes?.timings.Asr}</h4>
        </div>
      </div>
    )
  }else{
    return null
  }
}


  return (
    <div className='prayer'>
      <div className="prayer_top">
        <small>Prayer Time</small><span>-</span><small> DODOMA</small>
        {/* <button className='btn_next btn'><BsArrowRight/></button> */}
      </div>
      <div className="prayer_details">        
        {/* <h1 className='time_remaining'>03:55:24</h1> */}
        <small>{todayTimes?.date?.readable} - {todayTimes?.date?.hijri?.date}</small>
        <div className="prayer_grids">
            {/* <div className="prayer_time">
                <span>FAJR</span>
                <h4>05:23</h4>
            </div> */}
            {CurrentTime()}
            {/* <div className="prayer_time">
                <span>DHUHR</span>
                <h4>12:33</h4>
            </div> */}
        </div>
        <button>View All</button>
      </div>
    </div>
  )
}

export default Prayer
