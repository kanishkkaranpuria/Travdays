import React, { useLayoutEffect } from "react";
import fullaxios from "../components/FullAxios";
import { useParams } from "react-router";
import { useHistory } from 'react-router'
import { useState, useRef, useCallback } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import UndefinedError from "../components/FetchErrorHandling/UndefinedError";

const Trip = ({ isAuth, isadmin }) => {

    const { name } = useParams()

    let history = useHistory()

    const [page, setPage] = useState(1) // page 1 pe req initial run fir ++ hota jaayega
    const [page1, setPage1] = useState(0) // page 1 pe req initial run fir ++ hota jaayega
    const [loading, setLoading] = useState(false) // initially false
    const [loadingdone2, setLoadingdone2] = useState(false) // initially false 
    const [loadingdone3, setLoadingdone3] = useState(false) // initially false 
    const [hasMore, setHasMore] = useState(true)

    const [hasMoreMedia, setHasMoreMedia] = useState(true) // A state to make the code realise that all the images have been recieved.
    const [pageMedia, setPageMedia] = useState(3) //page number of the media requested
    const [tempNumber, setTempNumber] = useState(1) //page number of the media requested
    const [videoLoading, setVideoLoading] = useState(false)

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

    // const [temp, setTemp] = useState([])

    const observer = useRef('') // has only one attribute - current!

    const [userGivenStars, setUserGivenStars] = useState(0)
    const [userGivenDescription, setUserGivenDescription] = useState('')
    const [realLoading, setRealLoading] = useState(true)
    const [error, setError] = useState(false)
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [displayImage, setDisplayImage] = useState(0)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    },[]);

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


        fullaxios({ url: 'trip/media/' + name })
            .then(res => {
                if (res) {
                    console.log(res.data)
                    setMediaObject(res.data)
                    console.log(res.data)
                    setLoadingdone3(true)
                    fullaxios({ url: 'trip/media/' + name + '?page=2' })
                        .then(res => {
                            if (res) {
                                console.log(res.data)
                                setMediaObject(prev => [...prev, ...res.data])
                                console.log(res.data)
                                setLoadingdone3(true)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })


    }, [backToDisplay || reviewSubmitted])

    const MediaPagination = () => {
        if (hasMoreMedia) {
            fullaxios({ url: 'trip/media/' + name + '?page=' + pageMedia })
                .then(res => {
                    if (res) {
                        console.log(res.data)
                        setMediaObject(prev => [...prev, ...res.data])
                        console.log(res.data)
                        setPageMedia(prev => prev + 1)
                        setLoadingdone3(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err && (err.response.data.detail === "Invalid page.")) {
                        // setLoading(true)
                        // setHasMore(false)
                        setHasMoreMedia(false)
                    }
                })
        }
    }


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
        let confirmBox = window.confirm("confirm booking?")
        //confirmBox)
        if (confirmBox === true) {
            fullaxios({
                url: 'booking/', type: 'post', data: {

                    phone: phoneNumber,
                    query: bookingQuery,
                    trip: name,

                }
            })
                .then(res => {
                    history.push('/bookings')
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
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

    const [rating, setRating] = useState(null);

    useEffect(() => {
        fullaxios({ url: 'trip/ratings/' + name })
            .then(res => {
                if (res) {
                    // setFeatured(prev=>[...prev,...res.data])
                    console.log(res.data)
                    setRating(res.data)
                }

            })
            .catch(err => {
            }
            )
    }, [refetch, page1]);


    useEffect(() => {
        setLoading(true)
        setPaginationLoading(true)
        fullaxios({ url: 'trip/review/' + name + '?page=' + page })
            .then(res => {
                if (res) {
                    // setFeatured(prev=>[...prev,...res.data])
                    console.log('review info: ', res.data)
                    setReviewObject(prev => [...prev, ...res.data])
                    setLoading(false)
                    setRealLoading(false)
                    setPaginationLoading(false)
                }

            })
            .catch(err => {
                if (err && (err.response.data.detail === "Invalid page.")) {
                    // setLoading(true)
                    setHasMore(false)
                }
                setRealLoading(false)
                setPaginationLoading(false)
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
                    setPage1(prev => prev + 1)
                    setHasMore(true)
                    setErrorForEmptySubmission(false)
                    setUserGivenDescription("")
                    setUserGivenStars(0)
                    if (page === 1) { if (refetch === true) { setRefetch(false) } else { setRefetch(true) } }
                    else { setPage(1) }
                    alert('Review submitted')
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
            // console.log(data.ratings)
            // console.log(i)
            var ratings;
            if (data.ratings) ratings = parseFloat(data.ratings)
            else {
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
            // console.log(stardata)
            // console.log(percentage)
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
                <p className='flex my-1'>
                    <span className='font-semibold text-xl'>{data.user}</span>
                    <span className='ml-auto'>{data.created}</span>
                </p>
                <p className='flex -ml-[5px]'>
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
                <p className="my-5  whitespace-pre-line leading-snug">
                    {data.description}
                </p>
            </>
        )
    }

    useEffect(() => {

    }, [displayImage])
    // useEffect(() => {
    //     let x = document.getElementById(`element0`)
    //     x.classList.remove('translate-y-full');
    //     x.classList.add('translate-y-2');
    // }, [])
    const changeMainMedia = (element, mediaObject) => {
        if (mediaObject[element].video === true) {
            setVideoLoading(true)
            fullaxios({ url: 'trip/singlevideo/' + mediaObject[element].id })
                .then(res => {
                    if (res) {
                        console.log("hereaa", res.data[0].video)
                        console.log("hereaa", res.data.video)
                        let tempMedia = mediaObject
                        tempMedia[element].video = res.data[0].video
                        setMediaObject(tempMedia)
                        console.log("hereaa", tempMedia)
                        setVideoLoading(false)
                        // setDisplayImage(element)
                    }

                })
                .catch(err => {
                    console.log(err.response)
                })

        }

        setDisplayImage(element)
        let highlited = document.getElementsByClassName("highlight")
        highlited[0].classList.remove('highlight')
        let willBeHighlited = document.getElementById(`element${element}`)
        willBeHighlited.classList.add('highlight')
    }
    const displayMedia = (mediaObject) => {
        let loop_length = Math.ceil(mediaObject.length / 5)
        let loop = []
        for (var i = 0; i < loop_length; i++) {
            loop.push(i)
        }
        return (
            <>
                {loop.map((tempNumber, element) => (
                    <>
                        {element === 0 && <div className="absolute h-full transition-all ease-in-out duration-[1000ms] transform translate-y-2 media">
                            {
                                mediaObject && mediaObject.map((data, element) => {
                                    // console.log("here affff", tempNumber, element)
                                    if ((5 * (tempNumber) <= element) && (element < (5 * (tempNumber + 1)))) {
                                        // console.log("here affff", tempNumber, element)
                                        return (
                                            <div className="singleMedia" >
                                                {data.image && element === 0 && <img id={`element${element}`} className='w-full highlight max-w-[60px] h-[90px] mb-2 object-cover cursor-pointer rounded-md' onClick={() => changeMainMedia(element, mediaObject)} src={data.image} />}
                                                {data.image && element !== 0 && <img id={`element${element}`} className='w-full max-w-[60px] h-[90px] mb-2 object-cover cursor-pointer rounded-md' onClick={() => changeMainMedia(element, mediaObject)} src={data.image} />}
                                            </div>
                                        )
                                    }

                                }
                                )
                            }
                        </div>}
                        {element !== 0 && <div className="absolute h-full transition-all ease-in-out duration-[1000ms] transform translate-y-full media">
                            {
                                mediaObject && mediaObject.map((data, element) => {
                                    // console.log("here affff", tempNumber, element)
                                    if ((5 * (tempNumber) <= element) && (element < (5 * (tempNumber + 1)))) {
                                        // console.log("here affff", tempNumber, element)
                                        return (
                                            <div className="singleMedia" >
                                                {data.image && <img id={`element${element}`} className='w-full max-w-[60px] h-[90px] mb-2 object-cover cursor-pointer rounded-md' onClick={() => changeMainMedia(element, mediaObject)} src={data.image} />}
                                            </div>
                                        )
                                    }

                                }
                                )
                            }
                        </div>}
                    </>
                ))

                }

            </>
        )
    }

    const scrollDownMedia = () => {
        let activeSlide = document.querySelector('.media.translate-y-2');
        if (activeSlide.nextElementSibling) {
            activeSlide.classList.remove('translate-y-2');
            activeSlide.classList.add('-translate-y-full');

            let nextSlide = activeSlide.nextElementSibling;
            nextSlide.classList.remove('translate-y-full');
            nextSlide.classList.add('translate-y-2');
        }
    }

    const scrollUpMedia = () => {
        let activeSlide = document.querySelector('.media.translate-y-2');
        if (activeSlide.previousElementSibling) {
            activeSlide.classList.remove('translate-y-2');
            activeSlide.classList.add('translate-y-full');

            let previousSlide = activeSlide.previousElementSibling;
            previousSlide.classList.remove('-translate-y-full');
            previousSlide.classList.add('translate-y-2');
        }
    }
    return (
        <>
            {realLoading && <Loading />}
            {!realLoading && error && <UndefinedError />}
            {!realLoading && !error &&
                <div className="bg-white w-full h-full z-10">
                    {/* {console.log("tf")} */}
                    {/* {console.log(loading)} */}
                    {console.log(loadingdone2)}
                    {console.log(loadingdone3)}
                    {loadingdone2 && loadingdone3 && <div className='mx-auto '>
                        {console.log("this should not work", infoObject)}
                        {console.log("hasmore", hasMore)}
                        {!isbooking && <div className=" w-full pt-10 lg:grid  lg:grid-cols-5">
                            {/* <h2><button onClick={() => setLink(`explore`)}>All</button><button onClick={() => setLink(`explore/image`)}>Images</button><button onClick={() => setLink(`explore/audio`)}>Audio</button><button onClick={() => setLink(`explore/video`)}>Video</button></h2> */}
                            <div className="w-1/3 h-[600px] mx-auto flex flex-col justify-center items-center md:hidden">
                                <svg id="body_1" width="51" height="38" onClick={scrollUpMedia} className="cursor-pointer">

                                    <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                        <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                            <g>
                                                <path d="M980.2 681.7L522.6 224.1C 516.1 217.6 508.49997 214.3 499.99997 214.3C 491.49997 214.3 483.99997 217.6 477.39996 224.1L477.39996 224.1L19.8 681.7C 13.199999 688.3 9.999999 695.8 9.999999 704.3C 9.999999 712.8 13.299999 720.3 19.8 726.89996L19.8 726.89996L68.899994 775.99994C 75.399994 782.49994 82.99999 785.7999 91.49999 785.7999C 99.99999 785.7999 107.49999 782.49994 114.09999 775.99994L114.09999 775.99994L500 390L885.9 776C 892.4 782.5 900 785.8 908.5 785.8C 917 785.8 924.6 782.5 931.1 776L931.1 776L980.19995 726.9C 986.69995 720.4 989.99994 712.80005 989.99994 704.30005C 990 695.8 986.8 688.2 980.2 681.7z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                {console.log(mediaObject.length)}
                                <div className="h-[500px] w-full items-center overflow-hidden flex flex-col relative">
                                    {displayMedia(mediaObject)}
                                </div>
                                <svg id="body_1" width="51" height="38" onClick={() => { MediaPagination(); scrollDownMedia() }} className="rotate-180 cursor-pointer">

                                    <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                        <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                            <g>
                                                <path d="M980.2 681.7L522.6 224.1C 516.1 217.6 508.49997 214.3 499.99997 214.3C 491.49997 214.3 483.99997 217.6 477.39996 224.1L477.39996 224.1L19.8 681.7C 13.199999 688.3 9.999999 695.8 9.999999 704.3C 9.999999 712.8 13.299999 720.3 19.8 726.89996L19.8 726.89996L68.899994 775.99994C 75.399994 782.49994 82.99999 785.7999 91.49999 785.7999C 99.99999 785.7999 107.49999 782.49994 114.09999 775.99994L114.09999 775.99994L500 390L885.9 776C 892.4 782.5 900 785.8 908.5 785.8C 917 785.8 924.6 782.5 931.1 776L931.1 776L980.19995 726.9C 986.69995 720.4 989.99994 712.80005 989.99994 704.30005C 990 695.8 986.8 688.2 980.2 681.7z" stroke="none" fill="#000000" fill-rule="nonzero" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            {/* <button onClick={MediaPagination}>backup</button> */}
                            <div className=' lg:col-start-2 lg:col-span-2 xl:w-5/6 lg:w-[95%] md:hidden'>
                                {
                                    mediaObject && mediaObject.map((data, element) => (
                                        <>
                                            {(element === displayImage) &&
                                                <div className="flex flow-col justify-center items-center h-full" >
                                                    {console.log(typeof data.video)}
                                                    {console.log("ugh", data.video)}
                                                    {data.image && !videoLoading && (data.video === false) && <img className='w-full md:h-[300px] h-[600px] object-cover rounded-lg fade-anim' src={data.image} />}
                                                    {data.video && !videoLoading && (typeof data.video !== "boolean") && <video controlsList="nodownload" className='w-full md:h-[300px] h-[600px] object-cover rounded-lg' controls src={data.video} alt='' width='100%' />}
                                                    {videoLoading &&
                                                        <div className="p-auto m-auto h-full">
                                                            <div className="m-auto h-full flex justify-center" data-visualcompletion="loading-state" style={{ width: '32px' }}>
                                                                <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>}
                                        </>
                                    )
                                    )
                                }

                            </div>
                            <div className='w-full overflow-y-hidden overflow-x-scroll mx-auto flex lg:hidden snap-x snap-mandatory' style={{scrollSnapType: 'x mandatory'}}>
                                {
                                    mediaObject && mediaObject.map((data, element) => (
                                        <>
                                                    {console.log(typeof data.video)}
                                                    {console.log("ugh", data.video)}
                                                    {data.image && !videoLoading && (data.video === false) && <img className='w-full md:h-[300px] min-w-full h-[600px] object-cover rounded-3xl fade-anim px-10 pb-4' style={{scrollSnapAlign: 'center', scrollSnapStop: 'always'}} src={data.image} />}
                                                    {data.video && !videoLoading && (typeof data.video !== "boolean") && <video controlsList="nodownload" className='min-w-full md:h-[300px] h-[600px] object-cover rounded-lg'  style={{scrollSnapAlign: 'center', scrollSnapStop: 'always'}} controls src={data.video} alt='' width='100%' />}
                                                    {videoLoading &&
                                                        <div className="p-auto m-auto h-full">
                                                            <div className="m-auto h-full flex justify-center" data-visualcompletion="loading-state" style={{ width: '32px' }}>
                                                                <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    }
                                        </>
                                    )
                                    )
                                }

                            </div>
                            <div className=' flex flex-col col-span-2 w-[90%] md:w-full'>
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
                                {infoObject && <div className='px-2 sm:my-[1.1rem] '>

                                    {/* {console.log(locimg)} */}
                                    {/* {console.log(locimg.slice(21,27))}
                                  {console.log(locimg.slice(21,27) === "images")} */}
                                    {/* {console.log( <image src={locimg}  alt="" className ="object-cover h-full  w-full"/>)} */}
                                    {/* {locimg && <img src={locimg}  alt="" className ="object-cover h-[500px]  w-[750px]"/>}
                                  {locvideo && <video controlsList="nodownload" controls src={locvideo}  alt="" className ="object-cover h-[500px]  w-[750px]"/>} */}
                                    {/* {locimg && <video controlsList="nodownload" controls src={locimg}  alt="" className ="object-cover h-full  w-full"/>} */}
                                    {isadmin && <button className='m-2 p-2 w-28 sm:w-32 sm:m-1 font-semibold absolute top-14 right-10 bg-[#00000088]  rounded-md' onClick={() => { history.push('/tripedit/' + infoObject.name + '/' + infoObject.id) }}>Edit Trip</button>}

                                    <p className='text-3xl md:text-2xl mb-3 flex font-semibold'>
                                        <span className=''>{infoObject.name}</span>
                                        {/* {console.log(infoObject)} */}

                                        {/* <span className='flex text-lg items-center text-center ml-auto '>({infoObject.type})</span> */}
                                    </p>
                                    {rating && <p className='flex text-2xl  md:text-xl items-center text-center pr-1'><span className="pr-2">{rating.ratings}</span>
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
                                        <span className='ml-2 text-md'>| {rating.ratingsCount} Reviews</span>
                                    </p>}
                                    <hr className="border mt-1" />
                                    {/* <p className='flex text-2xl items-center text-center '><span>₹{infoObject.price}</span></p> */}
                                    <p className='flex text-2xl  md:text-xl md:pt-6 items-center text-center pt-10'><span>₹52,300</span></p>
                                    {/* <p className='flex text-2xl items-center text-center '><span>Rating count : {infoObject.ratingsCount}</span></p> */}
                                    {/* <p className='flex py-4 text-xl whitespace-pre-line'><span>{infoObject.description}</span></p> */}
                                    <div>
                                        {infoObject.description.length > 250 ?
                                            (
                                                <p className='py-4 text-lg font-normal whitespace-pre-line leading-snug	'>
                                                    {`${infoObject.description.substring(0, 250)}...`}
                                                </p>
                                            ) :
                                            <p>{infoObject.description}</p>
                                        }
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <button className=' sm:mx-auto p-2 w-full bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  ' onClick={() => { booking() }}> BOOK NOW </button>
                                    </div>

                                </div>}




                                {
                                    (isAuth === false) && isbooking &&
                                    <div>
                                        {alert('you arent logged in, to make a booking, log in.')}
                                    </div>
                                }
                            </div>
                        </div>}

                        {/* <hr className="bg-black opacity-100 mt-5 mx-auto w-5/6" /> */}

                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center w-5/6 md:w-full mt-10">
                                <div className="flex w-full items-center">
                                    <hr className="bg-black opacity-100  mx-auto w-2/5" />
                                    <p className="text-2xl font-medium mx-4 whitespace-nowrap">Detailed Description</p>
                                    <hr className="bg-black opacity-100 mx-auto w-2/5" />
                                </div>
                                {/* <div style={{ color:"black", borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div> */}
                                {/* <p></p> */}
                               {infoObject && <p className='py-4 mx-4 text-lg font-normal whitespace-pre-line leading-snug'><span>{infoObject.description}</span></p>}
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center w-5/6 md:w-full">
                                <div className="flex w-full items-center my-4">
                                    <hr className="bg-black opacity-100  mx-auto w-2/5" />
                                    <p className="text-2xl font-medium mx-4 ">Reviews</p>
                                    <hr className="bg-black opacity-100 mx-auto w-2/5" />
                                </div>
                                <div className='lg:px-20 pb-12 w-full'>

                                    {/* <span className='flex text-3xl mb-6'>Reviews</span> */}

                                    {

                                        reviewCreationBool &&
                                        <div className="flex flex-col p-6 mb-8 border-1 shadow-xl border-black">
                                            <p className="text-lg mb-3 font-medium">Write a Review</p>
                                            <div className="flex cursor-pointer">

                                                {/* <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(1) }}>1</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(2) }}>2</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(3) }}>3</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(4) }}>4</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(5) }}>5</button> */}
                                                {console.log("this", userGivenStars)}
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
                                                <textarea className="w-full" required placeholder='Reviews..' value={userGivenDescription} onChange={(e) => setUserGivenDescription(e.target.value)} maxLength={1000} />
                                                {errorForEmptySubmission && <p> Enter the review and Choose a rating to submit </p>}
                                            </div>
                                            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  ' onClick={() => { submitReview() }}>Submit Review</button>

                                        </div>
                                    }

                                    {
                                        reviewObject && reviewObject.map((data, index) => {
                                            if (reviewObject.length === index + 1) {
                                                return (
                                                    <div ref={lastDataElementRef} className='px-2 my-2'>
                                                        {displayReviews(data, index)}
                                                        <hr />
                                                    </div>

                                                )
                                            }

                                            else return (
                                                <div className='px-2 my-2 mb-6'>
                                                    {displayReviews(data, index)}
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }

                                    {paginationLoading &&
                                        <div className="p-4 m-auto">
                                            <div className="m-auto" data-visualcompletion="loading-state" style={{ height: '32px', width: '32px' }}>
                                                <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                    {!paginationLoading && !hasMore &&
                                        <div className="m-auto">
                                            <p className="text-center">Woah! You have reached the end</p>
                                        </div>}
                                </div>
                            </div>
                        </div>

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
                                    <div className="flex items-center">
                                        <button className='p-2 mx-4 w-20 bg-blue-500 font-semibold rounded-lg sm:mx-auto hover:bg-blue-700 text-white font-bold ' onClick={() => { setBackToDisplay(true); console.log("wtaf") }} >Back</button>
                                        <button className='p-2 w-20 bg-blue-500 font-semibold rounded-lg sm:mx-auto hover:bg-blue-700 text-white font-bold ' type="submit">Submit</button>
                                    </div>
                                </form>

                            </div>}
                    </div>}

                </div>}</>
    );
}

export default Trip;
