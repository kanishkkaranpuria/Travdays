// import React, {useState} from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router'

// // functions to create -> fetch info for the trip, fetch reviews, fetch media
 
// const Trip1 = () => {

//     const any = useParams();
    
//     const [mediaObject, setMediaObject] = useState(null) // to pull media object links
//     const [tripInfoObject, setTripInfoObject] = useState(null) // info for trip
//     const [reviewObject,setReviewObject] = useState(null) // review object

//     // review -> [{ id, user, ratings, description, created (timing of creation of the review) },{},...]
//     // info -> { id(tripId), type, name, description, price, ratings }
//     // media -> [ { id, img-src,vid-src(null) },{id, img-src(null), vid-src},... ] 

//     const [mediaId,setMediaId]=useState(null) // to be fetched
//     const [mediaImgSrc,setMediaImgSrc]=useState(null) // media img src could be nullor not 
//     const [mediaVidSrc,setMediaVidSrc]=useState(null) // video src, could be null or not depending on if the img src is null 

//     const [reviewId,setReviewId]=useState(null) // from the link : to be displayed
//     const [reviewUser,setReviewUser]=useState(null) // to be shown as username
//     const [reviewRatings,setReviewRatings]=useState(null) // to be fetched!!!!!!!!!!!!!!!!!!~!!!!!!!!!  and displayed in stars
//     const [reviewDescription,setReviewDescription] =useState(null)// in para tag
//     const [reviewCreationTime, setReviewCreationTime]=useState(null) // to be displayed in h6 wityh bold tag

//     const [tripId,useTripId] =useState(null) // trip id to be fetched
//     const [tripName,useTripName] =useState(null) // trip name to be fetched and displayed
//     const [tripDescription,useTripDescription]=useState(null) // trip description tobe shown below the images
//     const [tripPrice,setTripPrice]=useState(null) // trip price
//     const [tripRatings,setTripRatings] =useState(null) // trip ratings are the net of all review ratings

//     const [userId,setUserId]=useState(null) // figure out this
//     const [verifiedUserRating,setVerifiedUserRating]=useState(null) //  clickable stars that really just send back numbers 1-5
//     const [ratingCreationTime,useRatingCreationTime]=useState(null) // find out how to do this tp send to the backend
//     const [ratingDescription,useRatingDescription] =useState(null) // basically the review to be sent to the backend

//     const review = () => { // review to be shwon to the user

//     }

//     const ratings = () => { // ratings to be drawn from the user

//     }

//     const tripInfo = () => { // fetched and displayed ofc . map them out

//     }

//     const media = () => { // urls of the media img and vid (null or not)

//         axios
//         .get(`trip/media/${any.name}`)
//         .then(res=>{
//             console.log(res.data)
//             res.data.map(urls=>{
//                 if(urls.image===null) {}
//                 else {}
//             })
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }

//     return(
//         <div>
//             <h1>TripPage1</h1>

//         </div>
//     )
// }

// export default Trip1;