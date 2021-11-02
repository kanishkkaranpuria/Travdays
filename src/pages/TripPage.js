import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

//  fetch reviews and ratings, and then like pick it up display all of it and then send it to the backend
// also uncomment the app.js wala shit

const Trip = () => {
    
    const [media,setMedia]=useState([]) // trip images and videos
    const [tripDescription,setTripDescription]=useState([]) // to be taken from the backend 
    const [price,setPrice]=useState(0)
    const [userId,setUserId] = useState(null)
    // const [review,setReview]=useState([])
    const [description,setDescription]=useState([]) // this is the review entered by a user not the one displayed
    const [tripId,setTripId]=useState(0)
    const [tripType,setTripType]=useState('')
    const [displayRatings, setDisplayRatings]=useState(0)
    const [rating,setRating]=useState(0)
    const [submitRatingButton,setSubmitRatingButton]=useState(0)
    const [descriptionEntered,setDescriptionEntered]=useState(false)
    // const [name,setName]=useState('')            
    // since not using the name as a dynamic fetched idea anymore

    const any = useParams();
    const Media = () => {
        axios
        .get(`trip/media/${any.name}`)
        .then(res=>{
            console.log(res.data)
            setMedia(res.data)
        })
        .catch ((err)=>{
            console.log(err)
        })

        // media.map( (url) =>{
        //     setUserId(url.id)
        //     if(url.image!=null){
        //         <img src={require(`${url.image}`)} />
        //     }
        //     else{
        //         <video width="750" height="500" controls >
        //             <source src={`${url.video}`} type="video/mp4" />
        //         </video>
        //     }
        // }
        // )
        
    }
    function review(){

        axios
        .get(`trip/review/${any.name}`)
        .then((res)=>{
            setDisplayRatings(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    const createReview = () => {
            // after rating submit button is clicked on
            axios
            .post(`trip/review/${any.name}`,
            {
                rating:rating,
                description:description,
                name:"Mumbai",
                userid : "userid"
            })
            .then(res=>{
                console.log(res)
                alert ('your response has been submitted')
            })
            .catch(err=>{
                console.log(err)
            })
        }

    const details = () => {

        axios
        .get(`/trip/${any.name}`,{

        })
        .then(res => {
            console.log(res)
            {<div>
                <h4>{res.data.user}</h4>
                <h3>type : {res.data.type} </h3>
                <h3>{res.data.name}</h3>
                <p> {res.data.description} </p>
                <h6> price : {res.data.price} </h6>
                <h4>ratings : {res.data.ratings} </h4>
            </div>}
        })
        .catch(

        )
    }

    return(
        <div className='trip-page'>
            <h1>Ugly af trip page</h1>

            {details()}
            {review()}
            {Media()}
            {console.log("can you even hear me !")}

            <div className='rating-by-user'>
                <h6>enter your review</h6>
                <button className='btn-1'onClick={() => {setRating(1);setSubmitRatingButton(true)}}>1</button>
                <button className='btn-2'onClick={() => {setRating(1);setSubmitRatingButton(true)}}>2</button>
                <button className='btn-3'onClick={() => {setRating(1);setSubmitRatingButton(true)}}>3</button>
                <button className='btn-4'onClick={() => {setRating(1);setSubmitRatingButton(true)}}>4</button>
                <button className='btn-5'onClick={() => {setRating(1);setSubmitRatingButton(true)}}>5</button>

                <button className='clear-rating-btn' onClick={() => setSubmitRatingButton(false)} >clear rating</button>

            
            <h1>enter your description of the review </h1>
            <form >
                <input type="text" require
                    onChange={(e) => setDescription(e.target.value)} />
                
            </form>
                

                if(submitRatingButton&&descriptionEntered)
                {
                    <button onClick={createReview()}>submit</button>
                }
                
            </div>

        </div>
    );
}

export default Trip;
