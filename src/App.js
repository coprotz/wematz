import './hooks/useAuth.js'
import './App.css';
import Home from './pages/home/Home.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Posts from './pages/posts/Posts.jsx';
import Nikah from './pages/nikah/Nikah.jsx';
import NikahView from './pages/nikah/NikahView.jsx';
import Meetings from './pages/meetings/Meetings.jsx';
import ViewMeeting from './pages/meetings/ViewMeeting.jsx';
import Madas from './pages/mada/Madas.jsx';
import Main from './pages/main/Main.jsx';
import Register from './pages/register/Register.jsx';
import Subscriptions from './pages/subscriptions/Subscriptions.jsx';
import Recipies from './pages/recipies/Recipies.jsx';
import News from './pages/news/News.jsx';
import Questions from './pages/questions/Questions.jsx';

import Opportunities from './pages/opportunities/Opportunites.jsx';
import Health from './pages/health/Health.jsx';
import NeedHelps from './pages/needHelps/NeedHelps.jsx';
import Legals from './pages/legals/Legals.jsx';
import Doctors from './pages/health/Doctors.jsx';
import MainHealth from './pages/health/MainHealth.jsx';
import ViewDoctor from './pages/health/ViewDoctor.jsx';
import AllRecipies from './pages/recipies/AllRecipies.jsx';
import ViewRecipie from './pages/recipies/ViewRecipie.jsx';
import ViewClinic from './pages/health/ViewClinic.jsx';
import NewsMain from './pages/news/NewsMain.jsx';
import ViewNews from './pages/news/ViewNews.jsx';
import QueMain from './pages/questions/QueMain.jsx';
import ViewQue from './pages/questions/ViewQue.jsx';
import CreateQue from './pages/questions/CreateQue.jsx';
import Messages from './pages/messages/Messages.jsx';
import MainMessages from './pages/messages/MainMessages.jsx';
import ViewChat from './pages/messages/ViewChat.jsx';
import Mainlegals from './pages/legals/Mainlegals.jsx';

import MainNikah from './pages/nikah/MainNikah.jsx';
import ViewLawyer from './pages/legals/ViewLawyer.jsx';
import NikahReg from './pages/register/NikahReg.jsx';
import Login from './pages/login/Login.jsx';
import { onMessageListener, requestForToken, useAuth } from './hooks/useAuth.js';
import Profile from './pages/profile/Profile.jsx';
import ViewPost from './pages/posts/ViewPost.jsx';
import RegDoctors from './pages/opportunities/RegDoctors.jsx';
import RegLawyers from './pages/opportunities/RegLawyers.jsx';
import AllOppo from './pages/opportunities/AllOppo.jsx';
import Activities from './pages/activities/Activities.jsx';
import MyAccounts from './pages/profile/MyAccounts.jsx';
import Members from './pages/members/Members.jsx';
import AddMeeting from './pages/meetings/AddMeeting.jsx';
import MeetingOutline from './pages/meetings/MeetingOutline.jsx';
import Invited from './pages/meetings/Invited.jsx';
import MyMeetings from './pages/meetings/MyMeetings.jsx';
import Edit from './pages/meetings/Edit.jsx';

import Donates from './pages/donates/Donates.jsx';

import Admin from './pages/admin/Admin.jsx';
import MainMada from './pages/mada/MainMada.jsx';
import ViewMada from './pages/mada/ViewMada.jsx';
import ViewMember from './pages/members/ViewMember.jsx';
import About from './pages/about/About.jsx';
import Contacts from './pages/contacts/Contacts.jsx';
import Makala from './pages/health/Makala.jsx';
import { useEffect } from 'react';
import Ibada from './pages/ibada/Ibada.jsx';
import Quran from './pages/ibada/Quran.jsx';
import Prayers from './pages/ibada/Prayers.jsx';
import Nyiradi from './pages/ibada/Nyiradi.jsx';
import Sunnah from './pages/ibada/Sunnah.jsx';
// import useData from './hooks/useData';


function App() {

  const { user, alert, confirm }= useAuth()
  // const { doctors, notifics, lawyers, marriages, users } = useData()

  const RequireAuth = ({children}) => {
    return user ? (children) : <Navigate to="/main"/>
  }

  async function requestPermission() {
    const permission = await Notification.requestPermission();

    if(permission === "granted"){
      requestForToken();
      onMessageListener()     
      }else if(permission === "denied"){
      alert('Umezuia kupokea Notification kutoka Wema Forum')
    }
  }

  useEffect(() => {
    user && requestPermission()
  }, [])

//   useEffect(() => {
//     user && 
// },[])


    // const dr = doctors?.find(d => d.userId === user.uid)
    // const law = lawyers?.find(l =>l.userId === user.uid)
    // const cuUser = users?.find(u => u.id === user.uid)
    // const marry = marriages?.find(m => m.userId === user.uid)

    // const usernots = notifics?.filter(n => n.target_id === user.uid)
    // const drnots = notifics?.filter(n => n.target_id === dr?.id)
    // const lawnots = notifics?.filter(n => n.target_id === law?.id)
    // const marrynots = notifics?.filter(n => n.target_id === marry?.id)

    // const a = drnots.concat(usernots)
    // const b = a.concat(lawnots)
    // const allnots = b.concat(marrynots)
    // const mynots = allnots?.filter(a => a.isSeen == false)

    
    // const lastnot = mynots?.at(-1)
    // console.log('lastnot', lastnot)

  // useEffect(() => {
  //   if(!('Notification' in window)){
  //     alert("Browser yako haikubali notifications")
  //   } 
    
  //   else if(Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if(permission === "granted"){
  //         const notification = new Notification("Wema Muslim Ummah", {
  //           body: "Asante kwa kuruhusu notification kutoka Wema",
  //           icon: "logo_512.png",
            
  //         })
  //       }
  //     })
  //   }
  // },[])

  // const sender = users.find(u => u.id === lastnot?.uid)

  // useEffect(() => {    
  //   if(Notification.permission !== "granted") {
  //     Notification.requestPermission().then((permission) => {
  //       if(permission === "granted"){
  //         const notification = new Notification("Wema Muslim Ummah", {
  //           body: `${sender?.name}`+" "+`${lastnot?.action}`+" "+`${lastnot?.type}`,
  //           icon: "logo_512.png",
  //           tag: `${lastnot?.id}`
  //         })
  //       }
  //     })
  //   }
  // },[])

  return (
    <div className="App">
      <BrowserRouter>    
        <Routes>
          <Route path='/' element={ 
            <RequireAuth>
              <Home/> 
            </RequireAuth>}>          
            <Route index element={<Posts/>}></Route>
            <Route path=':id' element={<ViewPost/>}></Route>
            <Route path='madas' element={<MainMada/>}>
              <Route index element={<Madas/>}/>
              <Route path=':id' element={<ViewMada/>}/>
            </Route>
            <Route path='members' element={<Members/>}></Route>
            <Route path='members/:id' element={<ViewMember/>}></Route>
            <Route path='meetings' element={<MeetingOutline/>}>
              <Route index element={<Meetings/>}/>
              <Route path='create' element={<AddMeeting/>}/>
              <Route path='mymeetings' element={<MyMeetings/>}/>
              <Route path='invited' element={<Invited/>}/>
              <Route path='edit' element={<Edit/>}/>
              <Route path='id' element={<ViewMeeting/>}/>
            </Route>
            <Route path='activities' element={<Activities/>}></Route>
            <Route path='recipies' element={<AllRecipies/>}>
              <Route index element={<Recipies/>}/>
              <Route path='recipies' element={<Recipies/>}/>
              <Route path=':id' element={<ViewRecipie/>}/>
            </Route>
            <Route path='nikah' element={<MainNikah/>}>
              <Route index element={<Nikah/>}/>
              <Route path='nikah' element={<Nikah/>}/>  
               <Route path=':id' element={<NikahView/>}/>            
            </Route> 
            <Route path='health' element={<Health/>}>
              <Route index element={<MainHealth/>}/>
              <Route path='health' element={<MainHealth/>}/>
              <Route path='doctors' element={<Doctors/>}/>
              <Route path='makala' element={<Makala/>}/>
              <Route path='doctors/:id' element={<ViewDoctor/>}/>
              <Route path='clinics/:name' element={<ViewClinic/>}/>
            </Route>
            <Route path='news' element={<News/>}>
              <Route index element={<NewsMain/>}/>
              <Route path='news' element={<NewsMain/>}/>           
              <Route path=':id' element={<ViewNews/>}/>            
            </Route>
            <Route path='questions' element={<Questions/>}>
              <Route index element={<QueMain/>}/>
              <Route path='questions' element={<QueMain/>}/>     
              <Route path='createQue' element={<CreateQue/>}/>        
              <Route path=':id' element={<ViewQue/>}/>            
            </Route>
            <Route path='messages' element={<Messages/>}>
              <Route index element={<MainMessages/>}/>
              <Route path='messages' element={<MainMessages/>}/>     
              <Route path='contacts' element={<CreateQue/>}/>   
              <Route path='profile' element={<CreateQue/>}/> 
              <Route path=':id' element={<ViewChat/>}/>            
            </Route>
            <Route path='legals' element={<Legals/>}>
              <Route index element={<Mainlegals/>}/>
              <Route path='legals' element={<Mainlegals/>}/>  
               <Route path=':id' element={<ViewLawyer/>}/>            
            </Route>
            <Route path='ibada' element={<Ibada/>}>
              <Route index element={<Quran/>}/>
              <Route path='quran' element={<Quran/>}/>  
              <Route path='swala' element={<Prayers/>}/>  
              <Route path='nyiradi' element={<Nyiradi/>}/> 
              <Route path='sunnah' element={<Sunnah/>}/> 
               {/* <Route path=':id' element={<ViewLawyer/>}/>             */}
            </Route>
            <Route path='admin' element={<Admin/>}></Route>            
            <Route path='needHelps' element={<NeedHelps/>}></Route>
            <Route path='myAccounts' element={<MyAccounts/>}></Route>
            <Route path='mjaheed' element={<Donates/>}></Route>
              
            {/* <Route path='opportunites' element={<Opportunities/>}></Route> */}
            {/* <Route path='nikah/:id' element={<NikahView/>}></Route> */}
            {/* <Route path='nikah' element={<Nikah/>}></Route>   */}
                    
          </Route>
          <Route path='nikahreg' element={<NikahReg/>}></Route> 
          <Route path='opportunities' element={ 
              <RequireAuth>
                <AllOppo/> 
              </RequireAuth>}>
              <Route index element={<Opportunities/>}></Route>
              <Route path='doctors' element={<RegDoctors/>}></Route> 
              <Route path='lawyers' element={<RegLawyers/>}></Route> 
          </Route> 
          <Route path='profile' element={ 
            <RequireAuth>
              <Profile/> 
            </RequireAuth>}>
          </Route>
          {/* <Route path='meetings/:id' element={<ViewMeeting/>}></Route> */}
          <Route path='main' element={<Main/>}></Route>
          <Route path='/subscriptions' element={<Subscriptions/>}></Route>
          <Route path='/prayerTimes' element={<Subscriptions/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contacts' element={<Contacts/>}></Route>
          </Routes>
      </BrowserRouter>
      {alert && <div className='alert_container'>{alert}</div>}
      {/* {confirm && <NewChat/>} */}
    </div>
  );
}

export default App;
