// import React from "react";
// import fullaxios from "../components/FullAxios";
// import { useParams } from "react-router";
// import { useHistory } from 'react-router'
// import { useState } from "react";
// import { useEffect } from "react";

// const Trip2 = () => {

//     let history = useHistory()

//     const { name } = useParams()

//     // const [infoBool, setInfoBool] = useState(true)
//     // const [mediaBool, setMediaBool] = useState(true)
//     // const [reviewBool, setReviewBool] = useState(true)
//     // boolean lmao for triggering functions here

//     const [infoObject, setInfoObject] = useState([])
//     const [mediaObject, setMediaObject] = useState([])
//     const [reviewObject, setReviewObject] = useState([])

//     const [userGivenStars, setUserGivenStars] = useState(0)    //  clickable stars that really just send back numbers 1-5
//     const [userGivenDescription, setUserGivenDescription] = useState(null) // basically the review to be sent to the backend


//     useEffect(() => {

//         fullaxios({ url: 'trip/' + name, sendcookie: false })
//             // info fetched
//             .then(res => { // trip info being fetched as result
//                 console.log(res.data)
//                 console.log('data received')
//                 setInfoObject(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })

//         fullaxios({ url: 'trip/media/' + name, sendcookie: false })
//             // media is displayed post fetch
//             .then(res => { // media being fetched, gon be mapped then
//                 console.log(res.data)
//                 setMediaObject(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//                 alert(err)
//             })

//         fullaxios({ url: 'trip/review/' + name, sendcookie: false }) // trip review to be fetched
//             .then(res => {
//                 console.log(res.data)
//                 setReviewObject(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })



//     }, [])

//     // const takingRatingsByUser = () => {

//     //     <p>
//     //         <span style="color:blue;font-weight:bold" className='nice'> Here you can enter your Ratings </span>
//     //         <input
//     //             type='text'
//     //             require
//     //             placeholder=' write here your review '
//     //         >
//     //         </input>
//     //     </p>
//     // }

//     return (
//         <div>

//             {infoObject && <div>
//                 <p>

//                     {infoObject.name} <br />
//                     {infoObject.type} <br />
//                     {infoObject.description}<br />
//                     {infoObject.price}<br />
//                     {infoObject.ratings}<br />
//                 </p>
//             </div>}

//             {
//                 reviewObject && <div>
//                     {/* <hr align='center' width='100' /> */}
//                     {reviewObject.user}
//                     {reviewObject.ratings}
//                     {reviewObject.description}

//                 </div>
//             }

//             {
//                 mediaObject && mediaObject.map(urls => (
//                     <div>
//                         {urls.image && <img src={urls.image} />}
//                         {urls.video && <video controls src={urls.video} alt='' width='100%' />}
//                     </div>)
//                 )
//             }

//             {/* <button onClick={() => { setMediaObject(false) && setReviewObject(false) && setInfoObject(false) }}>
//                 send a review
//             </button> */}

//             <p> Your review to be entered here: </p>

//             <button className='btn-edit-stars' onClick={setUserGivenStars(1)}>1</button>
//             <button className='btn-edit-stars' onClick={setUserGivenStars(2)}>2</button>
//             <button className='btn-edit-stars' onClick={setUserGivenStars(3)}>3</button>
//             <button className='btn-edit-stars' onClick={setUserGivenStars(4)}>4</button>
//             <button className='btn-edit-stars' onClick={setUserGivenStars(5)}>5</button>

//             <input placeholder="write your review here.. " onChange={(e) => setUserGivenDescription(e.target.value)} >  </input>

//             {
//                 fullaxios({
//                     url: 'trip/revirecreate', type: 'post', data: {
//                         ratings: userGivenStars,
//                         name: (infoObject.name),
//                         description: userGivenDescription
//                     }, sendcookie: false
//                 })
//                     .then(res => {
//                         console.log(res.data)
//                         console.log('ratings by the user were submitted')
//                         // history.push(`/trip/${name}`)
//                     })
//                     .catch(err => {
//                         console.log(err)
//                         console.log('error lmao')
//                     })

//             }

//         </div>
//     );
// }

// export default Trip2;

import React from "react";
import fullaxios from "../components/FullAxios";
import { useParams } from "react-router";
import { useHistory } from 'react-router'
import { useState, useRef, useCallback } from "react";
import { useEffect } from "react";


const Trip = () => {

    const { name } = useParams()

    let history = useHistory()

    const [page, setPage] = useState(1) // page 1 pe req initial run fir ++ hota jaayega
    const [loading, setLoading] = useState(true) // initially true 
    const [hasMore, setHasMore] = useState(true)

    const [backToDisplay,setBackToDisplay]=useState(false) // to come back from book now feature

    const [infoObject, setInfoObject] = useState([])
    const [mediaObject, setMediaObject] = useState([])
    const [reviewObject, setReviewObject] = useState([])
    const [reviewCreationBool, setReviewCreationBool] = useState(false)
    const [isbooking, setIsbooking] = useState(false)

    const observer = useRef('') // has only one attribute - current!

    const [userGivenStars, setUserGivenStars] = useState(0)
    const [userGivenDescription, setUserGivenDescription] = useState('')

    useEffect(() => {
        setIsbooking(false);
        setBackToDisplay(false);
        fullaxios({ url: 'trip/' + name, sendcookie: false })
            .then(res => {
                // console.log('trip info : \n ' + res.data)
                // console.log('info data received')
                setInfoObject(res.data)
            })
            .catch(err => {
                console.log(err)
            })



        fullaxios({ url: 'trip/media/' + name, sendcookie: false })
            .then(res => {
                console.log(res.data)
                setMediaObject(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })


        fullaxios({ url: 'trip/review/create/' + name, sendcookie: false })
            .then(res => {
                // console.log('review worth :\n' + res.data)
                setReviewCreationBool(res.data)
            })

    }, [backToDisplay])


    const lastDataElementRef = useCallback(node => {
        console.log('last element')
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])


    useEffect(() => {

        fullaxios({ url: 'trip/review/' + name + '?page=' + page, sendcookie: false })
            .then(res => {

                console.log('review info: ', res.data)
                setReviewObject(prev => [...prev, ...res.data])

            })
            .catch(err => {
                if (err.response.data.detail === "Invalid page.") {
                    setHasMore(false)
                }
            })

        setLoading(false)

    }, [page])


    const booking = () => {

        setMediaObject(null);
        setInfoObject(null);
        setReviewObject(null);
        setReviewCreationBool(false);
         setIsbooking(true);
      
    }


    const submitReview = () => {
        fullaxios({
            url: 'trip/review/create/' + name, type: 'post', data: {
                ratings: userGivenStars,
                description: userGivenDescription,
                name: (infoObject.name)
            }
        })
            .then(res => {
                console.log('review submitted')
                history.push(`/trip/${name}`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    useEffect(() => {
        console.log(isbooking)
        console.log(backToDisplay,"backtodisplay")
    }, [isbooking,backToDisplay])

    return (
        <div className="review">

            {infoObject &&
                <div>
                    {infoObject.name} <br />
                    {infoObject.type}<br />
                    {infoObject.description}<br />
                    {infoObject.price}<br />
                    {infoObject.ratings}<br />
                </div>}

            {
                mediaObject && mediaObject.map((data) => {
                    return (
                        <div >
                            {data.image && <img src={data.image} />}
                            {data.video && <video controls src={data.video} alt='' width='100%' />}
                        </div>
                    )

                }
                )
            }

            {
                reviewObject && reviewObject.map((data, index) => {
                    if (reviewObject.length === index + 1) {
                        return (<div ref={lastDataElementRef}>
                            {data.user}
                            <h2>description : {data.description}</h2>

                            <h2>rating:{data.ratings}</h2>


                        </div>)
                    }

                    else return (
                        <div>
                            {data.user} , {data.created}
                            <h2>description : {data.description}</h2>

                            <h2>rating:{data.ratings}</h2>
                        </div>)
                })
            }

            {

                reviewCreationBool &&
                <div>
                    <h3>enter review here:</h3>
                    <button onClick={() => { setUserGivenStars(1) }}>1</button><br />
                    <button onClick={() => { setUserGivenStars(2) }}>2</button><br />
                    <button onClick={() => { setUserGivenStars(3) }}>3</button><br />
                    <button onClick={() => { setUserGivenStars(4) }}>4</button><br />
                    <button onClick={() => { setUserGivenStars(5) }}>5</button><br />


                    <input require placeholder='reviews..' onChange={(e) => setUserGivenDescription(e.target.value)} />

                    {userGivenDescription && userGivenStars && <div>
                        <button onClick={() => { submitReview() }}>SUBMIT</button>
                    </div>}
                    <button onClick={() => {  booking() }}> BOOK NOW </button>

                </div>
            }
            <br />

           

            {
                isbooking && <div className="">
                     <button onClick={()=>{setBackToDisplay(true) ;console.log("wtaf")}} >back to trip page</button>
                </div>            }
        </div>

    );
}

export default Trip
    ;