import React from "react";
import fullaxios from "../components/FullAxios";
import { useParams } from "react-router";
import { useHistory } from 'react-router'
import { useState, useRef, useCallback } from "react";
import { useEffect } from "react";


const Trip = ({ isAuth }) => {

    const {name} = useParams()

    let history = useHistory()

    const [page, setPage] = useState(1) // page 1 pe req initial run fir ++ hota jaayega
    const [loading, setLoading] = useState(false) // initially false
    const [loadingdone2, setLoadingdone2] = useState(false) // initially false 
    const [loadingdone3, setLoadingdone3] = useState(false) // initially false 
    const [hasMore, setHasMore] = useState(true)

    const [backToDisplay, setBackToDisplay] = useState(false) // to come back from book now feature

    const [infoObject, setInfoObject] = useState([])
    const [mediaObject, setMediaObject] = useState(null)
    const [reviewObject, setReviewObject] = useState([])
    const [reviewCreationBool, setReviewCreationBool] = useState(false)
    const [refetch, setRefetch] = useState(true)
    const [isbooking, setIsbooking] = useState(false)

    const [bookingQuery, setBookingQuery] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [errorForEmptySubmission, setErrorForEmptySubmission] = useState(false)

    const [reviewSubmitted, setReviewSubmitted] = useState(false)

    const observer = useRef('') // has only one attribute - current!

    const [userGivenStars, setUserGivenStars] = useState(0)
    const [userGivenDescription, setUserGivenDescription] = useState('')

    
    useEffect(() => {
        setIsbooking(false);
        setBackToDisplay(false);
        setLoadingdone2(false)
        setLoadingdone3(false)
        fullaxios({ url: 'trip/' + name })
            .then(res => {
                if (res) {
                    // console.log('trip info : \n ' + res.data)
                    // console.log('info data received')
                    setInfoObject(res.data)
                    setLoadingdone2(true)


                }
            })
            .catch(err => {
                console.log(err)
            })

        // fullaxios({ url: 'userinfo/status' })
        //     .then(res => {
        //         if (res) {
        //             // console.log(res.data)
        //             setIsAuth(res.data.authenticated)
        //             console.log(isAuth)
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        fullaxios({ url: 'trip/media/' + name })
            .then(res => {
                if (res) {
                    console.log(res.data)
                    setMediaObject(res.data)
                    console.log(res.data)
                    setLoadingdone3(true)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, [backToDisplay || reviewSubmitted])

    useEffect(() => {
        if (isAuth) {
            fullaxios({ url: 'trip/review/create/' + name })
                .then(res => {
                    if (res) {
                        console.log('review worth :\n' + res.data.bool)
                        setReviewCreationBool(res.data.bool)
                    }
                })
        }
        else {
            setReviewCreationBool(false)
        }
    }, [isAuth, backToDisplay])

    const submitBooking = (e) => {
        e.preventDefault()
        fullaxios({
            url: 'booking/', type: 'post', data: {

                phone: phoneNumber,
                query: bookingQuery,
                trip: name,

            }
        })
            .then(res => {
                console.log(res)
                alert('ho gaya')

            })
            .catch(err => {
                console.log(err)
            })
    }

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
        setLoading(true)
        fullaxios({ url: 'trip/review/' + name + '?page=' + page })
            .then(res => {
                if (res) {
                    // setFeatured(prev=>[...prev,...res.data])
                    console.log('review info: ', res.data)
                    setReviewObject(prev => [...prev, ...res.data])
                    setLoading(false)
                }

            })
            .catch(err => {
                if (err && (err.response.data.detail === "Invalid page.")) {
                    // setLoading(true)
                    setHasMore(false)
                }
            })


    }, [page, backToDisplay, refetch])


    const booking = () => {
        if (isAuth) {
            setMediaObject(null);
            setInfoObject(null);
            setReviewObject([]);
            setReviewCreationBool(false);
            setPage(1);
            setIsbooking(true);
        }
        else {
            alert("You have to sign in to book the website")
        }
    }


    const submitReview = () => {
        console.log("this is running for no reason at all")
        if (userGivenDescription && userGivenStars) {
            fullaxios({
                url: 'trip/review/create/' + name, type: 'post', data: {
                    ratings: userGivenStars,
                    description: userGivenDescription,
                    name: (infoObject.name)
                }
            })
                .then(res => {
                    console.log(res.data)
                    console.log('review submitted')
                    history.push(`/trip/${name}`)
                    setReviewObject([])
                    setHasMore(true)
                    setErrorForEmptySubmission(false)
                    setUserGivenDescription("")
                    setUserGivenStars(0)
                    if (page === 1) { if (refetch === true) { setRefetch(false) } else { setRefetch(true) } }
                    else { setPage(1) }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            setErrorForEmptySubmission(true)
        }
    }

    useEffect(() => {
        console.log(isbooking)
        console.log(backToDisplay, "backtodisplay")

    }, [isbooking, backToDisplay])

    var percentage = "";
    var allstars = {};
    var reviewStars = {};
    var writeReviewStars = {};

    function calculation(data, stardata) {
        // var star = "url(#full)";
        for (let i = 1; i < 6; i++) {
            console.log(data.ratings)
            console.log(i)
            var ratings;
            if (data.ratings) ratings = parseFloat(data.ratings)
            else{
                ratings = parseFloat(data)
            }
            if (ratings >= i) {
                stardata = Object.assign(stardata, { [i]: "url(#full)" })
            }
            // else if(ratings < i && ratings != i){
            //   stardata = Object.assign(stardata, {[i]:"url(#partial)"})
            // }
            else if (ratings < i && ratings > (i - 1)) {
                percentage = ((parseFloat(ratings) - i + 1) * 100)
                console.log(ratings)
                console.log(percentage)
                percentage = percentage.toFixed()
                console.log(percentage)
                percentage = percentage.toString() + "%"
                console.log(percentage)
                // percentage = "30%"
                stardata = Object.assign(stardata, { [i]: "url(#partial)" })
            }
            else {
                stardata = Object.assign(stardata, { [i]: "url(#empty)" })
            }
            console.log(stardata)
            console.log(percentage)
            // stardata[1] = "url(#full)"
            // stardata[2] = "url(#partial)"
        }
        return (stardata)
    }

    // useEffect(()=>{
    //     if(userGivenStars !== 0)
    //     {
    //         var i = 0;
    //         while(i < userGivenStars)
    //         {
    //             writeReviewStars[i+1] = "url(#full)";
    //             i++
    //         }
    //         writeReviewStars
    //     }
    // },[userGivenStars])
    // const clickableStars = (starNumber) => {
    //     var i = 0;
    //     var j = 5;
    //     while (i < starNumber) {
    //         writeReviewStars[i + 1] = "url(#full)";
    //         i++;
    //     }
    //     while (j > starNumber){
    //         writeReviewStars[j] = "url(#empty)"
    //         j--;
    //     }
    //     // writeReviewStars
    //     setUserGivenStars(starNumber);
    // }
    const displayReviews = (data, index) => {
        return (
            <>
                <p className='flex'>
                    <span className='font-semibold text-xl'>{data.user}</span>
                    <span className='ml-auto'>{data.created}</span>
                </p>
                <p className='flex'>
                    {/* {data.ratings} */}
                    {/* {calculation(data)} */}
                    <div className="stars flex" >
                        {function () {
                            allstars = Object.assign(calculation(data, allstars))
                        }()}
                        <svg width="0" height="0" viewBox="0 0 20 20">
                            <defs>
                                <linearGradient id="full" x1="0" x2="100%" y1="0" y2="0">
                                    <stop offset="0" stop-color="#F3C117"></stop>
                                    <stop offset="100%" stop-color="#F3C117"></stop>
                                    <stop offset="36%" stop-color="#E8E8E8"></stop>
                                    <stop offset="1" stop-color="#E8E8E8"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg width="0" height="0" viewBox="0 0 20 20">
                            <defs>
                                <linearGradient id="partial" x1="0" x2="100%" y1="0" y2="0">
                                    <stop offset="0" stop-color="#F3C117"></stop>
                                    {console.log(percentage)}
                                    <stop offset={percentage} stop-color="#F3C117"></stop>
                                    <stop offset={percentage} stop-color="#E8E8E8"></stop>
                                    <stop offset="1" stop-color="#E8E8E8"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg width="0" height="0" viewBox="0 0 20 20">
                            <defs>
                                <linearGradient id="empty" x1="0" x2="100%" y1="0" y2="0">
                                    <stop offset="0" stop-color="#F3C117"></stop>
                                    <stop offset="0" stop-color="#F3C117"></stop>
                                    <stop offset="0" stop-color="#E8E8E8"></stop>
                                    <stop offset="0" stop-color="#E8E8E8"></stop>
                                </linearGradient>
                            </defs>
                        </svg>

                        <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[1]} />
                        </svg>
                        {/* </path> */}
                        <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[2]} />
                        </svg>
                        <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[3]} />
                        </svg>
                        <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[4]} />
                        </svg>
                        <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[5]} />
                        </svg>


                        <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[1]} />
                        </svg>
                        {/* </path> */}
                        <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[2]} />
                        </svg>
                        <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[3]} />
                        </svg>
                        <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[4]} />
                        </svg>
                        <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                            <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[5]} />
                        </svg>

                    </div>
                </p>
                <p>
                    {data.description}
                </p>
            </>
        )
    }
    return (<>
        {/* {console.log("tf")} */}
        {/* {console.log(loading)} */}
        {console.log(loadingdone2)}
        {console.log(loadingdone3)}
        {loadingdone2 && loadingdone3 && <div className='w-[80%] mt-4 h-[90vh] overflow-hidden sm:max-w-full p-box-shadow-2 rounded-[20px] mb-4'>
            {console.log("this should not work", infoObject)}
            {console.log("hasmore", hasMore)}
            {!isbooking && <div className=" w-full tripPage ">
                {/* <h2><button onClick={() => setLink(`explore`)}>All</button><button onClick={() => setLink(`explore/image`)}>Images</button><button onClick={() => setLink(`explore/audio`)}>Audio</button><button onClick={() => setLink(`explore/video`)}>Video</button></h2> */}



                <div className='grid grid-cols-1 overflow-y-auto sm:rounded-none rounded-b-[20px] h-[90vh] sm:h-[85vh]'>
                    {
                        mediaObject && mediaObject.map((data) => (
                            <div >
                                {data.image && <img className='w-full h-[500px] object-cover' src={data.image} />}
                                {data.video && <video className='w-full h-[500px] object-cover' controls src={data.video} alt='' width='100%' />}
                            </div>
                        )
                        )
                    }
                </div>
                <div className=' flex flex-col overflow-auto h-[90vh]'>
                    {function () {
                        reviewStars = Object.assign(calculation(infoObject, reviewStars))
                    }()}
                    <svg width="0" height="0" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="full" x1="0" x2="100%" y1="0" y2="0">
                                <stop offset="0" stop-color="#F3C117"></stop>
                                <stop offset="100%" stop-color="#F3C117"></stop>
                                <stop offset="36%" stop-color="#E8E8E8"></stop>
                                <stop offset="1" stop-color="#E8E8E8"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    <svg width="0" height="0" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="partial" x1="0" x2="100%" y1="0" y2="0">
                                <stop offset="0" stop-color="#F3C117"></stop>
                                {console.log(percentage)}
                                <stop offset={percentage} stop-color="#F3C117"></stop>
                                <stop offset={percentage} stop-color="#E8E8E8"></stop>
                                <stop offset="1" stop-color="#E8E8E8"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    <svg width="0" height="0" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="empty" x1="0" x2="100%" y1="0" y2="0">
                                <stop offset="0" stop-color="#F3C117"></stop>
                                <stop offset="0" stop-color="#F3C117"></stop>
                                <stop offset="0" stop-color="#E8E8E8"></stop>
                                <stop offset="0" stop-color="#E8E8E8"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* {infoObject &&
            <div>
                {infoObject.name} <br />
                {infoObject.type}<br />
                {infoObject.description}<br />
                {infoObject.price}<br />
                {infoObject.ratings}<br />
                {infoObject.ratingsCount}<br />
                
            </div>} */}
                    {infoObject && <div className='my-8 px-2 sm:my-[1.1rem] '>

                        {/* {console.log(locimg)} */}
                        {/* {console.log(locimg.slice(21,27))}
                                  {console.log(locimg.slice(21,27) === "images")} */}
                        {/* {console.log( <image src={locimg}  alt="" className ="object-cover h-full  w-full"/>)} */}
                        {/* {locimg && <img src={locimg}  alt="" className ="object-cover h-[500px]  w-[750px]"/>}
                                  {locvideo && <video controls src={locvideo}  alt="" className ="object-cover h-[500px]  w-[750px]"/>} */}
                        {/* {locimg && <video controls src={locimg}  alt="" className ="object-cover h-full  w-full"/>} */}
                            <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/tripedit/'+ infoObject.name+ '/' +infoObject.id  )}}>Edit current trip</button> 
                        <p className='text-3xl flex'>
                            <span className=''>{infoObject.name}</span>
                                {console.log(infoObject)}

                            <span className='flex text-lg items-center text-center ml-auto '>({infoObject.type})</span>
                        </p>
                        <p className='flex text-2xl items-center text-center pr-1'><span className="pr-2">{infoObject.ratings}</span>
                            <div className="stars flex" >


                                <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[1]} />
                                </svg>
                                {/* </path> */}
                                <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[2]} />
                                </svg>
                                <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[3]} />
                                </svg>
                                <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[4]} />
                                </svg>
                                <svg width="20" height="20" className="md:hidden" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[5]} />
                                </svg>


                                <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[1]} />
                                </svg>
                                {/* </path> */}
                                <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[2]} />
                                </svg>
                                <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[3]} />
                                </svg>
                                <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[4]} />
                                </svg>
                                <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={reviewStars[5]} />
                                </svg>

                            </div>
                            <span className='ml-2'> ({infoObject.ratingsCount})</span>
                        </p>
                        <p className='flex text-2xl items-center text-center '><span>${infoObject.price}</span></p>
                        {/* <p className='flex text-2xl items-center text-center '><span>Rating count : {infoObject.ratingsCount}</span></p> */}
                        <p className='flex py-4 text-xl '><span>{infoObject.description}</span></p>
                        <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { booking() }}> BOOK NOW </button>

                    </div>}

                    <div className='px-2 divide-y divide-gray-500'>

                        <span className='flex text-3xl mb-6'>Reviews</span>

                        {

                            reviewCreationBool &&
                            <div className="flex flex-col pt-5 pb-2">
                                <h3>Enter Review Here:</h3>
                                <div className="flex cursor-pointer">

                                    {/* <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(1) }}>1</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(2) }}>2</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(3) }}>3</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(4) }}>4</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(5) }}>5</button> */}
                                    {console.log("this",userGivenStars)}
                                    {function () {
                                    writeReviewStars = Object.assign(calculation(userGivenStars, writeReviewStars))
                                    }()}
                                    <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(1) }} viewBox="0 0 20 20">
                                        <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[1]} />
                                    </svg>
                                    <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(2) }} viewBox="0 0 20 20">
                                        <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[2]} />
                                    </svg>
                                    <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(3) }} viewBox="0 0 20 20">
                                        <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[3]} />
                                    </svg>
                                    <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(4) }} viewBox="0 0 20 20">
                                        <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[4]} />
                                    </svg>
                                    <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(5) }} viewBox="0 0 20 20">
                                        <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[5]} />
                                    </svg>
                                </div>
                                <div className="flex w-full">
                                    <input className="w-1/2" required placeholder='Reviews..' value={userGivenDescription} onChange={(e) => setUserGivenDescription(e.target.value)} />
                                    {errorForEmptySubmission && <p> Enter the review and Choose a rating to submit </p>}
                                </div>
                                <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { submitReview() }}>Submit Review</button>

                            </div>
                        }

                        {
                            reviewObject && reviewObject.map((data, index) => {
                                if (reviewObject.length === index + 1) {
                                    return (
                                        <div ref={lastDataElementRef} className='px-2 my-2'>
                                            {displayReviews(data, index)}
                                        </div>

                                    )
                                }

                                else return (
                                    <div className='px-2 my-2 mb-6'>
                                        {displayReviews(data, index)}
                                    </div>
                                )
                            })
                        }

                    </div>


                    {
                        (isAuth === false) && isbooking &&
                        <div>
                            {alert('you arent logged in, to make a booking, log in.')}
                        </div>
                    }
                </div>
            </div>}
            {
                isAuth && isbooking && <div className="flex flex-col justify-center items-center">
                    <form className="flex flex-col" onSubmit={submitBooking}>
                        <label className="flex items-center justify-center">
                            Enter your query:
                            <input placeholder='enter your query, if any' onChange={(e) => { setBookingQuery(e.target.value) }} />
                        </label>
                        <label className="flex items-center">
                            Your Phone number:
                            <input required type="number" placeholder='enter your phone number' requiredd onChange={(e) => { setPhoneNumber(e.target.value) }} /><br />
                        </label>
                        <label className="flex items-center">
                            Your Trip:
                            <input required readOnly value={name} />
                        </label>
                        <div className="flex">
                            <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setBackToDisplay(true); console.log("wtaf") }} >Back</button>
                            <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' type="submit">Submit</button>
                        </div>
                    </form>

                </div>}
        </div>}

    </>
    );
}

export default Trip;
