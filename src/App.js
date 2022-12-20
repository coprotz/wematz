import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Posts from './pages/posts/Posts';
import Nikah from './pages/nikah/Nikah';
import NikahView from './pages/nikah/NikahView';
import Meetings from './pages/meetings/Meetings';
import ViewMeeting from './pages/meetings/ViewMeeting';
import Madas from './pages/mada/Madas';
import Main from './pages/main/Main';
import Register from './pages/register/Register';
import Subscriptions from './pages/subscriptions/Subscriptions';
import Recipies from './pages/recipies/Recipies';
import News from './pages/news/News';
import Questions from './pages/questions/Questions';
import { MdMessage } from 'react-icons/md';
import Opportunities from './pages/opportunities/Opportunites';
import Health from './pages/health/Health';
import NeedHelps from './pages/needHelps/NeedHelps';
import Legals from './pages/legals/Legals';
import Doctors from './pages/health/Doctors';
import MainHealth from './pages/health/MainHealth';
import ViewDoctor from './pages/health/ViewDoctor';
import AllRecipies from './pages/recipies/AllRecipies';
import ViewRecipie from './pages/recipies/ViewRecipie';
import ViewClinic from './pages/health/ViewClinic';
import NewsMain from './pages/news/NewsMain';
import ViewNews from './pages/news/ViewNews';
import QueMain from './pages/questions/QueMain';
import ViewQue from './pages/questions/ViewQue';
import CreateQue from './pages/questions/CreateQue';
import Messages from './pages/messages/Messages';
import MainMessages from './pages/messages/MainMessages';
import ViewChat from './pages/messages/ViewChat';
import Mainlegals from './pages/legals/Mainlegals';
import Lawyer from './pages/legals/Lawyer';
import MainNikah from './pages/nikah/MainNikah';
import ViewLawyer from './pages/legals/ViewLawyer';
import NikahReg from './pages/register/NikahReg';
import Login from './pages/login/Login';
import { useAuth } from './hooks/useAuth';
import Profile from './pages/profile/Profile';
import ViewPost from './pages/posts/ViewPost';
import RegDoctors from './pages/opportunities/RegDoctors';
import RegLawyers from './pages/opportunities/RegLawyers';
import AllOppo from './pages/opportunities/AllOppo';
import Activities from './pages/activities/Activities';
import MyAccounts from './pages/profile/MyAccounts';
import Members from './pages/members/Members';
import AddMeeting from './pages/meetings/AddMeeting';
import MeetingOutline from './pages/meetings/MeetingOutline';
import Invited from './pages/meetings/Invited';
import MyMeetings from './pages/meetings/MyMeetings';
import Edit from './pages/meetings/Edit';
import NewChat from './pages/messages/NewChat';
import Donates from './pages/donates/Donates';
import AdminMain from './pages/admin/AdminMain';
import Admin from './pages/admin/Admin';
import MainMada from './pages/mada/MainMada';
import ViewMada from './pages/mada/ViewMada';
import ViewMember from './pages/members/ViewMember';
import About from './pages/about/About';
import Contacts from './pages/contacts/Contacts';
import Makala from './pages/health/Makala';
import { useEffect } from 'react';
import useData from './hooks/useData';


function App() {

  const { user, alert, confirm }= useAuth()
  // const { doctors, notifics, lawyers, marriages, users } = useData()

  const RequireAuth = ({children}) => {
    return user ? (children) : <Navigate to="/main"/>
  }

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
