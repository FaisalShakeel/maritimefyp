import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'

import { useNavigate } from "react-router-dom";
function SignUp() {
    let navigate=useNavigate()
    const [userName, setUserName] = useState("")
    const [EMailAddress, setEMailAddress] = useState("")
    const [passWord, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    return (<div  id="signupcontainer">
        <h1 style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",fontSize:"15px"}}>MARITIME</h1>
        {profilePhotoUrl.length > 0 ? <img src={profilePhotoUrl} style={{height:"40px",width:"40px",borderRadius:"30px",margin:"auto"}} /> : <div style={{height:"40px",width:"50px",borderRadius:"50px",backgroundColor:"gray",textAlign:"center",margin:"auto",fontWeight:"bold",paddingTop:"15px"}}>{userName.at(0)}</div>}
        <input placeholder="Name" onChange={(e) => {
            setUserName(e.target.value)
        }} style={{width:"98%",borderRadius:"30px",marginTop:"3px", height:"35px",textAlign:"center",fontFamily:"Caslon Antique"}} />
        <input onChange={(e) => {
            setEMailAddress(e.target.value)
        }} placeholder="EMail Address" style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}} />
        <textarea onChange={(e) => {
            setBio(e.target.value)
        }} rows={4} placeholder="Bio" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <input onChange={(e) => {
            setPassword(e.target.value)
        }} placeholder="Password" style={{textAlign:"center",fontSize:"13px",marginTop:"7px",width:"98%",borderRadius:"30px",height:"35px",fontFamily:"Caslon Antique"}} type="password" />
        <div className="flex flex-col h-[100px]">
            <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold",fontFamily:"Caslon Antique"}}>PROFILE PHOTO</h1>
            <input type="file" accept=".jpg" style={{fontFamily:"Caslon Antique",fontWeight:"bold",width:"100%",height:"35px"}} onChange={(e) => {
                async function getPhotoUrl() {
                    let selectedPhoto=e.target.files[0]
                    let photoStorageReference=ref(storage,selectedPhoto.name+selectedPhoto.lastModified+Math.random().toString().slice(0,4))
                    await uploadBytes(photoStorageReference,selectedPhoto)
                    let photoUrl=await getDownloadURL(photoStorageReference)
                    setProfilePhotoUrl(photoUrl)
                }
                getPhotoUrl()
            }} />
        </div>
        <h1 style={{textAlign:"center",fontSize:"13px",fontWeight:"bold"}}>JOIN AS:</h1>
        <div style={{margin:"auto"}}>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="admin" checked={selectedRole == "admin"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Admin</h1> </div>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="student" checked={selectedRole == "student"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Student</h1> </div>
            <div style={{display:"flex",flexDirection:"row"}}><input type="radio" value="job seeker" checked={selectedRole == "job seeker"} onChange={(e) => { setSelectedRole(e.target.value) }} /> <h1 style={{fontSize:"12px",paddingTop:"3px"}}>Job Seeker</h1></div>
        </div>
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px"}} onClick={()=>{
           async function signUp()
            {
                console.log(userName)
                console.log(EMailAddress)
            let missingFields=false
            let fields = [userName,bio,EMailAddress,passWord,profilePhotoUrl,selectedRole]
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
                let response=await axios.post("https://maritimebackend.azurewebsites.net/maritime/user/register",{name:userName,EMailAddress,passWord,bio,profilePhotoUrl,role:selectedRole})
                if(response.data.success)
                {
                    localStorage.setItem("role",selectedRole)
                    localStorage.setItem("UID",response.data._Id)
                    localStorage.setItem("profilePhotoUrl",response.data.profilePhotoUrl)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Account  Created!",{position:"top-center",style:{fontFamily:"Caslon Antique",fontWeight:"bold"}})
                    setTimeout(()=>{
                        navigate("/")
                    },1500)
                }
                else if(response.data.success==false && response.data.isRegistered)
                {
                    toast.error("Mail Address Is Already Taken!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }
                else
                {
                    toast.error("Error While Creating Account!",{position:"top-center",style:{fontFamily:"Caslon Antique"}})
                }

            }
            
            }
            signUp()
        }}>Register</button>
        <ToastContainer/>
    </div>)
}
export default SignUp
/*
Server Name:maritimesystem
Admin Name:Maritime
PassWord:_Fs1234567
*/