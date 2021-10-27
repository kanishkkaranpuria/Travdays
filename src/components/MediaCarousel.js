import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'

const MediaCarousel = (media)=>{
    return (
        <Carousel infiniteloop autoPlay >
            
            {
                media.map((media)=>{
                    if(media.image!=null){
                        <img src= {media.image} />
                    }
                    else{
                        <video>
                            <source src={media.video} type="video/mp4"/>
                        </video>
                    }
                })
            }

        </Carousel>
    )
}
export default MediaCarousel;