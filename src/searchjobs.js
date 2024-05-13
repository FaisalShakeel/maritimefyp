import axios, { all } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ReactLoading from 'react-loading'
import './App.css';

function SearchJobs()
{
   let navigate= useNavigate()
  const[searchParams,setSearchParams]=useSearchParams()
  const[searchQuery,setSearchQuery]=useState(searchParams.get("q"))
  const[searchResults,setSearchResults]=useState([])
  const[successfullyFetched,setSuccessfullyFetched]=useState(false)
  let getSearchResults=async()=>{
    let response=await axios.get("https://maritimebackend.azurewebsites.net/maritime/job/getjobs")
    if(response.data.success)
        {
            let allJobs=response.data.jobs
            setSearchResults(allJobs.filter((job)=>{return(job.title.toLowerCase().includes(searchQuery.toLowerCase())||job.description.toLowerCase().includes(searchQuery.toLowerCase()))}))
            setSuccessfullyFetched(true)


        }
  }
  useEffect(()=>{
    if(successfullyFetched==false)
        {
            getSearchResults()
        }
  })
  if(successfullyFetched==false)
    {
        return(<ReactLoading color="black" height={50} width={50}></ReactLoading>)
    }
    else
    {
     return(<div>
          <div style={{display:"flex",flexDirection:"row",width:"250px",margin:"auto"}}>
                <input style={{width:"170px",borderRadius:"30px",fontFamily:"Caslon Antique",height:"30px",textAlign:"center"}} onChange={(e)=>{
                    setSearchQuery(e.target.value)
                    
                }} placeholder='Search Jobs'/>
                <img src={require('./searchicon.jpg')} style={{height:"35px",marginLeft:"5px", width:"35px",borderRadius:"30px"}} onClick={()=>{getSearchResults()}} />
            </div>
            
                <div id="jobcontainer">
                {
              searchResults.length==0?<h4 style={{fontFamily:"Caslon Antique",fontSize:"12px",textAlign:"center"}}>No Results!</h4>:searchResults.map((job)=>{
                return(
                   <div  key={job.id} id="jobcontainer" onClick={()=>{navigate(`/job/${job.id}`)}}>
                 
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"10px"}}>
                    
                  <img src={job.companyLogoUrl} style={{height:"50px",width:"50px",borderRadius:"30px"}} />
                  <h1 style={{margin:"auto",textAlign:"center",fontWeight:"bold",fontFamily:"Caslon Antique",fontSize:"12px"}}>{job.title.toUpperCase()}</h1>
                  </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <h2 style={{fontSize:"12px",fontFamily:"Caslon Antique",color:"black"}}>{job.location}</h2>
                    <h3 style={{fontSize:"12px",fontFamily:"Caslon Antique", color:"black"}} >{job.postedON}</h3>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
                    <h1 style={{fontSize:"12px",fontFamily:"Caslon Antique",color:"black"}} >{job.contractType}</h1>
                    <h1 style={{fontSize:"12px",fontFamily:"Caslon Antique",color:"black"}} >${job.salary}</h1>
                    </div>
  
                    </div>
                
                   
                    
                 </div>)
            })
                }
            
        </div>
        </div>)
    }

}
export default SearchJobs