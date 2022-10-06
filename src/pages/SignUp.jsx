import React, { useState } from 'react';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import  visibilityIcon  from '../assets/svg/visibilityIcon.svg';
import { Link , useNavigate } from 'react-router-dom'


const SignUp = () => {
  const [showPassword , setShowPassword] = useState(false)

  const [formData,  setformData] = useState({
    name:"",
    email: "",
    password: ""
  })
  const {name, email ,  password} = formData
  
  const onChange = (e) => {
    setformData( (prevState) =>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
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
        <form>
          <input type="text" className="nameInput" placeholder='Name' id="name" value={name} onChange={onChange} />

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

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
            </button>
          </div>
        </form>

        {/* Google Auth */}

        <Link to="/sign-in" className='registerLink'>
          Sign in Instead
        </Link>
    </div>
    </>
  )
}

export default SignUp