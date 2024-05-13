
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './App.css';

import { useNavigate } from 'react-router';
function Jobs() {
    let navigate=useNavigate()
    const[selectedLocation,setSelectedLocation]=useState("All")
    const[selectedContractType,setContractType]=useState("All")
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const[searchQuery,setSearchQuery]=useState("")
    const [jobs,setJobs]=useState([])
    const[allJobs,setAllJobs]=useState([])
    let getJobs=async()=>{
      let response=  await axios.get("https://maritimebackend.azurewebsites.net/maritime/job/getjobs")
      if(response.data.success)
      {
        console.log(response.data.jobs)
        setSuccessfullyFetched(true)
        setAllJobs(response.data.jobs)
        setJobs(response.data.jobs)
      }
      else
      {
        setSuccessfullyFetched(false)
      }
    }
    useEffect(()=>{
  

        if(successfullyFetched==false)
        {
            getJobs()
        }

    })
    if(successfullyFetched==false)
    {
    return<div className='h-[70px] w-[70px] m-auto'>
    <ReactLoading color='black' type='spin' height={60} width={60}></ReactLoading>
    </div>
    }
    else 
    {
      
             return(<div>
              <div style={{display:"flex",flexDirection:"row",width:"250px",margin:"auto"}}>
                <input style={{width:"170px",borderRadius:"30px",fontFamily:"Caslon Antique",height:"30px",textAlign:"center"}} placeholder='Search Jobs' onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                <img src={require('./searchicon.jpg')} style={{height:"35px",marginLeft:"5px", width:"35px",borderRadius:"30px"}} onClick={()=>{navigate(`/searchjobs/?q=${searchQuery}`)}} />
            </div>
            <div style={{width:"270px",display:"flex",flexDirection:"column",margin:"auto",marginTop:"20px"}}>
                <div style={{display:"flex",flexDirection:"row",width:"260px",margin:'auto',justifyContent:"space-between"}}>
                    <h4 style={{fontFamily:"Caslon Antique",fontSize:"10px"}}>CATEGORY:</h4>
                    <select  style={{borderRadius:"30px",width:"200px",textAlign:"center",fontFamily:"Caslon Antique"}} onChange={(e)=>{
                        setSelectedCategory(e.target.value)
                    }} >
        <option>All</option>
            <option>Master</option>
            <option>Deck</option>
            <option>Management</option>
            <option>Able Seaman</option>
            <option>Engineering</option>
            <option>Safety</option>
            
        </select>
                </div>
                <div style={{display:"flex",flexDirection:"row",marginTop:"5px",width:"260px",margin:"auto",justifyContent:"space-between"}}>
                    <h4 style={{fontFamily:"Caslon Antique",fontSize:"12px"}}>Contract Type:</h4>
                    <select  style={{borderRadius:"30px",width:"200px", height:"40px",textAlign:"center",fontFamily:"Caslon Antique"}} onChange={(e)=>{
                        setContractType(e.target.value)

                    }}>
        
            <option>All</option>
            <option>Temporary</option>
            <option>Permanent</option>
        </select> 
        </div> 
        <div style={{display:"flex",flexDirection:"row",marginTop:"5px",width:"260px",margin:"auto",justifyContent:"space-between"}}>
                    <h4 style={{fontFamily:"Caslon Antique",fontSize:"12px"}}>Location:</h4>
                    <select  style={{borderRadius:"30px",width:"200px", height:"40px",textAlign:"center",fontFamily:"Caslon Antique"}} onChange={(e)=>{
                        setSelectedLocation(e.target.value)

                    }}>
        
            <option>All</option>
            <option>England</option>
            <option>United States</option>
            <option>Spain</option>
            <option>Netherlands</option>
            <option>Germany</option>
        </select>    
                </div>
                <button style={{width:"120px",borderRadius:"30px",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{
                    let filteredJobs=allJobs.filter((job)=>{if(selectedCategory=="All"){return true} else { return job.category.toLowerCase()==selectedCategory.toLowerCase()}})
                    let _filteredJobs=filteredJobs.filter((job)=>{if(selectedLocation=="All"){return true}else{return job.location.toLowerCase()==selectedLocation.toLocaleLowerCase()}})
                    let __filteredJobs=_filteredJobs.filter((job)=>{if(selectedContractType=="All"){return true}else{return job.contractType.toLowerCase()==selectedContractType.toLowerCase()}})
                      setJobs(__filteredJobs)    
                }} >Filter</button>
            </div>
              {
                
            jobs.map((job)=>{
              return(
                 <div  key={job.id} id="jobcontainer" onClick={()=>{navigate(`/job/${job.id}`)}}>
               
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                  
                <img src={job.companyLogoUrl} style={{height:"50px",width:"50px",borderRadius:"30px"}} />
              
                <h1 style={{fontSize:"13px",textAlign:"center"}}>{job.companyName}</h1> 
                </div>
               
                <h1 style={{margin:"auto",textAlign:"center",fontWeight:"bold",fontFamily:"Caslon Antique",fontSize:"12px"}}>{job.title.toUpperCase()}</h1>
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
        
      
      }  </div>)
}}
export default Jobs