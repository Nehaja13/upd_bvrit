import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopUp = ({setShowLogin,setToken}) => {
  // const {url} = useContext(StoreContext);
  const [image,setIamge] = useState(false);
  const url = "http://localhost:4000"
  const [currState,setCurrState] = useState("Login")
  const[data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  // const onLogin = async (event) =>{
  //   event.preventDefault();
  //   let newUrl = url;
  //   if(currState === "Login"){
  //     newUrl += '/api/vendor/login';
  //   }
  //   else{
  //     newUrl += '/api/vendor/register';
  //     data.logo  = image;
  //   }
  //   const response = await axios.post(newUrl,data);
  //   if(response.data.success){
  //     setToken(response.data.token)
  //     localStorage.setItem("token",response.data.token);
  //     setShowLogin(false);
  //   }
  //   else{
  //     alert(response.data.message);
  //   }
  // }



  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl;
    const formData = new FormData(); // Create a new FormData object

    // Append fields to FormData
    if (currState === "Login") {
        formData.append("email", data.email);
        formData.append("password", data.password);
        newUrl = url + '/api/vendor/login';
    } else {
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (image) {
            formData.append("logo", image); // Append the image file
        }
        newUrl = url + '/api/vendor/register';
    }

    try {
        const response = await axios.post(newUrl, formData);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred during the request.");
    }
};

  
  return (
    <div className='login-popup'>
     <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currState === "Login"?<></>:
        <>
        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />

            <div className="add-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
                <input onChange={(e)=>setIamge(e.target.files[0])} type="file" id="image" hidden required/>
            </div>

        </>
        }
        <input  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
        <input  name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Your password" required />
      </div>
        <button type="submit">{currState==="Sign Up"?"Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p>By continuing, i agree to the terms & conditions  of privacy Policy. </p>
      </div>
      {currState==="Login"
      ?<p>Create a new account?<span onClick={()=>{setCurrState("Sign Up")}}> Click here</span></p>
      :<p>Already have an account <span onClick={()=>{setCurrState("Login")}}> Login here</span></p>
      }
     </form>
    </div>
  )
}

export default LoginPopUp
