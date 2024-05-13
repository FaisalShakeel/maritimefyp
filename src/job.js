import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useSearchParams } from "react-router-dom"
import storage from "./firebaseConfig"
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import axios from "axios"
import { useNavigate } from "react-router"
import './App.css'
import { ToastContainer, toast } from "react-toastify"
function Job()
{
  let navigate=useNavigate()
  
   const {Id}=useParams()
   const[job,setJob]=useState({})
   const[successfullyFetched,setSuccessfullyFetched]=useState(false)
   const[isOpen,setIsOpen]=useState(false)
   const[resumeUrl,setResumeUrl]=useState("")
   useEffect(()=>{
    async function getJob()
    {
        
         let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/job/getjob/${Id}`)
         if(response.data.success)
         {
             console.log(response.data.job)
             setSuccessfullyFetched(true)
             setJob(response.data.job)
         }
    }
    if(successfullyFetched==false)
    {
    getJob()
    }
   })
   if(successfullyFetched==false)
   {

   }
  return(<div id="jobcontainer" style={{height:"auto"}} >
    
    <h1  style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{job.title}</h1>
    
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{job.description}</p>
  
    
    <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px",textTransform:"uppercase"}}>Requirements</h2>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}} >{job.requirements}</p>
    <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px",textTransform:"uppercase"}}>Responsibilities</h2>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}} >{job.responsibilities}</p>
    <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px",textTransform:"uppercase"}} >Perks And Benefits</h2>
    <p  style={{fontFamily:"Caslon Antique",textAlign:"center"}} >{job.perksAndBenefits}</p>
    <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px",textTransform:"uppercase"}} >Salary</h2>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}} >${job.salary}</p>
    <h2  style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px",textTransform:"uppercase"}} >Location</h2>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}} >{job.location}</p>
    <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px"}} >CONTRACT TYPE</h2>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{job.contractType}</p>
    <h1 style={{fontFamily:"Caslon Antique",textAlign:'center',fontSize:"12px"}}>WHO ARE WE?</h1>
    <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>{job.companyBio}</p>
  {localStorage.getItem("UID")==job.uploadedById||localStorage.getItem("role")=="admin"||localStorage.getItem("role")=="student"?<></>:<button style={{width:"130px",borderRadius:"30px",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{setIsOpen(true)}}>Apply</button>} 
    <div style={{display:"flex",flexDirection:"column",width:"300px",backgroundColor:"lightgray",margin:"auto",borderRadius:"5px"}} onClick={()=>{
     navigate(`/profile/${job.uploadedById}`) 
    }}>
            <img src={job.uploadedByPhoto} style={{height:"40px",width:"40px",borderRadius:"30px",margin:"auto"}}/>
            <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px"}}>{job.uploadedByName}</h1>
            
        </div>
        <dialog open={isOpen}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <h2 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px"}}>RESUME</h2>
            <button style={{marginLeft:"auto",fontFamily:"Caslon Antique",borderRadius:"30px"}} onClick={()=>{setIsOpen(false)}}>Close</button>
            </div>
            
            <input  type="file" accept=".pdf" style={{width:"100%",fontFamily:"Caslon Antique"}}  onChange={(e)=>{
              async function uploadResume()
              {
                let selectedFile=e.target.files[0]
               let storageRef=ref(storage,selectedFile.name+Math.random())
               await uploadBytes(storageRef,selectedFile)
              let resumeURL=await getDownloadURL(storageRef)
              setResumeUrl(resumeURL)
              }
              uploadResume()
            }}/>
             {resumeUrl.length==0?<h1 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>RESUME Will Appear Here</h1>:<Link target="_blank" to={resumeUrl}>Go To Resume</Link>}
          
            <button style={{fontFamily:"Caslon Antique",width:"130px",borderRadius:"30px",margin:"auto"}} onClick={()=>{
              async function apply()
              {
               let response= await axios.post(`https://maritimebackend.azurewebsites.net/maritime/job/apply/${Id}/${localStorage.getItem("UID")}`,{resumeUrl})
               if(response.data.success)
               {
                toast.success("Successfully Uploaded!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
               }
               else
               {
                toast.error("Cannot Upload Resume!You May Have Applied For This Job Earlier!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
               }

              }
              apply()
            }}>
              UPLOAD
            </button>
           
          </div>
        </dialog>
        <ToastContainer/>
      
  </div>)  
}
export default Job