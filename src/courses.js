
import { useEffect, useRef, useState } from 'react';
import axios, { all } from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from'react-loading'
import './App.css';
function Courses() {
    let navigate=useNavigate()
    const[query,setQuery]=useState("")
const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const[selectedExperienceLevel,setExperienceLevel]=useState("All")
    const [courses,setCourses]=useState([])
    const[allCourses,setAllCourses]=useState([])
    
   
    let getCourses=async()=>{
        console.log("Getting courses")
        let response= await axios.get("https://maritimebackend.azurewebsites.net/maritime/course/getcourses")
        if(response.data.success)
       {
         
         setCourses(response.data.courses)
         setAllCourses(response.data.courses)
        
         setSuccessfullyFetched(true)
         
       }

    }
    useEffect(()=>{
      
      
      if(successfullyFetched==false)
      {
      getCourses()

      }
    })
    if(successfullyFetched==false)
    {
        return(<ReactLoading width={50} height={50} color='black' className='m-auto'></ReactLoading>)
    }
    else
    {
        return(
        <div style={{backgroundColor:"lightblue"}}>
            <div style={{display:"flex",flexDirection:"row",width:"250px",margin:"auto"}}>
                <input style={{width:"170px",borderRadius:"30px",fontFamily:"Caslon Antique",height:"30px",textAlign:"center"}} placeholder='Search Courses' onChange={(e)=>{
                    setQuery(e.target.value)
                }}/>
                <img src={require('./searchicon.jpg')} style={{height:"35px",marginLeft:"5px", width:"35px",borderRadius:"30px"}} onClick={()=>{
                    navigate(`/searchcourses/?q=${query}`)
                }} />
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
                    <h4 style={{fontFamily:"Caslon Antique",fontSize:"12px"}}>ExperienceLevel:</h4>
                    <select  style={{borderRadius:"30px",width:"200px", height:"40px",textAlign:"center",fontFamily:"Caslon Antique"}} onChange={(e)=>{
                        setExperienceLevel(e.target.value)

                    }}>
        <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
        </select>   
                </div>
                <button style={{width:"120px",borderRadius:"30px",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{
                    let _filteredCourses=allCourses.filter((course)=>{if(selectedCategory=="All"){return true} else { return course.category.toLowerCase()==selectedCategory.toLowerCase()}})
                    let __filteredCourses=_filteredCourses.filter((course)=>{if(selectedExperienceLevel=="All"){return true}else{return course.experienceLevel.toLowerCase()==selectedExperienceLevel.toLocaleLowerCase()}})
                        setCourses(__filteredCourses)    
                }} >Filter</button>
            </div>
        <div id="coursecontainer">
        {
           courses.map((course)=>{
            return(<div style={{width:"100%",margin:"auto",backgroundColor:"lightblue",height:"auto",display:"flex",flexDirection:"column",marginTop:"5px"}} onClick={()=>{
                navigate(`/course/${course.id}`)
            }}>
                <img src={course.photoUrl}/>
                <h1 style={{fontSize:"12px",textAlign:"center"}}>{course.title.toUpperCase()}</h1>
                

            </div>)
           })
        }
        

    </div></div>)
               
        
    }
    
}
export default Courses
