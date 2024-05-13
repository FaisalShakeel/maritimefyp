import { Link, useNavigate, useSearchParams } from "react-router-dom"
import './App.css';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import { useState } from "react";
function Home()
{
  let navigate=useNavigate()
    const[isHidden,setIsHidden]=useState(true)
    const[display,setDisplay]=useState('none')
    
    return(<div style={{display:"flex",flexDirection:"column"}}>
         <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"lightblue",fontFamily:"Caslon Antique"}}>
         <div style={{display:"flex",flexDirection:"column",backgroundColor:display=="none"?"lightblue":"black",width:"180px",borderRadius:"5px"}}>
                      <img src={display=='none'?require('./menuimage.jpg'):localStorage.getItem("profilePhotoUrl")} style={{height:38,width:38,borderRadius:"30px",margin:'auto'}} onClick={()=>{if(display=='none'){setDisplay("block")}else {setDisplay('none')}}} />
                      <button style={{display:display,fontFamily:"Caslon Antique",borderRadius:"10px",fontWeight:"bold", width:95,marginTop:"10px",marginBottom:"10px", margin:"auto"}} onClick={()=>{navigate(`/profile/${localStorage.getItem("UID")}`)}}>Profile</button>
                      <button onClick={()=>{navigate("/notifications")}} style={{display:display,fontFamily:"Caslon Antique",borderRadius:"10px",fontWeight:"bold",marginTop:"10px",width:95,margin:"auto"}}>Notifications</button>
                      <button onClick={()=>{
                        navigate("/mychats")
                      }} style={{display:display,fontFamily:"Caslon Antique",borderRadius:"10px",fontWeight:"bold",marginTop:"10px",width:95,margin:"auto"}}>Messages</button>
                      
                      </div>
                      <button style={{width:"100px", marginLeft:"auto",height:"30px",borderRadius:"30px",textAlign:"center",fontFamily:"Caslon Antique"}} onClick={()=>{navigate("/signup")}}>SignUp</button>
                      <button style={{width:"100px",height:"30px",borderRadius:"30px",textAlign:"center",fontFamily:"Caslon Antique"}} onClick={()=>{navigate("/login")}}>Login</button>
                     
      
              </div>
              <h1 style={{fontFamily:"Caslon Antique"}}>MARITIME</h1>
              <p style={{fontFamily:"Caslon Antique",fontSize:"13px"}}>The Maritime Industry is waterborne commerce – it’s about moving people and goods over the water. 

Maritime is most everything connected to the sea or waterways throughout the world, especially in relation to navigation, shipping, and marine engineering. The industry has a direct impact on much of our everyday lives. Think about the oil that powers our cars, many of our vehicles, our electronics, the coffee we drink, the foods we eat, and the clothes we wear… most come from overseas. 


Maritime is all around you here in Seattle. Have you spotted these companies?</p>
<h2 style={{fontSize:"13px",textAlign:"center",fontFamily:"Caslon Antique"}}>Find Employment And Learning Opportunities In Maritime</h2>

      
        <div  id="jobandcoursecontainer" >
          <div style={{display:"flex",flexDirection:"column",width:"280px",borderRadius:"30px",margin:"auto"}}>
            <img src={require('./maritimeeducationimage.jpg')} height={360} width={280} style={{borderRadius:"5px",margin:"auto"}}/>
            <h1 style={{fontFamily:"Caslon Antique",fontSize:"10px",textAlign:"center",margin:"auto"}}>Discover A Wide Range Of Courses And Training Programs</h1>
            <button style={{backgroundColor:"lightblue",textAlign:"center",color:"white",fontFamily:"Caslon Antique",width:"120px",margin:"auto", borderRadius:"30px"}} onClick={()=>{navigate("/courses")}}>Explore Courses</button>
            </div> 
            <div style={{display:"flex",flexDirection:"column",width:"280px",borderRadius:"30px",margin:"auto"}}>
            <img src={require('./maritimejobimage.jpg')} height={360} width={280} style={{borderRadius:"5px",margin:"auto"}}/>
            <h1 style={{fontFamily:"Caslon Antique",fontSize:"10px",textAlign:"center",margin:"auto"}}>Find Industry Specific Jobs And Apply For Your Dream Job</h1>
            <button style={{backgroundColor:"lightblue",textAlign:"center",color:"white",fontFamily:"Caslon Antique",width:"120px",margin:"auto", borderRadius:"30px"}} onClick={()=>{navigate("/jobs")}}>Browse Jobs</button>

            </div>  
           
        </div>
        <div  id="footer" >
          <div style={{display:"flex",flexDirection:"column",width:"280px",height:"280px", borderRadius:"30px",margin:"auto"}}>
            
            <h1 style={{fontFamily:"Caslon Antique", fontSize:"18px",textAlign:"center"}}>About Us</h1>
            <p style={{fontFamily:"Caslon Antique"}}>At the Martime Education And Job Portal,we are revolutionizing the way people access education and employment opportunities in Maritime</p>
            </div> 
            <div style={{display:"flex",flexDirection:"column",width:"280px", height:"280px", borderRadius:"30px",  margin:"auto"}}>
            <h1 style={{fontFamily:"Caslon Antique",fontSize:"18px",textAlign:"center"}}>Quick Links</h1>
            <a style={{fontFamily:"Caslon Antique",textAlign:"center"}} href="/courses">Courses</a>
            <a style={{fontFamily:"Caslon Antique",textAlign:"center"}} href="/jobs">Jobs</a>
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"280px",height:"280px", borderRadius:"30px",margin:"auto"}}>
            
            <h1 style={{fontFamily:"Caslon Antique",fontSize:"18px",textAlign:"center"}}>Contact Us</h1>
            <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Marimte Stree 127,Lahore</p>
            <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>EMail:Martime@example.com</p>
            <p style={{fontFamily:"Caslon Antique",textAlign:"center"}}>Phone:+923218082274</p>


            </div>   
           
        </div>
        

    </div>)
}
export default Home