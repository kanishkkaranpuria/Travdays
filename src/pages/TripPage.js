import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Carousel from "../components/Carousel"


const Trip = () => {

    const [images,setImages]=useState([])
    const [tripDescription,setTripDescription]=useState([])
    const [price,setPrice]=useState(0)
    const [review,setReview]=useState([])
    const [tripId,setTripId]=useState(0)
    const [tripType,setTripType]=useState('')
    const [ratings, setRatings]=useState(0)
    // const [name,setName]=useState('')            
    // since not using the name as a dynamic fetched idea anymore

    const name = useParams();
    const imagesCarousel= () => {
        axios
        .get(`trip/media/${name}`)
        .then(res=>{
            console.log(res.data)
            setImages(res.data)
        })
        .catch ((err)=>{
            console.log(err)
        })
        {<Carousel images={images}/>}
        // <Carousel images={images}/>  why didn't this work and why did have to have it inside {} ??
    }
    // function review(){}

    const details = () => {

        axios
        .get(`/trip/${name}`,{

        })
        .then(res => {
            console.log(res)
            setPrice(res.data.price)
        })
        .catch(

        )
    }

    return(
        <div className='trip-page'>
            <h1>Ugly af trip page</h1>

            {details()}
            {review()}
            {imagesCarousel()}

        </div>
    );
}

export default Trip;