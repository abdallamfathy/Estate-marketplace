import React, { useState } from 'react';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import  visibilityIcon  from '../assets/svg/visibilityIcon.svg';
import { Link , useNavigate } from 'react-router-dom'
import { getAuth , createUserWithEmailAndPassword , updateProfile} from "firebase/auth"
import { db } from "../firebase.config";
import { setDoc , doc , serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';


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

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth , email , password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName:name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      
      await setDoc(doc(db, "users" , user.uid) , formDataCopy )

      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with registration");
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

        <OAuth/>

        <Link to="/sign-in" className='registerLink'>
          Sign in Instead
        </Link>
    </div>
    </>
  )
}

export default SignUp