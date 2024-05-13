import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import SignUp from './signup';
import Home from './home';
import Login from './login';
import Profile from './profile';
import AddCourse from './createcourse';
import AddJob from './postjob';
import Courses from './courses';
import Jobs from './jobs';
import Course from './course';
import Job from './job';
import EditProfile from './editprofile';
import SearchJobs from './searchjobs';
import SearchCourses from './searchcourses';
import EditJob from './editjob';
import EditCourse from './editcourse';
import AddLec from './addlec';
import EditLec from './editlec';
import Lec from './lec';
import Chat from './chat';
import {io} from 'socket.io-client'
import { useState,useEffect } from 'react';
import MyChats from './chats';
import Applicants from './applicants';
import Enrollments from './enrollments';
import MyNotifications from './notifications';

function App() {
  const[socket,setSocket]=useState(null)
  useEffect(()=>{
  let _socket =io("https://maritimebackend.azurewebsites.net",{query:{userId:localStorage.getItem("UID")}})
  setSocket(_socket)
  },[]) 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/profile/:Id' element={<Profile/>}></Route>
      <Route path='/addcourse' element={<AddCourse/>}></Route>
      <Route path='/postjob' element={<AddJob/>}></Route>
      <Route path='/courses' element={<Courses/>}></Route>
      <Route path='/jobs' element={<Jobs/>}></Route>
      <Route path='/course/:Id' element={<Course/>}></Route>
      <Route path='/job/:Id' element={<Job/>}></Route>
      <Route path='/editprofile' element={<EditProfile/>}></Route>
      <Route path='/searchjobs' element={<SearchJobs/>}></Route>
      <Route path='/searchcourses' element={<SearchCourses/>}></Route>
      <Route path='/editjob/:Id' element={<EditJob/>}></Route>
      <Route path='/editcourse/:Id' element={<EditCourse/>}></Route>
      <Route path='/addlec/:Id' element={<AddLec/>}></Route>
      <Route path='editLec/:courseId/:lecId' element={<EditLec/>}></Route>
      <Route path='/lec/:courseId/:lecId' element={<Lec/>}></Route>
      <Route path='/mychats' element={<MyChats/>}></Route>
      <Route path='/chat/:receiverId' element={<Chat socket={socket} />} ></Route>
      <Route path='/applicants/:Id' element={<Applicants/>}></Route>
      <Route path='/enrollments/:courseId' element={<Enrollments/>}></Route>
      <Route path='/notifications' element={<MyNotifications/>}></Route>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
