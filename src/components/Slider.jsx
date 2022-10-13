import "swiper/swiper-bundle.css";
import   SwiperCore , { Navigation, Pagination, Scrollbar,A11y } from "swiper"
import { Swiper, SwiperSlide} from "swiper/react"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";


SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])
const Slider = () => {
    const [Loading, setLoading] = useState(true)
    const [Listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListing = async () => {
            const listingsRef = collection(db , "listings")
        const q = query(listingsRef , orderBy("timestamp" , "desc"),limit(5))
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc)=> {
            return listings.push({
                id:doc.id,
                data:doc.data()
            })
        })
        setListings(listings)
        setLoading(false)
        }
        fetchListing()
    }, [])
    
  return (
    <div>Slider</div>
  )
}

export default Slider