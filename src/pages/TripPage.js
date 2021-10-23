import React, { useState } from 'react'
import axiosInstance from "./axios"

const Trip = () => {

    const [images,setImages]=useState([])
    const [tripDescription,setTripDescription]=useState([])
    const [trip,setPrice]=useState(0)
    const [review,setReview]=useState([])
    const [tripId,setTripId]=useState(0)
    const [tripType,setTripType]=useState('')
    const [ratings, setRatings]=useState(0)
    const [name,setName]=useState('')
    const 

    function imagesCarousel(){

    }

    function review(){

    }

    function details(){

        axiosInstance
        .get('/trip/Mumbai',{

        })

        .then(response => {
          response.data.map(
              (items) => <div>
                  {setTripId(items.id)}
                  {setTripType(items.type)}
                  {setTripName(items.name)}
                  {setTripDescription(items.description)}
                  {setPrice(items.price)}
                  {setRatings(items.ratings)}
              </div>
          )
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