import {useState} from 'react'
import {getAuth} from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import {db} from "../firebase.config"
import { updateDoc,doc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"


const Profile = () => {
  const [changeDetails , setChangeDetails] = useState(false);

  const auth = getAuth()
  const [formData , setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  })

  const {name , email} = formData;
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }
  
  const onSubmit = async() => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // update in firestore
        const userRef = doc(db , "users" , auth.currentUser.uid)
        await updateDoc(userRef,{
          name
        })
      }
    } catch (error) {
      toast.error("Could not update profile details")
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  return (
    <div className="Profile">
      <header className='profileHeader'>
        <p>pro</p>
        <button type='button' onClick={onLogout} className="logOut">
          Logout
        </button>
      </header>
  
  <main>
    <div className='profileDetailsHeader'>
    <p className='profileDetailsText'>profile</p>
    <p className='changePersonalDetails' onClick={
      () => {
        changeDetails && onSubmit()
        setChangeDetails((prevState)=>!prevState)
      }
    }> {changeDetails ? "done" : "change"}</p>
    </div>

    <div className="profileCard">
      <form>
        <input type="text" id='name'
        className={
          !changeDetails ? "profileName" : "profileNameActive"
        }
        value={name}
        disabled={!changeDetails}
        onChange={onChange}
        />
        <input type="email" id='email'
        className={
          !changeDetails ? "profileName" : "profileNameActive"
        }
        value={email}
        disabled={!changeDetails}
        onChange={onChange}
        />
      </form>
    </div>
    <Link to="/create-listing" className='createListing'>
      <img src={homeIcon} alt="home" />
      <p>Sell or rent your home</p>
      <img src={arrowRight} alt="arrow" />
    </Link>
  </main>

    </div>
  
  )
}

export default Profile