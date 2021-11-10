// import React, {useState} from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router'

// // functions to create -> fetch info for the trip, fetch reviews, fetch media
 
// const Trip1 = () => {

//     const any = useParams();
    
//     const [mediaObject, setMediaObject] = useState(null) // to pull media object links

//     // review -> [{ id, user, ratings, description, created (timing of creation of the review) },{},...]
//     // info -> { id(tripId), type, name, description, price, ratings }
//     // media -> [ { id, img-src,vid-src(null) },{id, img-src(null), vid-src},... ] 
    
    
    
//     const [mediaBool,setMediaBool]=useState(true)
//     const [reviewBool,setReviewBool]=useState(true)
//     const [tripInfoBool,setTripInfoBool]=useState(true)
    
//     const [rating,setRating]=useState(null)
//     const [userId,setUserId]=useState(null) // figure out this
//     const [verifiedUserRating,setVerifiedUserRating]=useState(null) //  clickable stars that really just send back numbers 1-5
//     const [ratingCreationTime,useRatingCreationTime]=useState(null) // find out how to do this tp send to the backend
//     const [ratingDescription,useRatingDescription] =useState(null) // basically the review to be sent to the backend
    
//     const [tripType,setTripType] = useState(null)
//     const [tripId,setTripId] =useState(null) // trip id to be fetched
//     const [tripName,setTripName] =useState(null) // trip name to be fetched and displayed
//     const [tripDescription,setTripDescription]=useState(null) // trip description tobe shown below the images
//     const [tripPrice,setTripPrice]=useState(null) // trip price
//     const [tripRatings,setTripRatings] =useState(null) // trip ratings are the net of all review ratings
    
//     const tripInfo = () => { // fetched and displayed ofc . map them out
//         axios.get(`trip/${any.name}`)
//         .then(res=>{

//             console.log(res.data)

//             setTripId(res.data.id)
//             setTripType(res.data.type)
//             setTripName(res.data.name)
//             setTripDescription(res.data.description)
//             setTripPrice(res.data.price)
//             setTripRatings(res.data.ratings)

//         })
//         .catch(err=>{
//             console.log(err)
//         })

//         return(
    
//             <div>
//                 <h3> {tripId} </h3>
//                 <h3> {tripType} </h3>
//                 <h3> {tripName} </h3>
//                 <h3> {tripDescription} </h3>
//                 <h3> {tripPrice} </h3>
//                 <h3> {tripRatings} </h3>
//             </div>
//         )

//     }
//     const ratings = () => { // ratings to be drawn from the user
        
//         return(
//             <div>
//                 <h1> Enter your review here: </h1>

//             </div>
//         )

//     }

//     const review = () => { // review to be shown to the user
        
//         axios.get(`trip/review/${any.name}`)
//         .then(res=>{
//             console.log(res.data)
//             res.data.map(att=>{
//                 <div>

//                     <h3> {att.id} </h3><br/>
//                     <h3><b/> {att.user} </h3><br/>
//                     <h3> {att.ratings} </h3><br/>
//                     <h3> {att.description} </h3><br/>
//                     <h6> {att.created} </h6><br/>

//                 </div>
//             })
            

//         })

//     }

//     const media = () => { // urls of the media img and vid (null or not)
        
//         axios
//         .get(`trip/media/${any.name}`)
//         .then(res=>{
//             console.log(res.data)
//             res.data.map(urls=>{
//                 <div>
//                     {urls.image&& <img src= {urls.image} /> }
//                     {urls.video&& <video controls src={urls.video} alt='' width='100%' /> }
//                 </div>
//                 // setMediaImgSrc(urls.image)
//                 // setMediaVidSrc(urls.video)
//             })
//         })
//         .catch(err=>{
//             console.log(err)
//         })
        
//     }
    
//     {reviewBool&&review()}
//     {mediaBool&&media()}
//     {tripInfoBool&&tripInfo()}

//     return(
//         <div>
//             <button onClick={reviewBool(false),mediaBool(false),tripInfoBool(false)}> add review </button>
//         </div>
//     )

// }

// export default Trip1;