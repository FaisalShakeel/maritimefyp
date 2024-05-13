import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
function Enrollments()
{
    const{courseId}=useParams()
    const[enrollments,setEnrollments]=useState([])
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    useEffect(()=>{
        async function getEnrollments()
        {
            let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getcourse/${courseId}`)
            if(response.data.success)
            {
                setSuccessfullyFetched(true)
                setEnrollments(response.data.course.enrolledBy)
            }
        }
        if(successfullyFetched==false)
        {
            getEnrollments()
        }
    })
    return(<div  style={{display:"flex",flexDirection:"column"}}>
    <h1 style={{fontSize:"10px"}}>EnrolledBy({enrollments.length})</h1>
    {
        enrollments.length==0?<h1>No EnrollMents!</h1>:enrollments.map((enrolledBy)=>{
            return(<div  style={{display:"flex",flexDirection:"row",margin:"auto",justifyContent:"space-between",width:"270px"}}>
                <img src={enrolledBy.profilePhotoUrl}  style={{height:"30px",width:"30px",borderRadius:"50px"}}/>
                <h1  style={{fontSize:"10px",fontFamily:"Caslon Antique"}}>{enrolledBy.name}</h1>
               <Link to={`/chat/${enrolledBy.ID}`}><button  style={{fontSize:"10px",fontWeight:"bold",width:"50px"}}>CHAT</button></Link>
            </div>)
        })
    }
</div>)
}
export default Enrollments