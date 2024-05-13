import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
function Login()
{
    
    let navigate=useNavigate()
    const[EMailAddress,setEMailAddress]=useState("")
    const [passWord,setPassWord]=useState("")
    return(<div style={{width:"280px",display:"flex",flexDirection:"column",margin:"auto",backgroundColor:"lightblue",borderRadius:'5px',height:"300px"}}>
         <h1 style={{fontFamily:"Caslon Antique",textAlign:"center",fontWeight:"bold",fontSize:"13px"}}>MARITIME ELEARN</h1>
        <input placeholder="EMail Address"  onChange={(e)=>{setEMailAddress(e.target.value)}} style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}}/>
        <input placeholder="Password" type="password" onChange={(e)=>{setPassWord(e.target.value)}} style={{borderRadius:"30px",width:"98%",height:"35px",textAlign:"center", marginTop:"10px",fontFamily:"Caslon Antique"}}/>
        <button style={{fontFamily:"Caslon Antique",fontWeight:"bold",textAlign:"center",width:"130px",margin:"auto",borderRadius:"30px",marginTop:"30px"}} onClick={()=>{
            async function Login()
            {
                let attributes=[EMailAddress,passWord]
                let missingFields=false
                for(let attribute of attributes)
                {
                    if(attribute.length==0)
                    {
                        missingFields=true
                    }
                }
                if(missingFields)
                {
                    toast.warn("Missing Fields!",{position:"top-center",style:{font:"Alice"}})
                }
                else
                {
                   let response=await axios.post("https://maritimebackend.azurewebsites.net/maritime/user/login",{EMailAddress,passWord})
                   if(response.data.success)
                   {
                    toast.success("Successfully Logged In",{position:"top-center",style:{fontFamily:"Alice"}})
                    localStorage.setItem("UID",response.data.user.id)
                    localStorage.setItem("UProfilePhotoUrl",response.data.user.profilePhotoUrl)
                    localStorage.setItem("token",response.data.token)
                    localStorage.setItem("role",response.data.user.role)
                    setTimeout(()=>{
                        navigate("/")
                    },2000)
                   }
                   else if(response.data.success==false && response.data.message=="Incorrect PassWord")
                   {
                    toast.error("Incorrect PassWord!",{position:"top-center",style:{fontFamily:"Alice"}})
                   }
                   else if(response.data.success==false &&response.data.message=="EMailAddress Does Not Exist")
                   {
                    toast.error("EMail Address Does Not Exist.Try To Sign Up",{position:"top-center",style:{fontFamily:"Alice"}})
                   }
                   else
                   {
                    toast.error("There Was Error While Logging In",{position:"top-center",style:{fontFamily:"Alice"}})
                   }
                }

            }
            Login()
           
        }}>
            Login
        </button>
        <ToastContainer/>
    </div>)

}
export default Login