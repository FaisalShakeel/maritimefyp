import axios, { all } from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactLoading from 'react-loading'
import { ToastContainer, toast } from "react-toastify";
import './App.css';
function Profile()
{
    let navigate=useNavigate()
    
    const {Id}=useParams()
    const [accessDenied,setAccessDenied]=useState(false)
    const [user,setUser]=useState({})
    const[completedCourses,setCompletedCourses]=useState([])
    const[coursesInProgress,setCoursesInProgress]=useState([])

    const[myCourses,setMyCourses]=useState([])
    const[myJobs,setMyJobs]=useState([])
    const[appliedJobs,setAppliedJobs]=useState([])
    let coursesProgress={}
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    let getProfile=async()=>{
        let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/user/getprofile/${Id}/${localStorage.getItem("token")}`)
        if(response.data.success)
        {
            if(response.data.user.role=="admin")
            {
             setSuccessfullyFetched(true)
             setUser(response.data.user)
             console.log(response.data.MyCourses)
             
             console.log(response.data.MyJobs)
             setMyCourses(response.data.MyCourses)
             setMyJobs(response.data.MyJobs)
            }
            else if(response.data.user.role=="student")
            {
             
             let _enrolledIN=response.data.enrolledIn
             console.log(_enrolledIN)
             let InProgress=_enrolledIN.filter((course)=>{
                 let allLECS=course.lecs
                 
                 console.log(allLECS)
                
                let lecsCompleted=allLECS.filter((lec)=>{
                    let isCompleted=false
                    let completedBy=lec.completedBy
                    for(let user of completedBy)
                        {
                            if(user.ID==localStorage.getItem("UID"))
                                {
                                    isCompleted=true

                                }
                        }
                        return isCompleted
                 })
                 console.log("No Of Lecs Completed",lecsCompleted.length)
                 let completedLecs=lecsCompleted.length
                 let currentProgress=(completedLecs*100)/course.length>0?course.length:1  //If you multiply the No Of Lecs completed with 100 and divide it by total No Of lecs,we can get the percentage
                 console.log("Current Progress")
                 return(currentProgress<100)
             
             })
 
 
             let _completedCourses=_enrolledIN.filter((course)=>{
                
                let allLECS=course.lecs
               let completedLecs=allLECS.filter((lec)=>{
                    let isCompleted=false
                    let completedBy=lec.completedBy
                    for(let user of completedBy)
                        {
                            if(user.ID==localStorage.getItem("UID"))
                                {
                                    isCompleted=true
                                }
                        }
                        return isCompleted
                })
                let currentProgress=(completedLecs.length*100)/course.lecs.length>0?course.length:1
                return(currentProgress==100)

             })
             console.log("Courses")
             console.log("In Progress Courses",InProgress)
             console.log("Completed Courses",completedCourses)
            
             setCoursesInProgress(InProgress)
             setCompletedCourses(_completedCourses)
             setUser(response.data.user)
             setSuccessfullyFetched(true)

            }
            else if(response.data.user.role=="job seeker")
            {
          
            setUser(response.data.user)
            setAppliedJobs(response.data._appliedJobs)
            setSuccessfullyFetched(true)
            }

        }
        else if(response.data.success==false &&response.data.accessDenied)
        {
            setAccessDenied(true)
        }
          
    }
    useEffect(()=>{
        if(successfullyFetched==false)
        {
        getProfile()
        }
    })
    if(successfullyFetched==false &&accessDenied)
    {
        return(<div className="font-caslonantique font-bold text-center">Access Denied!</div>)
    }
    else if(successfullyFetched==false)
    {
        return(<ReactLoading width={50} height={50} color="black" className="m-auto"></ReactLoading>)
    }
   else if(user.role=="admin")
    {
        return(<div style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"280px",margin:"auto",fontFamily:"Caslon Antique"}}>
    <img src={user.profilePhotoUrl} style={{height:40,width:40,borderRadius:"50px"}}/>
    <div style={{display:"flex",flexDirection:"column"}}>
        <h1 style={{fontWeight:"bold",fontSize:"11px"}}>{user.name}</h1>
        <p  style={{fontSize:"10px"}}>{user.bio}</p>
    </div>
    {localStorage.getItem("UID")==Id?<Link to={"/editprofile"} ><button style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"12px",borderRadius:"30px",width:"80px"}}>Edit</button></Link>:<></>}
    
   
</div>

 
 {Id==localStorage.getItem("UID")?<button style={{color:"white",backgroundColor:"slategray",marginTop:"10px",borderRadius:"20px",width:"150px",textAlign:"center",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{navigate("/addcourse")}}>Add Course</button>:<></>} 
 {Id==localStorage.getItem("UID")?<button style={{color:"white",backgroundColor:"slategray",marginTop:"15px",borderRadius:"20px",width:"150px",textAlign:"center",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{navigate("/postjob")}}>Post Job</button>:<></>} 
<ToastContainer/>
<h1 style={{fontWeight:"bold",fontFamily:"Caslon Antique",textAlign:"center",borderRadius:"20px",margin:"auto",width:"160px",fontSize:"13px",marginTop:"15px"}} >MY COURSES</h1>
    <div id="coursecontainer">
        {
           myCourses.map((course)=>{
            return(<div style={{width:"100%",margin:"auto",backgroundColor:"lightblue",height:"auto",display:"flex",flexDirection:"column"}}>
                <div style={{width:"100%",display:"flex",flexDirection:"column"}} onClick={()=>{
                    navigate(`/course/${course.id}`)
                }}>
                <img src={course.photoUrl}/>
                <h1 style={{fontSize:"12px",textAlign:"center"}}>{course.title.toUpperCase()}</h1>
                </div>
                {Id==localStorage.getItem("UID")?<button onClick={()=>{navigate(`/editcourse/${course.id}`)}} style={{width:"120px",fontFamily:"Caslon Antique",textAlign:"center",margin:"auto",borderRadius:"30px"}}>Edit</button>:<></>}
                {Id==localStorage.getItem("UID")?<button onClick={()=>{
                    async function deleteCourse()
                    {
                        let response= await axios.delete(`https://maritimebackend.azurewebsites.net/maritime/course/deletecourse/${course.id}`)
                        if(response.data.success)
                            {
                                toast.success("Deleted")
                                getProfile()
                            }
                            else
                            {
                                toast.error("Error while Deleting The Course")
                            }
                    }
                    deleteCourse()
                }} style={{width:"120px",fontFamily:"Caslon Antique",textAlign:"center",margin:"auto",borderRadius:"30px"}}>Delete</button>:<></>}
               
                {Id==localStorage.getItem("UID")?<button onClick={()=>{navigate(`/enrollments/${course.id}`)}} style={{width:"120px",fontFamily:"Caslon Antique",textAlign:"center",margin:"auto",borderRadius:"30px"}}>Enrollments({course.enrolledBy.length})</button>:<></>}

            </div>)
           })
        }
        

    </div>
    <hr/>
     <h2 style={{fontWeight:"bold",fontFamily:"Caslon Antique",textAlign:"center",borderRadius:"20px",margin:"auto",width:"160px",fontSize:"13px",marginTop:"13px"}}> MY JOBS</h2>
     {
            myJobs.map((job)=>{
                return(
                   <div  key={job.id} id="jobcontainer">
                 <div style={{display:"flex",flexDirection:"column"}} onClick={()=>{navigate(`/job/${job.id}`)}}>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                  
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
                    </div>
                
                    {
                        Id==localStorage.getItem("UID")?<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><button style={{width:80,textAlign:"center",fontWeight:"bold",fontFamily:"Caslon Antique",borderRadius:"30px"}} onClick={()=>{navigate(`/editjob/${job.id}`)}}>Edit</button><button  style={{width:80,textAlign:"center",fontWeight:"bold",fontFamily:"Caslon Antique",borderRadius:"30px"}} onClick={()=>{
                            async function deleteJob()
                            {
                                let response=await axios.delete(`https://maritimebackend.azurewebsites.net/maritime/job/deletejob/${job.id}`)
                                if(response.data.success)
                                {
                                    toast.success("Successfully Deleted!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                                getProfile()
                                }
                                else
                                {
                                    toast.error("There Was An Error While Deleting Job!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                                }
                            }
                            deleteJob()
                        }} >Delete</button></div>:<></>
                    }
                     {
                        Id==localStorage.getItem("UID")?<button  style={{width:"120px",textAlign:"center",fontWeight:"bold",fontFamily:"Caslon Antique",height:"30px",margin:"auto",borderRadius:"30px"}} onClick={()=>{navigate(`/applicants/${job.id}`)}}>Applicants({job.applicants.length})</button>:<></>
                    } 
                    
                 </div>
                 
                )
            })
        }


    </div>)

    }
    else if(user.role=="student")
    {
      return(  <div style={{display:"flex",flexDirection:"column"}}>
         <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"280px",margin:"auto",fontFamily:"Caslon Antique"}}>
    <img src={user.profilePhotoUrl} style={{height:40,width:40,borderRadius:"50px"}}/>
    <div style={{display:"flex",flexDirection:"column"}}>
        <h1 style={{fontWeight:"bold",fontSize:"11px"}}>{user.name}</h1>
        <p  style={{fontSize:"10px"}}>{user.bio}</p>
    </div>
    {localStorage.getItem("UID")==Id?<Link to={"/editprofile"} ><button style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"12px",borderRadius:"30px",width:"80px"}}>Edit</button></Link>:<></>}
   
    
   
</div>

        <button style={{width:"120px",fontFamily:"Caslon Antique",textAlign:"center",backgroundColor:"green",borderRadius:"30px",margin:"auto"}}>In Progress</button>
        {coursesInProgress.length==0?<h1 style={{fontFamily:"Caslon Antique",textAlign:'center'}}>No Course In Progress!</h1>: coursesInProgress.map((course)=>{
            return(<div id="coursecontainer" onClick={()=>{
                navigate(`/course/${course.id}`)
            }}>
                <img src={course.photoUrl}/>
                <h1 style={{fontSize:"12px",textAlign:"center"}}>{course.title.toUpperCase()}</h1>
                

            </div>)
           })
        }
        <button  style={{width:"120px",fontFamily:"Caslon Antique",textAlign:"center",backgroundColor:"green",borderRadius:"30px",margin:"auto"}}>Completed</button>
        {completedCourses.length==0?<h1 style={{fontFamily:"Caslon Antique",textAlign:'center'}}>No Completed Courses!</h1>:completedCourses.map((course)=>{
            return(<div id="coursecontainer" onClick={()=>{
                navigate(`/course/${course.id}`)
            }}>
                <img src={course.photoUrl}/>
                <h1 style={{fontSize:"12px",textAlign:"center"}}>{course.title.toUpperCase()}</h1>
                

            </div>)
           })
        }

        <ToastContainer/>
           

        </div>)
    }
    else if(user.role=="job seeker")
    {
        
        return(
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
               <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"280px",margin:"auto",fontFamily:"Caslon Antique"}}>
    <img src={user.profilePhotoUrl} style={{height:40,width:40,borderRadius:"50px"}}/>
    <div style={{display:"flex",flexDirection:"column"}}>
        <h1 style={{fontWeight:"bold",fontSize:"11px"}}>{user.name}</h1>
        <p  style={{fontSize:"10px"}}>{user.bio}</p>
    </div>
    {localStorage.getItem("UID")==Id?<Link to={"/editprofile"} ><button style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"12px",borderRadius:"30px",width:"80px"}}>Edit</button></Link>:<></>}
    
   
</div>
                
            {
           appliedJobs.length==0?<h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"12px"}}>No Jobs Applied!</h1>:appliedJobs.map((job)=>{
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
          
            }
       <ToastContainer/> 
        </div>

        )

    }
    
}
export default Profile