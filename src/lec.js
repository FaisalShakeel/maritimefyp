import axios from "axios";
import { useDebugValue, useEffect, useState } from "react";
import { useInRouterContext, useNavigate, useParams } from "react-router";
import ReactLoading from 'react-loading'
import { ToastContainer, toast } from "react-toastify";

import './App.css'
function Lec ()
{
    const{courseId,lecId}=useParams()
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    const[isCompleted,setIsCompleted]=useState(false)
    const[lec,setLec]=useState({})
    console.log(courseId)
    console.log(lecId)
    let navigate=useNavigate()
    const[adminId,setAdminId]=useState("")
    let getLec=async()=>{
        console.log("Calling Get Lec")
        let _response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getcourse/${courseId}`)
        let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getlec/${courseId}/${lecId}`)
        if(response.data.success && _response.data.success)
            {
                console.log(response.data.lec)
                setLec(response.data.lec)
                setAdminId(_response.data.course.addedBy)
                setSuccessfullyFetched(true)
                let completedBy=response.data.lec.completedBy
                console.log(completedBy)
                for(let user of completedBy)
                    {
                        if(user.ID==localStorage.getItem("UID"))
                            {
                                setIsCompleted(true)
                            }
                    }
            }

    }
    useEffect(()=>{
        if(successfullyFetched==false)
            {
                getLec()
            }
    })
    if(successfullyFetched==false)
        {
            <ReactLoading height={50} width={50} color="black"></ReactLoading>
        }
        else
        {
            return(<div id="jobcontainer" >
                <video src={lec.videoUrl}></video>
                <h1 style={{fontSize:"13px",textAlign:"center"}}>{lec.title}</h1>
                <p style={{textAlign:"center"}}>{lec.description}</p>
                <ToastContainer/>
                <button style={{width:'150px',margin:"auto",color:"white",fontFamily:"Caslon Antique",backgroundColor:"blue",borderRadius:"5px"}} onClick={()=>{
                    navigate(`/chat/${adminId}`)
                }} >Chat</button>
                <button style={{width:'150px',margin:"auto",color:"white",fontFamily:"Caslon Antique",backgroundColor:"blue",borderRadius:"5px"}} onClick={()=>{
                    async function updateMyCourseProgress()
                    {
                        let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/course/updateprogress/${courseId}/${localStorage.getItem("UID")}/${lecId}`) //updating my course progress 
                        if(response.data.success)
                        {
                            toast.success("Progress Updated",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                            getLec()
                        }
                        else
                        {
                            toast.error("Cannot Update Progress!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                        }

                    }
                    updateMyCourseProgress()
                }} >{isCompleted?"Completed":"Complete"}</button>
            </div>)

        }

}
export default Lec