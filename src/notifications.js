import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


function MyNotifications()
{
    let navigate=useNavigate()
    const[notifications,setNotifications]=useState([])
    const[isFetched,setIsFetched]=useState(false)
    useEffect(()=>{
        async function getMyNotifications()
        {
            let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritimenotifications/getmynotifications/${localStorage.getItem("UID")}`)
            if(response.data.success)
                {
                    setNotifications(response.data.notifications)
                    setIsFetched(true)
                }
        }
        if(isFetched==false)
            {
                getMyNotifications()
            }
    })
    if(isFetched==false)
        {
            return(<div style={{margin:"auto",fontFamily:"Caslon Antique",textAlign:"center",width:"250px",fontWeight:"bold"}}>There Was An Error While Getting Notifications</div>)
        }
        else
        {
            return(
            <div style={{display:"flex",flexDirection:"column"}}>
                {notifications.length==0?<h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"10px"}}>No Notifications Here</h1>:notifications.map((notification)=>{
                    if(notification.type=="Enrolled")
                        {
                            
                            return(<div onClick={()=>{
                                navigate(`/course/${notification.courseId}`)
                            }} style={{display:"flex",flexDirection:"column", backgroundColor:"lightblue",borderRadius:"5px", fontFamily:"Caslon Antique",width:"260px",margin:"auto"}}>
                            <h1 style={{fontSize:"12px"}}>Someone Enrolled In Your Course</h1>
                            <h2 style={{fontSize:"10px"}}>{notification.coureseName}</h2>
                            <h4 style={{fontSize:"9px"}}>{notification.addedON}</h4>
                        </div>)


                        }
                        else if(notification.type=="ChapterAdded")
                            {
                                return(<div onClick={()=>{
                                    navigate(`/lec/${notification.courseId}/${notification.lecId}`)
                                }} style={{display:"flex",flexDirection:"column",fontFamily:"Caslon Antique",backgroundColor:"lightblue",borderRadius:"5px",width:"260px",margin:"auto"}}>
                                    <h1 style={{fontSize:"12px"}}>A Lecture Was Added To</h1>
                                    <h2 style={{fontSize:"10px"}}>{notification.coureseName}</h2>
                                    <h4 style={{fontSize:"9px"}}>{notification.addedON}</h4>
                                </div>)
                            }

                })}

            </div>)

        }
}
export default MyNotifications