import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'

import { useNavigate } from "react-router-dom";
function AddCourse() {
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prerequisites, setPrerequisities] = useState("")
    const[experienceLevel,setExperienceLevel]=useState("")
    const[photoUrl,setPhotoUrl]=useState("")
    const[previewUrl,setPreviewUrl]=useState("")
    const[category,setCategory]=useState("")
    return (<div  id="signupcontainer">
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",fontSize:"15px"}}>MARITIME</h1>
            
        <input onChange={(e) => {
            setTitle(e.target.value)
        }} placeholder="Title" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
            
      
            <textarea onChange={(e) => {
            setDescription(e.target.value)
        }} rows={4} placeholder="Description" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        
        <textarea onChange={(e) => {
            setPrerequisities(e.target.value)
        }} rows={4} placeholder="Prerequisites" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
     
        <select  style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} onChange={(e)=>{setCategory(e.target.value)}}>
            <option>Select Category</option>
            <option>Master</option>
            <option>Deck</option>
            <option>Management</option>
            <option>Able Seaman</option>
            <option>Engineering</option>
            <option>Safety</option>
            <option>Others</option>
        </select>
       
        
       
        
        <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold"}}>Experience Level</h1>
        <div style={{margin:"auto"}}>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="Beginner" checked={experienceLevel == "Beginner"} onChange={(e) => { setExperienceLevel(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Beginner</h1> </div>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="Intermediate" checked={experienceLevel == "Intermediate"} onChange={(e) => { setExperienceLevel(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Intermediate</h1> </div>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="Expert" checked={experienceLevel == "Expert"} onChange={(e) => { setExperienceLevel(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Expert</h1> </div>

        </div>
        <div className="flex flex-col h-[100px]">
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>PHOTO</h1>
            <input type="file" accept=".jpg" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getCoursePhotoUrl() {
                   let selectedCoursePhoto=e.target.files[0]
                   let reference=ref(storage,selectedCoursePhoto.lastModified+Math.random().toString())
                   await uploadBytes(reference,selectedCoursePhoto)
                  let coursePhotoUrl= await getDownloadURL(reference)
                  setPhotoUrl(coursePhotoUrl)

                }
                getCoursePhotoUrl()
            }} />
        </div>
        {photoUrl.length>0?<img src={photoUrl} height={100} width={"100%"} style={{borderRadius:"10px"}}/>:<h5 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Photo Will Appear Here</h5>}
        <div className="flex flex-col h-[100px]">
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>PREVIEW</h1>
            <input type="file" accept=".mp4" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getCoursePreviewUrl() {
                   let selectedVideo=e.target.files[0]
                   let reference=ref(storage,selectedVideo.lastModified+Math.random().toString())
                   await uploadBytes(reference,selectedVideo)
                  let _previewUrl= await getDownloadURL(reference)
                  setPreviewUrl(_previewUrl)

                }
                getCoursePreviewUrl()
            }} />
        </div>
        {previewUrl.length>0?<video src={previewUrl}  style={{borderRadius:"10px",height:"100px",width:"100%"}} controls={true}></video>:<h5 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Video Will Appear Here</h5>}
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px"}} onClick={()=>{
           async function publishCourse()
            {
                
            let missingFields=false
            let fields = [title,description,prerequisites,photoUrl,previewUrl,category,experienceLevel]
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
                let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/course/addcourse/${localStorage.getItem("UID")}`,{title,description,prerequisites,category,experienceLevel,photoUrl,previewUrl,prerequisites})
                if(response.data.success)
                {
                    toast.success("Your Course Has been Published!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    setTimeout(()=>{
                        navigate("/courses")
                    },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Adding Job",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            }
            
            }
            publishCourse()
        }}>publish</button>
        <ToastContainer/>
    </div>)
}
export default AddCourse
/*

*/