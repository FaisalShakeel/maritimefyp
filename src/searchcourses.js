import axios, { all } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ReactLoading from 'react-loading'
import './App.css';

function SearchCourses()
{
    let navigate=useNavigate()
  const[searchParams,setSearchParams]=useSearchParams()
  const[searchQuery,setSearchQuery]=useState(searchParams.get("q"))
  const[searchResults,setSearchResults]=useState([])
  const[successfullyFetched,setSuccessfullyFetched]=useState(false)
  let getSearchResults=async()=>{
    let response=await axios.get("https://maritimebackend.azurewebsites.net/maritime/course//getcourses")
    if(response.data.success)
        {
            let allCourses=response.data.courses
            setSearchResults(allCourses.filter((course)=>{return(course.title.toLowerCase().includes(searchQuery.toLowerCase())||course.description.toLowerCase().includes(searchQuery.toLowerCase()))}))
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
                <input style={{width:"170px",borderRadius:"30px",fontFamily:"Caslon Antique",height:"30px",textAlign:"center"}} placeholder='Search Courses' onChange={(e)=>{setSearchQuery(e.target.value)}} />
                <img src={require('./searchicon.jpg')} style={{height:"35px",marginLeft:"5px", width:"35px",borderRadius:"30px"}} onClick={()=>{getSearchResults()}} />
            </div>
            
                <div id="coursecontainer">
                {
              searchResults.length==0?<h4 style={{fontFamily:"Caslon Antique",fontSize:"12px",textAlign:"center"}}>No Results!</h4>:searchResults.map((course)=>{
                    return(<div style={{width:"100%",margin:"auto",backgroundColor:"lightblue",height:"auto",display:"flex",flexDirection:"column",marginTop:"5px"}} onClick={()=>{
                        navigate(`/course/${course.id}`)
                    }}>
                        <img src={course.photoUrl}/>
                        <h1 style={{fontSize:"12px",textAlign:"center"}}>{course.title.toUpperCase()}</h1>
                        
        
                    </div>)
                   })
                }
            
        </div>
        </div>)
    }

}
export default SearchCourses