import {useEffect, useState} from 'react'
import {getAuth} from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import {db} from "../firebase.config"
import { updateDoc,doc, collection, query, where, orderBy, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"
import ListingItem from "../components/ListingItem"

const Profile = () => {
  const [changeDetails , setChangeDetails] = useState(false);

  const auth = getAuth()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData , setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  })

  const {name , email} = formData;
  const navigate = useNavigate()


  useEffect(() => {
    
    const fetchUserListings = async ()=>{
      const listingRef = collection(db,"listings")
      const q = query(listingRef,where("userRef" , "==" , auth.currentUser.uid) , orderBy("timestamp","desc"))

      const querySnap = await getDocs(q);
      let listing = []

      console.log(listing);
      querySnap.forEach((doc) => {
        return listing.push({
          id:doc.id,
          data:doc.data()
        })
      });
      setListing(listing)
      setLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])
  


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

  const onDelete = async(listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db,"listings",listingId))
      const updatedListings = listing.filter((list)=> !list.id === listingId)
      setListing(updatedListings)
      toast.success("Successfule deleted listing")
    }
  }

  return (
    <div className="profile">
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


    {!loading && listing?.length > 0 && (
      <>
        <p className="listingText">Your Listings</p>
        <ul className="listingsList">
          {listing.map((list)=> (
            <ListingItem key={list .id} listing={list .data} id={list.id} onDelete={()=> onDelete(list .id)}/>
          ))}
        </ul>
      </>
    )}
  </main>

    </div>
  
  )
}

export default Profile