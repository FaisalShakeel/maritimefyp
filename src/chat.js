import { Axios } from "axios"
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'

import axios from 'axios'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import storage from './firebaseConfig'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Chat({socket})
{
  
    const{receiverId}=useParams()
    const[receiver,setReceiver]=useState("")
    const[isImageDialogOpen,setIsImageDialogOpen]=useState(false)
    const[isVideoDialogOpen,setIsVideoDialogOpen]=useState(false)
    const [successfullyFetched,setSuccessfullyFetched]=useState(false)
    const [messages,setMessages]=useState([])
    const [text,setText]=useState("")
    const [mediaType,setMediaType]=useState("")
    const [mediaUrl,setMediaUrl]=useState("")
    let getMessages =async()=>{
        let _response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/user/getuser/${receiverId}`)
        let response= await axios.get(`https://maritimebackend.azurewebsites.net/maritime/message/getmessages/${localStorage.getItem("UID")}/${receiverId}`)
        if(response.data.success && _response.data.success)
        {
            
          setSuccessfullyFetched(true)
          setReceiver(_response.data.user)
          console.log(_response.data.user)
          setMessages(response.data.messages)
          console.log(response.data.messages)
        }
    }
    useEffect(()=>{
        console.log("Socket Id")
        socket.on("newMsg",(msg)=>{
            console.log("New Message",msg)
            console.log("New Msg Received")
            getMessages()
    })
        
        if(successfullyFetched==false)
        {
        getMessages()

        }
    })
    return(<div  style={{display:'flex ',flexDirection:"column"}}>
        <div  style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div style={{height:"50px",width:"50px",borderRadius:"50px"}} >
                <img src={receiver.profilePhotoUrl} style={{height:"30px",width:"30px"}} />
            </div>
            <div>
                <h1 style={{fontSize:"10px",fontFamily:"Caslon Antique"}}>{receiver.name}</h1>
                
            </div>
            <div>
               
            </div>

        </div>
        <div  style={{height:"700px",overflowY:"scroll"}}>
        {
                    messages.map((message)=>{
                        if((message.mediaUrl.length>0&&message.mediaType=="image")&&(message.senderId==localStorage.getItem("UID")))
                        {
                            return(<div style={{display:"flex",flexDirection:"column",width:"200px",marginLeft:"auto"}}>
                                <img src={message.mediaUrl} style={{height:"200px",width:"200px",margin:"auto",borderRadius:"10px"}}/>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"10px"}}>{message.addedON}</h1>

                                <h1  style={{fontWeight:"bold",fontSize:"13px",fontFamily:"Caslon Antique",textAlign:"center"}}>{message.addedAT}</h1>


                                </div>
                            </div>)
                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="image") &&(message.senderId!=localStorage.getItem("UID")))
                        {
                            return(<div style={{display:"flex",flexDirection:"column",width:"200px"}}>
                                <img src={message.mediaUrl} style={{height:"200px",width:"200px",margin:"auto",borderRadius:"10px"}}/>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"10px"}}>{message.addedON}</h1>

                                <h1  style={{fontWeight:"bold",fontSize:"13px",fontFamily:"Caslon Antique",textAlign:"center"}}>{message.addedAT}</h1>


                                </div>
                            </div>)
                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="video") &&(message.senderId==localStorage.getItem("UID")))
                        {
                            
                            return(<div style={{display:"flex",flexDirection:"column",width:"200px",marginLeft:"auto"}}>
                                <video src={message.mediaUrl} style={{height:"200px",width:"200px",margin:"auto",borderRadius:"10px"}}></video>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"10px"}}>{message.addedON}</h1>

                                <h1  style={{fontWeight:"bold",fontSize:"13px",fontFamily:"Caslon Antique",textAlign:"center"}}>{message.addedAT}</h1>


                                </div>
                            </div>)
                            

                        }
                        else if((message.mediaUrl.length>0&&message.mediaType=="video") &&(message.senderId!=localStorage.getItem("UID")))
                        {
                            
                            return(<div style={{display:"flex",flexDirection:"column",width:"200px"}}>
                                <video src={message.mediaUrl} style={{height:"200px",width:"200px",margin:"auto",borderRadius:"10px"}}></video>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",fontSize:"10px"}}>{message.addedON}</h1>

                                <h1  style={{fontWeight:"bold",fontSize:"13px",fontFamily:"Caslon Antique",textAlign:"center"}}>{message.addedAT}</h1>


                                </div>
                            </div>)
                            

                        }
                        else if(message.text.length>0)
                        {
                            return(  <div style={message.senderId==localStorage.getItem("UID")?{marginLeft:'auto',marginTop:"5px",width:"180px",borderRadius:"20px",fontFamily:"Caslon Antique",fontSize:"10px"}:{marginTop:"5px",width:"180px",borderRadius:"20px",fontFamily:"Caslon Antique",fontSize:"10px"}}><h2 >{message.text}</h2>
                             <div  style={{display:"flex",justifyContent:"space-between"}}>
                                <h1 style={{fontSize:"10px",fontFamily:"Caslon Antique"}}>{message.addedON}</h1>

                                <h1 style={{fontSize:"10px",fontFamily:"Caslon Antique"}} >{message.addedAT}</h1>


                                </div>                            </div> )
                              
                        }
                    
                    })
                }
        </div>
        <dialog open={isImageDialogOpen} style={{margin:"auto"}}>
            <div  style={{display:"flex",flexDirection:"column",width:"280x"}}>
                <div  style={{display:"flex",flexDirection:"row",width:"100%"}}>
                    <h1  style={{textAlign:"center",fontSize:"10px",fontFamily:"Caslon Antique"}}>Select Image</h1>
                    <button style={{margin:"auto"}} onClick={()=>{setIsImageDialogOpen(false)}}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.HgRH4nu0HtdY-wXEJTwpgAHaHa&pid=Api&P=0&h=220"  style={{height:"20px",width:"20px"}}/>
                    </button>
                </div>
                <input step={{fontFamily:"Caslon Antique",borderRadius:"20px"}}  type="file" onChange={(e)=>{
                    async function getImageUrl()
                    {
                        let selectedImage=e.target.files[0]
                       let storageReference=ref(storage,selectedImage.name+Math.random())
                       await uploadBytes(storageReference,selectedImage)
                      let imageUrl=await getDownloadURL(storageReference)
                      setMediaType("image")
                      setMediaUrl(imageUrl)
                    }
                    getImageUrl()
                }}/>
                {mediaUrl.length>0&&mediaType=="image"?<img src={mediaUrl} style={{height:"80px",width:"100%"}}/>:<h1  style={{textAlign:"center",fontFamily:"Caslon Antique"}}>Image</h1>}
            <button  style={{textAlign:"center",width:"100px",margin:"auto"}} onClick={()=>{
                 async function sendMsg()
                 {
                    setText("")
                     if(mediaUrl.length>0&&mediaType=="image")
                     {
                     let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                     if(response.data.success)
                     {
                         toast.success("Send IMage")
                         setIsImageDialogOpen(false)
                         getMessages()
 
                     }
                     else
                     {
                         console.log("Msg Could Not Be Sent")
                     }
                     }
                     else
                     {
                         toast.warn("Kindly Pick An Image",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                      
                     }
                 }
                 sendMsg()
            }}>Send</button>
            </div>

        </dialog>
        <dialog open={isVideoDialogOpen}>
            <div  style={{display:"flex",flexDirection:"column",width:"280x"}} >
            <div  style={{display:"flex",flexDirection:"row",width:"100%"}} >
                    <h1  style={{textAlign:"center",margin:"auto",fontFamily:"Caslon Antique"}}>Select Video</h1>
                    <button style={{margin:"auto"}} onClick={()=>{setIsVideoDialogOpen(false)}}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.HgRH4nu0HtdY-wXEJTwpgAHaHa&pid=Api&P=0&h=220"  style={{height:"20px",width:"20px"}}/>
                    </button>
                </div>
                <input style={{fontFamily:"Caslon Antique",borderRadius:"30px"}} type="file" accept="video/*" onChange={(e)=>{
                    async function getVideoUrl()
                    {
                        let selectedVideo=e.target.files[0]
                       let storageReference=ref(storage,selectedVideo.name+Math.random())
                       await uploadBytes(storageReference,selectedVideo)
                      let videoUrl=await getDownloadURL(storageReference)
                      setMediaType("video")
                      setMediaUrl(videoUrl)
                    }
                    getVideoUrl()
                }}/>
                {mediaUrl.length>0&&mediaType=="video"?<video src={mediaUrl}  style={{width:"100%",height:"100px"}}/>:<h1 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Video</h1>}
            <button  style={{textAlign:"center",width:"100px",margin:"auto"}}  onClick={()=>{
                async function sendMsg()
                {
                    setText("")
                    if(mediaUrl.length>0&&mediaType=="video")
                    {
                    let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                    if(response.data.success)
                    {
                        toast.success("Send Video")
                        setIsVideoDialogOpen(false)
                        getMessages()

                    }
                    else
                    {
                        console.log("Msg Could Not Be Sent")
                    }
                    }
                    else
                    {
                        toast.warn("Kindly Pick A Video",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                     
                    }
                }
                sendMsg()
            }}>Send</button>
            </div>

        </dialog>
        <ToastContainer/>
        <div  style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",marginTop:"auto",width:"270px",margin:"auto"}}>
            <input  style={{marginTop:"15px",fontSize:"13px",width:"190px",margin:"auto", borderRadius:"30px",fontFamily:"Caslon Antique",height:"40px",textAlign:"center"}} onChange={(e)=>{
                setText(e.target.value)
            }} placeholder="Write Message"/>
            <img src="https://tse2.mm.bing.net/th?id=OIP.JIo_erHjGUXp0-Z86gJAqAHaHa&pid=Api&P=0&h=220" style={{height:"30px",width:"30px",marginTop:"10px"}}  onClick={()=>{setIsVideoDialogOpen(false);setIsImageDialogOpen(true)}}/>
            <img src="https://tse2.mm.bing.net/th?id=OIP.POGtxoJ7oqpi_Ks2FgBpCAHaHa&pid=Api&P=0&h=220" style={{height:"23px",width:"23px",marginTop:"13px"}} onClick={
                ()=>{
                    setIsImageDialogOpen(false);
                setIsVideoDialogOpen(true)
            }}/>
            <button  style={{marginLeft:"10px",backgroundColor:"white"}} onClick={()=>{
                async function addMessage()
                {
                 let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/message/addmessage/${localStorage.getItem("UID")}/${receiverId}`,{text,mediaType,mediaUrl,addedON:new Date().toLocaleDateString(),addedAt:new Date().toLocaleTimeString()})
                 if(response.data.success)
                 {
                    getMessages()
                    console.log("Message Added")
                 }
                }
                addMessage()
            }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkMqLSGuqfKU7xlVdfYV4-6HyT1VjKQd_6Sg&s"  style={{height:"24px",width:"24px",marginTop:"14px"}} />
            </button>

        </div>
    </div>)
}
export default Chat