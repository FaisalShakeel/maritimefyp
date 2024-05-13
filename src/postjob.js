import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'

import { useNavigate } from "react-router-dom";
function AddJob() {
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
    return (<div  id="signupcontainer">
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",fontSize:"15px"}}>MARITIME</h1>
            
        <input onChange={(e) => {
            setTitle(e.target.value)
        }} placeholder="Title" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
            
        <input onChange={(e) => {
            setLocation(e.target.value)
        }} placeholder="Location" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
         <input onChange={(e) => {
            setCompnayName(e.target.value)
        }} placeholder="Company Name" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
        <input onChange={(e) => {
            setSalary(e.target.value)
        }} placeholder="Salary (In USD)"  type="number" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
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
        <textarea onChange={(e) => {
            setAboutCompany(e.target.value)
        }} rows={4} placeholder="About Compnay" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
         <textarea onChange={(e) => {
            setPerksAndBenefits(e.target.value)
        }} rows={4} placeholder="Perks And Benefits" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>  
        <textarea onChange={(e) => {
            setDescription(e.target.value)
        }} rows={4} placeholder="Description" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <textarea onChange={(e) => {
            setRequirements(e.target.value)
        }} rows={4} placeholder="Requirements" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <textarea onChange={(e) => {
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
           async function postJob()
            {
                
            let missingFields=false
            let fields = [title,description,location,requirements,responsibilities,contractType,perksAndBenefits,companyName,companyLogoUrl,aboutCompany,salary,category]
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
                let response=await axios.post(`https://maritimebackend.azurewebsites.net/maritime/job/addjob/${localStorage.getItem("UID")}`,{title,description,requirements,responsibilities,location,companyName,companyLogoUrl,aboutCompany,salary,contractType,description,perksAndBenefits,postedON:new Date().toLocaleDateString(),category})
                if(response.data.success)
                {
                    toast.success("Job Successfully Posted!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                    
                    // setTimeout(()=>{
                    //     navigate("/jobns")
                    // },1500)
                }
                else 
                {
                    toast.error("There Was An Error While Adding Job",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                

            }
            
            }
            postJob()
        }}>Post</button>
        <ToastContainer/>
    </div>)
}
export default AddJob
