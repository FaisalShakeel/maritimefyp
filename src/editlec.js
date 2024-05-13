import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading'
function EditLec() {
    const{courseId,lecId}=useParams()
    console.log(courseId)
    console.log(lecId)
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const[photoUrl,setPhotoUrl]=useState("")
    const[videoUrl,setVideoUrl]=useState("")
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    useEffect(()=>{
        async function getLec()
        {
            let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getlec/${courseId}/${lecId}`)
            if(response.data.success)
                {
                    setTitle(response.data.lec.title)
                    setDescription(response.data.lec.description)
                    setPhotoUrl(response.data.lec.photoUrl)
                    setVideoUrl(response.data.lec.videoUrl)
                    setSuccessfullyFetched(true)
                }
        }
        if(successfullyFetched==false)
            {
                getLec()
            }
    })
    if(successfullyFetched==false)
        {
            return(<ReactLoading height={50} width={50} color="black"></ReactLoading>)
        }
        else
        {

    return (<div  id="signupcontainer">
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",fontSize:"15px"}}>MARITIME</h1>
            
        <input value={title} onChange={(e) => {
            setTitle(e.target.value)
        }} placeholder="Title" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
            
      
            <textarea value={description} onChange={(e) => {
            setDescription(e.target.value)
        }} rows={4} placeholder="Description" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        
        <div style={{display:'flex',flexDirection:"column",height:"100px"}}>
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>PHOTO</h1>
            <input type="file" accept=".jpg" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getPhotoUrl() {
                   let selectedCoursePhoto=e.target.files[0]
                   let reference=ref(storage,selectedCoursePhoto.lastModified+Math.random().toString())
                   await uploadBytes(reference,selectedCoursePhoto)
                  let coursePhotoUrl= await getDownloadURL(reference)
                  setPhotoUrl(coursePhotoUrl)

                }
                getPhotoUrl()
            }} />
        </div>
        {photoUrl.length>0?<img src={photoUrl} height={100} width={"100%"} style={{borderRadius:"10px"}}/>:<h5 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Photo Will Appear Here</h5>}
        <div style={{display:'flex',flexDirection:'column',height:'100px'}}>
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>VIDEO</h1>
            <input type="file" accept=".mp4" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getVideoUrl() {
                   let selectedVideo=e.target.files[0]
                   let reference=ref(storage,selectedVideo.lastModified+Math.random().toString())
                   await uploadBytes(reference,selectedVideo)
                  let _videoUrl= await getDownloadURL(reference)
                  setVideoUrl(_videoUrl)

                }
                getVideoUrl()
            }} />
        </div>
        {videoUrl.length>0?<video src={videoUrl}  style={{borderRadius:"10px",height:"100px",width:"100%"}} controls={true}></video>:<h5 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Video Will Appear Here</h5>}
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px"}} onClick={()=>{
           async function editLec()
            {
                
            
            
                let response=await axios.put(`https://maritimebackend.azurewebsites.net/maritime/course/editlec/${courseId}/${lecId}`,{title,description,photoUrl,videoUrl})
                if(response.data.success)
                {
                    toast.success("Lecture Successfully Updated!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    // setTimeout(()=>{
                    //     navigate("/")
                    // },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Adding Lecture",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            
            
            }
            editLec()
        }}>Update Lec</button>
        <ToastContainer/>
    </div>)
}}
export default EditLec
/*

*/