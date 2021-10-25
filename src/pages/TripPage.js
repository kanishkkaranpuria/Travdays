import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const Trip = () => {

    const [images,setImages]=useState([])
    const [tripDescription,setTripDescription]=useState([])
    const [trip,setPrice]=useState(0)
    const [review,setReview]=useState([])
    const [tripId,setTripId]=useState(0)
    const [tripType,setTripType]=useState('')
    const [ratings, setRatings]=useState(0)
    // const [name,setName]=useState('')

    const name = useParams();
    function imagesCarousel(){}
    // function review(){}

    const details = () => {

        axios
        .get(`/trip/${name}`,{

        })
        .then(res => {console.log(res)})
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