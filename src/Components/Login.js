import { useState } from "react";
import Inventory from "./Inventory";
import './Login.css';


function Login(){

const [usernameValue, setUsernameValue] = useState();
const [passwordValue, setPasswordValue] = useState();
const [showPanel, setShowPanel] = useState(false);



 const handleInputChange =(e) =>{
    const {id, value} = e.target;
    if(id=== "username"){
        setUsernameValue(value)
    }

    if(id === "password"){
        setPasswordValue(value)
    }
 }
  

 const handleSubmit = () =>{
    if(usernameValue === "admin" && passwordValue=== "123"){
        setShowPanel(true);
    } else {
        setShowPanel(false)
    }
 }

    return(
        <div>
          {
                showPanel === true &&
                <div className="inventory">
                 <Inventory></Inventory>
                 <button onClick={()=>setShowPanel(false)}>LogOut</button>
                </div> 
                   
          }
          {
                showPanel === false &&
                <div className="logIn">
                   <div id="title">
                       <img src="https://pbs.twimg.com/profile_images/567298862352568320/so1NKi2F_400x400.png" alt="" width={63} height={63}></img>
                       <h1>Varia</h1>
                   </div>
                   <div className="form">
                      <h2>Sign In</h2>
                      <input type="text" placeholder="Email" value={usernameValue} onChange = {(e) => handleInputChange(e)} id="username"></input>
                      <input type="password"  placeholder="Password" value={passwordValue} onChange = {(e) => handleInputChange(e)} id="password"></input>
                      <button onClick={()=>handleSubmit()} type="submit" >Log In</button>
                   </div>
               </div>
          }
         
            
            
        </div>
    )
}

export default Login