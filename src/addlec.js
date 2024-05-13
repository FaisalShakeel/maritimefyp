import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
function AddLec() {
    const{Id}=useParams()
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const[photoUrl,setPhotoUrl]=useState("")
    const[videoUrl,setVideoUrl]=useState("")
    return (<div  id="signupcontainer">
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",fontSize:"15px"}}>MARITIME</h1>
            
        <input onChange={(e) => {
            setTitle(e.target.value)
        }} placeholder="Title" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
            
      
            <textarea onChange={(e) => {
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
           async function addLec()
            {
                
            let missingFields=false
            let fields = [title,description,photoUrl,videoUrl]
            for(let field of fields)
            {
                if(field.length==0)
                {
                    missingFields=true
                }
            }
            if(missingFields)
            {
                toast.error("Missing Fields!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
            }
            else
            {
                let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/course/addlec/${Id}`,{title,description,photoUrl,videoUrl})
                if(response.data.success)
                {
                    toast.success("Lecture Successfully Posted!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    // setTimeout(()=>{
                    //     navigate("/")
                    // },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Adding Lecture",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            }
            
            }
            addLec()
        }}>addLec</button>
        <ToastContainer/>
    </div>)
}
export default AddLec
/*

*/