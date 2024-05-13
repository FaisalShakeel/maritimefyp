import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading'
import Course from "./course";
function EditJob() {
    const{Id}=useParams()
    let navigate=useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requirements, setRequirements] = useState("")
    const [responsibilities, setResponsibilities]=useState("")
    const[location,setLocation]=useState("")
    const[contractType,setContractType]=useState("")
    const [perksAndBenefits,setPerksAndBenefits] = useState("")
    const[companyName,setCompnayName]=useState("")
    const[companyLogoUrl,setCompanyLogoUrl]=useState("")
    const[aboutCompany,setAboutCompany]=useState("")
    const[salary,setSalary]=useState("")
    const[category,setCategory]=useState("")
    const[successfullyFetched,setSuccessfullyFetched]=useState(false)
    useEffect(()=>{
        async function getJob()
        {
            let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/job/getjob/${Id}`)
            if(response.data.success)
                {
                    setTitle(response.data.job.title)
                    setDescription(response.data.job.description)
                    setLocation(response.data.job.location)
                    setSalary(response.data.job.salary)
                    setCategory(response.data.job.category)
                    setRequirements(response.data.job.requirements)
                    setResponsibilities(response.data.job.responsibilities)
                    setPerksAndBenefits(response.data.job.perksAndBenefits)
                    setContractType(response.data.job.contractType)
                    setCompnayName(response.data.job.name)
                    setAboutCompany(response.data.job.companyBio)
                    setCompanyLogoUrl(response.data.job.companyLogoUrl)
                    setSuccessfullyFetched(true) 
                }
        }
        if(successfullyFetched==false)
            {
                getJob()
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
            
        <input value={location} onChange={(e) => {
            setLocation(e.target.value)
        }} placeholder="Location" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
         <input value={companyName} onChange={(e) => {
            setCompnayName(e.target.value)
        }} placeholder="Company Name" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
        <input value={salary} onChange={(e) => {
            setSalary(e.target.value)
        }} placeholder="Salary (In USD)"  type="number" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
        <select defaultValue={category}  style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} onChange={(e)=>{setCategory(e.target.value)}}>
            <option>Select Category</option>
            <option>Master</option>
            <option>Deck</option>
            <option>Management</option>
            <option>Able Seaman</option>
            <option>Engineering</option>
            <option>Safety</option>
            <option>Others</option>
        </select>
        <textarea value={aboutCompany} onChange={(e) => {
            setAboutCompany(e.target.value)
        }} rows={4} placeholder="About Compnay" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
         <textarea value={perksAndBenefits} onChange={(e) => {
            setPerksAndBenefits(e.target.value)
        }} rows={4} placeholder="Perks And Benefits" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>  
        <textarea value={description} onChange={(e) => {
            setDescription(e.target.value)
        }} rows={4} placeholder="Description" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <textarea value={requirements} onChange={(e) => {
            setRequirements(e.target.value)
        }} rows={4} placeholder="Requirements" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <textarea value={responsibilities} onChange={(e) => {
            setResponsibilities(e.target.value)
        }} rows={4} placeholder="Responsibilities" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        
       
        
        <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold"}}>CONTRACT TYPE:</h1>
        <div style={{margin:"auto"}}>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="Temporary" checked={contractType == "Temporary"} onChange={(e) => { setContractType(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Temporary</h1> </div>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="Permanent" checked={contractType == "Permanent"} onChange={(e) => { setContractType(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Permanent</h1> </div>

        </div>
        <div className="flex flex-col h-[100px]">
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>COMPANY LOGO</h1>
            <input type="file" accept=".jpg" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getLogoUrl() {
                    let selectedPhoto=e.target.files[0]
                    let photoStorageReference=ref(storage,selectedPhoto.name+selectedPhoto.lastModified+Math.random().toString().slice(0,4))
                    await uploadBytes(photoStorageReference,selectedPhoto)
                    let photoUrl=await getDownloadURL(photoStorageReference)
                    setCompanyLogoUrl(photoUrl)
                }
                getLogoUrl()
            }} />
        </div>
        {companyLogoUrl.length>0?<img src={companyLogoUrl} style={{height:"50px",width:"50px",borderRadius:"30px",margin:"auto"}}/>:<h2  style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Company Logo Will Appear Here</h2>}
    
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px",marginTop:"10px"}} onClick={()=>{
           async function updateJob()
            {
                
            
            
                let response=await axios.put(`https://maritimebackend.azurewebsites.net/maritime/job/editjob/${Id}`,{title,description,requirements,responsibilities,location,companyName,companyLogoUrl,aboutCompany,salary,contractType,description,perksAndBenefits,postedON:new Date().toLocaleDateString(),category})
                if(response.data.success)
                {
                    toast.success("Job Successfully Updated!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    // setTimeout(()=>{
                    //     navigate("/")
                    // },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Adding Job",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            
            
            }
            updateJob()
        }}>Update Job</button>
        <ToastContainer/>
    </div>)
        }
}
export default EditJob
