import React, { useState } from 'react';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import  visibilityIcon  from '../assets/svg/visibilityIcon.svg';
import { Link , useNavigate } from 'react-router-dom'
import {getAuth , signInWithEmailAndPassword} from "firebase/auth"
import { toast } from 'react-toastify';


const SignIn = () => {
  const [showPassword , setShowPassword] = useState(false)

  const [formData,  setformData] = useState({
    email: "",
    password: "",
  })
  const {email , password} = formData
  
  const onChange = (e) => {
    setformData( (prevState) =>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth , email , password)

      if (userCredential.user) {
        navigate("/") 
      } else {
        
      }
    } catch (error) {
      toast.error("Bad User Credentials ");
    }
  }

  const navigate = useNavigate();

  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
      </header>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id="email" value={email} onChange={onChange} />


          <div className="passwordInputDiv">
            <input
            className='passwordInput' type={showPassword ? "text" : "password"}
            id="password"
            placeholder='password'
            value={password}
            onChange={onChange} />
          <img
          className='showPassword'
          src={visibilityIcon} alt="showpassowrd" onClick={()=>setShowPassword((prevState) => !prevState ) } />
          </div>

          <Link to="/forgot-password" className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
            </button>
          </div>
        </form>

        {/* Google Auth */}

        <Link to="/sign-up" className='registerLink'>
          Sign up Instead
        </Link>
    </div>
    </>
  )
}

export default SignIn