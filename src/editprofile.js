import { Suspense, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import storage from "./firebaseConfig";
import { ref,getDownloadURL,uploadBytes } from "firebase/storage";
import axios from 'axios'
import ReactLoading from 'react-loading'

import { useNavigate } from "react-router-dom";
function EditProfile() {
    let navigate=useNavigate()
    const [userName, setUserName] = useState("")
    const [passWord, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("")

    const[successfullyFetched,setSuccessfullyFetched]=useState("")
    useEffect(()=>{
        async function getUser()
        {
            let response=await axios.get(`https://maritimebackend.azurewebsites.net/maritime/user/getuser/${localStorage.getItem("UID")}`)
            if(response.data.success)
                {
                    setUserName(response.data.user.name)
                    setPassword(response.data.user.passWord)
                    setBio(response.data.user.bio)
                    setProfilePhotoUrl(response.data.user.profilePhotoUrl)
                    setSuccessfullyFetched(true)
                }
        }
        if(successfullyFetched==false)
            {
                getUser()
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
        {profilePhotoUrl.length > 0 ? <img src={profilePhotoUrl} style={{height:"40px",width:"40px",borderRadius:"30px",margin:"auto"}} /> : <div style={{height:"40px",width:"50px",borderRadius:"50px",backgroundColor:"gray",textAlign:"center",margin:"auto",fontWeight:"bold",paddingTop:"15px"}}>{userName.at(0)}</div>}
        <input placeholder="Name" value={userName} onChange={(e) => {
            setUserName(e.target.value)
        }} style={{width:"98%",borderRadius:"30px",marginTop:"3px", height:"35px",textAlign:"center",fontFamily:"Caslon Antique"}} />
       
        <textarea value={bio} onChange={(e) => {
            setBio(e.target.value)
        }} rows={4} placeholder="Bio" style={{marginTop:"7px",fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique",borderRadius:"15px",width:"98%"}}></textarea>
        <input value={passWord} onChange={(e) => {
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
       
        <button style={{margin:"auto",width:"100px",fontFamily:"Caslon Antique",fontWeight:"bold",borderRadius:"30px"}} onClick={()=>{
           async function update()
            {
        
    
                let response=await axios.put(`https://maritimebackend.azurewebsites.net/maritime/user/update/${localStorage.getItem("UID")}`,{name:userName,passWord,bio,profilePhotoUrl})
                if(response.data.success)
                {
                    
                    localStorage.setItem("profilePhotoUrl",response.data.profilePhotoUrl)
                    
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
            update()
        }}>Update</button>
        <ToastContainer/>
    </div>)
        }
}
export default EditProfile
/*
Server Name:maritimesystem
Admin Name:Maritime
PassWord:_Fs1234567
*/