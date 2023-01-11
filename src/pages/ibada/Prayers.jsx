import React, { useEffect } from 'react'
import Prayer from '../prayerTimes/Prayer'
import axios, { Axios } from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import useLocation from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';


const Prayers = () => {

    const location = useLocation()
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find( u => u.id === user.uid)
    console.log('loc', location)

    const lat = cuUser?.lat? cuUser?.lat : location?.coordinates?.lat
    const lng= cuUser?.lng ? cuUser?.lng : location?.coordinates?.lng
    // const coordinates = new Coordinates(lat, long);
    // const params = CalculationMethod.MoonsightingCommittee();
    // const date = new Date();
    // const prayerTimes = new PrayerTimes(coordinates, date, params);
    const [prayers, setPrayerTimes] = useState([])
    const [city, setCity] = useState(null)
    const [lati, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const currentTime = moment(new Date()).format('HH:mm') 
    const today = new Date().getUTCDate()
    const currentDate = moment(new Date()).format('DD MMM YYYY') 

    console.log('currentDate', currentDate)

    useEffect(() =>{
        const getCity = async () => {
            const res = await axios.get('https://ipapi.co/json')
            console.log('res', res)
            setCity(res?.data?.city)
            setLat(res?.data?.latitude)
            setLon(res?.data?.longitude)
        } 
        getCity()
    },[])

    // console.log('city', city)
    // console.log('lon', lon)
    // console.log('lati', lati)
    
   



useEffect(() => {
    const fetchData = async () => {
        try {      
            const dataUrl = `https://api.aladhan.com/v1/hijriCalendar?latitude=${lat}&longitude=${lng}`
            const res = await axios.get(dataUrl);
            setPrayerTimes(res?.data?.data)

        } catch (error) {
         console.log(error.message)
        }
    }
    fetchData();
},[lat, lng]);

console.log('prayerTimes', prayers)
const todayTimes = prayers?.find(p => p?.date?.readable  === currentDate)

const TimeZone = () => {
    if(todayTimes?.timings.Fajr < currentTime && currentTime < todayTimes?.timings.Dhuhr){
        return (
            <span>{todayTimes?.timings.Dhuhr}</span>
        )
    }else if(todayTimes?.timings.Dhuhr < currentTime && currentTime < todayTimes?.timings.Asr){
        return (
            <span>{todayTimes?.timings.Asr}</span>
        )
    }else if(todayTimes?.timings.Asr < currentTime && currentTime < todayTimes?.timings.Maghrib){
        return (
            <span>{todayTimes?.timings.Maghrib}</span>
        )
    }else if(todayTimes?.timings.Maghrib < currentTime && currentTime < todayTimes?.timings.Isha){
        return (
            <span>{todayTimes?.timings.Isha}</span>
        )
    }else if(todayTimes?.timings.Isha < currentTime && currentTime < todayTimes?.timings.Fajr){
        return (
            <span>{todayTimes?.timings.Fajr}</span>
        )
    }
}

const nextPrayer = TimeZone()?.props.children
// const currentTime = moment(new Date()).format('HH:mm') 

console.log('time', nextPrayer)
console.log('currentTime', currentTime)
const tr = nextPrayer - currentTime
console.log('tr', tr)


  return (
    <div className='prayer_outer'>
     {/* <Prayer /> */}
     <div className="current_time">
        <h3>{cuUser?.location ? cuUser?.location : city}</h3>
        {/* <span>Muda uliosalia</span> */}
        {/* <h1>00.45.22</h1> */}
        <small>{todayTimes?.date?.readable} - {todayTimes?.date?.hijri?.date}</small>
        <div className="prayer_date_times">
            <div className={todayTimes?.timings.Fajr < currentTime && currentTime < todayTimes?.timings.Dhuhr ? 'active_card' : 'prayer_card'}>
                <h4>Fajr</h4>
                <span>{todayTimes?.timings.Fajr}</span>
            </div>
            <div className={todayTimes?.timings.Dhuhr < currentTime && currentTime < todayTimes?.timings.Asr ? 'active_card' : 'prayer_card'}>
                <h4>Dhuhr</h4>
                <span>{todayTimes?.timings.Dhuhr}</span>
            </div>
            <div className={todayTimes?.timings.Asr < currentTime && currentTime < todayTimes?.timings.Maghrib ? 'active_card' : 'prayer_card'}>
                <h4>Asr</h4>
                <span>{todayTimes?.timings.Asr}</span>
            </div>
            <div className={todayTimes?.timings.Maghrib < currentTime && currentTime < todayTimes?.timings.Isha ? 'active_card' : 'prayer_card'}>
                <h4>Maghrib</h4>
                <span>{todayTimes?.timings.Maghrib}</span>
            </div>
            <div className={todayTimes?.timings.Isha < currentTime && currentTime < todayTimes?.timings.Fajr ? 'active_card' : 'prayer_card'}>
                <h4>Isha</h4>
                <span>{todayTimes?.timings.Isha}</span>
            </div>
        </div>
     </div>
     <div className="prayer_lists">
        {prayers?.map(p => (
            <div className="prayer_date">
                <div className="prayer_date_top">
                    <h4>{p.date.readable}</h4>
                    <h4>-</h4>
                    <span>{p.date.hijri.date}</span>
                </div>
                <div className="prayer_date_times">
                    <div className="prayer_card">
                        <h4>Fajr</h4>
                        <span>{p.timings.Fajr}</span>
                    </div>
                    <div className="prayer_card">
                        <h4>Dhuhr</h4>
                        <span>{p.timings.Dhuhr}</span>
                    </div>
                    <div className="prayer_card">
                        <h4>Asr</h4>
                        <span>{p.timings.Asr}</span>
                    </div>
                    <div className="prayer_card">
                        <h4>Maghrib</h4>
                        <span>{p.timings.Maghrib}</span>
                    </div>
                    <div className="prayer_card">
                        <h4>Isha</h4>
                        <span>{p.timings.Isha}</span>
                    </div>
                </div>
            </div>
            
        ))}
     </div>
    </div>
  )
}

export default Prayers
