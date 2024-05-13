import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'
import ReactLoading from 'react-loading'

import { useNavigate, useParams } from "react-router-dom";
function EditCourse() {
    const{Id}=useParams()
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prerequisites, setPrerequisities] = useState("")
    const[experienceLevel,setExperienceLevel]=useState("")
    const[photoUrl,setPhotoUrl]=useState("")
    const[previewUrl,setPreviewUrl]=useState("")
    const[category,setCategory]=useState("")
    const[courseId,setCourseId]=useState("")
    const[lecs,setLecs]=useState([])
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    let getCourse=async()=>{
        let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/course/getcourse/${Id}`)
        if(response.data.success)
            {
                setTitle(response.data.course.title)
                setDescription(response.data.course.description)
                setPrerequisities(response.data.course.prerequisites)
                setPhotoUrl(response.data.course.photoUrl)
                setPreviewUrl(response.data.course.previewUrl)
                setCategory(response.data.course.category)
                setExperienceLevel(response.data.course.experienceLevel)
                setCourseId(response.data.course.id)
                setLecs(response.data.course.lecs)
                setSuccessfullyFetched(true)

            }

    }
    useEffect(()=>{
    
        if(successfullyFetched==false)
            {
                getCourse()
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
        
        <textarea value={prerequisites} onChange={(e) => {
            setPrerequisities(e.target.value)
        }} rows={4} placeholder="Prerequisites" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
     
        <select defaultValue={category} style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} onChange={(e)=>{setCategory(e.target.value)}}>
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
        <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:'13px'}}>LECTURES</h1>
        <button style={{width:"130px",margin:"auto",fontFamily:"Caslon Antique"}} onClick={()=>{
            navigate(`/addlec/${courseId}`)
        }}>Add Lec</button>
        { lecs.length==0?<p style={{fontFamily:"Caslon Antique",textAlign:"center",fontSize:"13px"}}>No Lectures</p>:lecs.map((lec)=>{
            return(<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"290px",margin:"auto",backgroundColor:"black"}}>
                <div style={{display:"flex",flexDirection:"row"}} onClick={()=>{
                    navigate(`/lec/${courseId}/${lec.ID}`)
                }}>
                <img src={lec.photoUrl} style={{height:"30px",width:"30px"}}/>
                <div style={{display:"flex",flexDirection:"column",width:"140px"}}>
                    <h1 style={{fontSize:"12px"}}>{lec.title}</h1>
                    <p style={{fontSize:"10px"}}>{lec.description}</p>
                </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"100px"}}>
                    <button style={{width:"40px",fontFamily:"Caslon Antique",borderRadius:"4px"}} onClick={()=>{
                        navigate(`/editlec/${courseId}/${lec.ID}`)
                    }}>Edit</button>
                    <button style={{width:"40px",fontFamily:"Caslon Antique",borderRadius:"4px"}} onClick={()=>{
                        async function deleteLec()
                        {
                            let response=await axios.delete(`https://maritimebackend.azurewebsites.net/maritime/course/deletelec/${Id}/${lec.ID}`)
                            if(response.data.success)
                                {
                                    toast.success("Lecture Deleted Successfully")
                                getCourse()
                                }
                                else
                                {
                                    toast.error("There Was An Error While Deleting The Lecture!!")
                                }
                        }
                        deleteLec()
                    }}>Delete</button>

                </div>

            </div>)
        })}
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px"}} onClick={()=>{
           async function updateCourse()
            {
                
            
                            let response=await axios.put(`https://maritimebackend.azurewebsites.net/maritime/course/editcourse/${Id}`,{title,description,prerequisites,category,experienceLevel,photoUrl,previewUrl})
                if(response.data.success)
                {
                    toast.success("Course Successfully Updated",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    // setTimeout(()=>{
                    //     navigate("/")
                    // },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Updating Course",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            
            
            }
            updateCourse()
        }}>UPDATE</button>
        <ToastContainer/>
    </div>)
        }
}
export default EditCourse
/*

*/