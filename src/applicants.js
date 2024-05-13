import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
function Applicants()
{

let navigate=useNavigate() 
const{Id}=useParams()
const[applicants,setApplicants]=useState([])
const[isFetched,setIsFetched]=useState(false)
useEffect(()=>{
    async function getApplicants()
    {
        let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/job/getjob/${Id}`)
       if(response.data.success)
        {
            setApplicants(response.data.job.applicants)
            setIsFetched(true)
        } 
    }
    if(isFetched==false)
        {
            getApplicants()
        }
})
if(isFetched==false)
    {
        return(<h1>There Was An Error While Getting Applicants</h1>)
    }
    else 
    {
        return(<div>
            {applicants.length==0?<h1>NO Applicants</h1>:applicants.map((applicant)=>{
                return(<div style={{display:"flex",flexDirection:"column",width:"280px",margin:"auto",backgroundColor:"lightblue",borderRadius:"5px"}}>
                    <h1 style={{fontFamily:"Caslon Antique",fontSize:"12px",textAlign:"center"}}>{applicant.name}</h1>
                    <a href={applicant.resumeUrl} style={{margin:"auto",fontFamily:"Caslon Antique"}}>View Resume</a>
                    <button style={{width:"100px",margin:"auto",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"5px"}} onClick={()=>{
                        navigate(`/chat/${applicant.ID}`)
                    }}>Chat</button>
                    </div>)
            })}
        </div>)
    }
}

export default Applicants
