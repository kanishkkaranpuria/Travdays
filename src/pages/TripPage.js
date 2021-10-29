// import React, { useState } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router'

// //  fetch reviews and ratings, and then like pick it up display all of it and then send it to the backend
// also uncomment the app.js wala shit

// const Trip = () => {
    
//     const [media,setMedia]=useState([])
//     const [tripDescription,setTripDescription]=useState([])
//     const [price,setPrice]=useState(0)
//     const [review,setReview]=useState([])
//     const [tripId,setTripId]=useState(0)
//     const [tripType,setTripType]=useState('')
//     const [displayRatings, setDisplayRatings]=useState(0)
//     const [userGivenRatings,setUserGivenRatings]=useState(0)
//     const [submitRatingButton,setSubmitRatingButton]=useState(0)
//     // const [name,setName]=useState('')            
//     // since not using the name as a dynamic fetched idea anymore

//     const name = useParams();
//     const Media = () => {
//         axios
//         .get(`trip/media/${name}`)
//         .then(res=>{
//             console.log(res.data)
//             setMedia(res.data)
//         })
//         .catch ((err)=>{
//             console.log(err)
//         })

//         media.map( (url) =>{
//             if(url.image!=null){
//                 <img src={require(`${url.image}`)} />
//             }
//             else{
//                 <video width="750" height="500" controls >
//                     <source src={`${url.video}`} type="video/mp4" />
//                 </video>
//             }
//         })
        
//     }
//     function review(){

//         axios
//         .get(`trip/review/${name}`)
//         .then((res)=>{
//             setDisplayRatings(res.data)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })

//     }

//     const userRatings = (props) => {
//             // after rating submit button is clicked on
            
//         }

//     const details = () => {

//         axios
//         .get(`/trip/${name}`,{

//         })
//         .then(res => {
//             console.log(res)
//             setPrice(res.data.price)
//         })
//         .catch(

//         )
//     }

//     return(
//         <div className='trip-page'>
//             <h1>Ugly af trip page</h1>

//             {details()}
//             {review()}
//             {Media()}

//             <div className='rating-by-user'>
//                 <button className='btn-1'onClick={setUserGivenRatings(1),setSubmitRatingButton(true)}>1</button>
//                 <button className='btn-2'onClick={setUserGivenRatings(2),setSubmitRatingButton(true)}>2</button>
//                 <button className='btn-3'onClick={setUserGivenRatings(3),setSubmitRatingButton(true)}>3</button>
//                 <button className='btn-4'onClick={setUserGivenRatings(4),setSubmitRatingButton(true)}>4</button>
//                 <button className='btn-5'onClick={setUserGivenRatings(5),setSubmitRatingButton(true)}>5</button>

//                 <button className='clear-rating-btn' onClick={setSubmitRatingButton(false)} >clear rating</button>

//                 if(submitRatingButton)
//                 {
//                     <button onClick={userRatings(userGivenRatings)}>submit</button>
//                 }
                
//             </div>

//         </div>
//     );
// }

// export default Trip;
