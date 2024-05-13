import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
function MyChats()
{

    const [successfullyFetched,setSuccessfullyFetched]=useState(false)

    const [conversations,setConversations]=useState([])
    useEffect(()=>{
        

        async function getConversations()
        {
    
           // let response=await axios.get("http://127.0.0.1:5003/educationsystem/user/getusers")
            let conversationsResponse=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/message/getconversations/${localStorage.getItem("UID")}`)
            console.log(conversationsResponse.data.conversations)
            if(conversationsResponse.data.success)
            {



                setSuccessfullyFetched(true)
                setConversations(conversationsResponse.data.conversations)
            
            }
        }
        if(successfullyFetched==false)
        {
        getConversations()
        }
    })

    return(<div style={{display:"flex",flexDirection:"column"}}>
    
        <div  style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <div  style={{width:"100%",margin:"auto"}}>
            {
                conversations.length==0?<h5  style={{fontFamily:"Caslon Antique",textAlign:"center",fontWeight:"bold"}} >No Conversations!</h5>:conversations.map((conversation)=>{
                    return(<Link to={`/chat/${conversation.UID}`}><div  style={{display:"flex",flexDirection:"row",marginTop:"4px",borderRadius:"10px",justifyContent:"space-between",fontFamily:"Caslon Antique"}} >
                        <img src={conversation.withProfilePhotoUrl}  style={{height:"50px",width:"50px",borderRadius:"50px"}} />
                        <div  style={{display:"flex",flexDirection:"column",width:"120px"}}>
                            <h1  style={{fontWeight:"bold",fontSize:"12px",fontFamily:"Caslon Antique"}}>{conversation.with}</h1>
                            <h3  style={{fontWeight:"bold",fontSize:"12px",fontFamily:"Caslon Antique"}}>{conversation.lastMsg.text.length>0?conversation.lastMsg.text:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="image")&&(conversation.lastMsg.senderId==localStorage.getItem("UID"))?<h1 style={{fontFamily:"Caslon Antique",fontSize:"10px"}}>(You)Sent An Image</h1>:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="video")&&(conversation.lastMsg.senderId==localStorage.getItem("UID"))?<h1  style={{fontFamily:"Caslon Antique",fontSize:"10px"}}>(You) Sent A Video</h1>:(conversation.lastMsg.mediaUrl.length>0&&conversation.lastMsg.mediaType=="image")&&(conversation.lastMsg.senderId!=localStorage.getItem("UID"))?<h1  style={{fontFamily:"Caslon Antique",fontSize:"10px"}}>({conversation.with}) Sent An Image</h1>:(conversation.lastMsg.mediaType=='video'&&conversation.lastMsg.mediaUrl.length>0)&&(conversation.lastMsg.senderId!=localStorage.getItem("UID"))?<h1  style={{fontFamily:"Caslon Antique",fontSize:"10px"}}>({conversation.with}) Sent A Video</h1>:<></>}</h3>
                            </div>
                            <h4  style={{fontWeight:"bold",fontSize:"10px"}}>{conversation.lastMsg.addedON==new Date().toLocaleDateString()?conversation.lastMsg.addedAT:conversation.lastMsg.addedON}</h4>
                    </div>
                    
                    </Link>)
                })
                
            }
        
        </div>
        </div>
       
    </div>)
}
export default MyChats