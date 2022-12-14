import "swiper/swiper-bundle.css";
import   SwiperCore , {EffectFade,Autoplay,Navigation, Pagination, Scrollbar,A11y } from "swiper"
import { Swiper, SwiperSlide} from "swiper/react"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";



SwiperCore.use([Navigation,Pagination,Autoplay,Scrollbar,A11y,EffectFade])
const Slider = () => {
    const [Loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

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
    if (Loading) {
        return <Spinner/>
    }

    if (listings.length === 0) {
        return <></>
    }
  return listings && <>
    <p className="exploreHeading">Recommended</p>
    <Swiper 
  modules={[EffectFade]} effect="fade"
 autoplay={{
   delay: 2000,
 }} className="swiper-container" slidesPerView={1} pagination={{clickable:true}}>
    {listings.map(({data,id})=>(
        <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
            <div style={{background: `url(${data.imgUrls[0]}) center no-repeat`,
        backgroundSize:"cover"}} className="swiperSlideDiv">
            <p className="swiperSlideText">
                {data.name}
            </p>
            <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}{" "}
            {data.type === "rent" && "/ month"}</p>
        </div>
        </SwiperSlide>
    ))}
    </Swiper>
  </>
}

export default Slider