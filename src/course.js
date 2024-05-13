import { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from'react-loading';
import './App.css'
import ExportMenu from 'rc-menu';
function Course()
{

    let navigate=useNavigate()
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [course,setCourse]=useState({})
    const[isEnrolled,setIsEnrolled]=useState(false)
    const {Id}=useParams()
    let getCourse=async()=>{
        let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getcourse/${Id}`)
        if(response.data.success)
        {

            console.log(response.data.course)
            let enrolledBy=response.data.course.enrolledBy
            console.log(enrolledBy)
            let isEnrolled=false
            for(let user of enrolledBy)
            {
                if(user.ID==localStorage.getItem("UID"))
                {
                    isEnrolled=true
                }
            }
          
            setIsEnrolled(isEnrolled)
            setCourse(response.data.course)
            console.log(course)
            setSuccessfullyFetched(true)
        }
        

    }
    useEffect(()=>{
        
    if(successfullyFetched==false)
    {
    getCourse()


    }

    
    })
   if(successfullyFetched && Object.keys(course).length>0)
   {
    return(
    <div style={{display:"flex",flexDirection:"column",backgroundColor:"lightblue",borderRadius:"5px"}}>
        <video src={course.previewUrl} controls={true} style={{height:"200px",width:"250px",margin:"auto"}}></video>
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center"}}>{course.title}</h1>
        <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{course.description}</p>
        <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px",textTransform:"uppercase"}}>Experience Level</h2>
        <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{course.experienceLevel}</p>
        <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px",textTransform:"uppercase"}}>What You Should Know</h1>
        <p style={{fontFamily:"Caslon Antique",textAlign:"center"}} >{course.prerequisites}</p>
        {isEnrolled?<div style={{display:"flex",flexDirection:"column"}}>

        <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px",textTransform:"uppercase"}}>Course Outilne</h1>
        {course.lecs.length==0?<h1 style={{fontSize:"10px",textAlign:"center",fontFamily:"Caslon Antique"}}>No Outline Yet!</h1>:course.lecs.map((lec)=>{
          return(<h2 onClick={()=>{
            navigate(`/lec/${Id}/${lec.ID}`)
          }} style={{fontFamily:"Caslon Antique",fontSize:"10px",textAlign:"center"}}>{lec.title}</h2>)
        })}  </div>:<></>}
       
        <div style={{display:"flex",flexDirection:"column",width:"300px",backgroundColor:"lightgray",margin:"auto",borderRadius:"5px"}} onClick={()=>{
            navigate(`/profile/${course.addedBy}`)
        }}>
            <img src={course.creatorProfilePhotoUrl} style={{height:"40px",width:"40px",borderRadius:"30px",margin:"auto"}}/>
            <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px"}}>{course.creatorName}</h1>
            <p style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"10px"}}>{course.creatorBio}</p>
        </div>
        {Id==localStorage.getItem("UID")||localStorage.getItem("role")=="admin"||localStorage.getItem("role")=="job seeker"?<></>:isEnrolled?<h1 style={{fontFamily:"Caslon Antique",fontSize:"12px",textAlign:"center"}}>ENROLLED</h1>:<button style={{width:"140px",borderRadius:"30px",margin:"auto",marginTop:"10px",fontFamily:"Caslon Antique"}} onClick={()=>{
            async function enrollInCourse()
            {
                let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/course/enroll/${Id}/${localStorage.getItem("UID")}`)
                if(response.data.success)
                    {
                        toast.success("Successfully Enrolled In The Course",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    getCourse()
                    }
                    else
                    {
                        toast.error("There Was An Error While Enrolling!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})

                    }
            }
            enrollInCourse()
        }}>ENROLL FREE</button>}
        <ToastContainer/>
    </div>)

   }
   else
   {
    return(<ReactLoading height={50} width={50} color='black'></ReactLoading>)
   }
   
}
export default Course

/*
*/