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

    const [backToDisplay, setBackToDisplay] = useState(false) // to come back from book now feature

    const [infoObject, setInfoObject] = useState([])
    const [mediaObject, setMediaObject] = useState([])
    const [reviewObject, setReviewObject] = useState([])
    const [reviewCreationBool, setReviewCreationBool] = useState(false)

    const [isbooking, setIsbooking] = useState(false)
    const [isAuth, setIsAuth] = useState(null)

    const [bookingQuery, setBookingQuery] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [errorForEmptySubmission, setErrorForEmptySubmission] = useState(false)

    const observer = useRef('') // has only one attribute - current!

    const [userGivenStars, setUserGivenStars] = useState(5)
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

        fullaxios({ url: 'userinfo/status' })
            .then(res => {
                if (res) {
                    // console.log(res.data)
                    setIsAuth(res.data.authenticated)
                    console.log(isAuth)
                }
            })
            .catch(err => {
                console.log(err)
            })

        fullaxios({ url: 'trip/media/' + name, sendcookie: false })
            .then(res => {
                if (res) {
                    console.log(res.data)
                    setMediaObject(res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })


        fullaxios({ url: 'trip/review/create/' + name, sendcookie: false })
            .then(res => {
                if (res) {
                    // console.log('review worth :\n' + res.data)
                    setReviewCreationBool(res.data.bool)
                }
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
        setLoading(true)
        fullaxios({ url: 'trip/review/' + name + '?page=' + page, sendcookie: false })
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
                    setHasMore(false)
                }
            })


    }, [page, backToDisplay])


    const booking = () => {

        setMediaObject(null);
        setInfoObject(null);
        setReviewObject(null);
        setReviewCreationBool(false);
        setIsbooking(true);



    }


    const submitReview = () => {
        if (userGivenDescription && userGivenStars){
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
                setReviewObject([])
                setHasMore(true)
                setErrorForEmptySubmission(false)
                setUserGivenDescription("")
                setPage(1)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            setErrorForEmptySubmission(true)
        }
    }

    useEffect(() => {
        console.log(isbooking)
        console.log(backToDisplay, "backtodisplay")

    }, [isbooking, backToDisplay])

    return (
        <div className='w-[80%] mt-4 h-[90vh] overflow-hidden sm:max-w-full p-box-shadow-2 rounded-[20px] mb-4'>

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
                        <p className='text-3xl flex'>
                            <span className=''>{infoObject.name}</span>
                            <span className='flex text-lg items-center text-center ml-auto '>({infoObject.type})</span>
                        </p>
                        <p className='flex text-2xl items-center text-center '><span>{infoObject.ratings}</span>
                            <span className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </span>
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
                            reviewObject && reviewObject.map((data, index) => {
                                if (reviewObject.length === index + 1) {
                                    return (
                                        <div ref={lastDataElementRef} className='px-2 my-2'>
                                            <p className='flex'>
                                                <span className='font-semibold text-xl'>{data.user}</span>
                                                <span className='ml-auto'>{data.created}</span>
                                            </p>
                                            <p className='flex'>
                                                {/* {data.ratings} */}
                                                <span className='flex'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </span>
                                            </p>
                                            <p>
                                                {data.description}
                                            </p>
                                        </div>

                                    )
                                }

                                else return (
                                    <div className='px-2 my-2 mb-6'>
                                        <p className='flex'>
                                            <span className='font-semibold text-xl'>{data.user}</span>
                                            <span className='ml-auto'>{data.created}</span>
                                        </p>
                                        <p className='flex'>
                                            {/* {data.ratings} */}
                                            <span className='flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="black">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </span>
                                        </p>
                                        <p>
                                            {data.description}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                        {console.log("asdfdsf",reviewCreationBool)}
                    {

                        reviewCreationBool &&
                        <div className="flex flex-col pt-5 pb-2">
                            <h3>Enter Review Here:</h3>
                            {/* <div className="flex">
                <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto'onClick={() => { setUserGivenStars(1) }}>1</button>
                <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto'onClick={() => { setUserGivenStars(2) }}>2</button>
                <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto'onClick={() => { setUserGivenStars(3) }}>3</button>
                <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto'onClick={() => { setUserGivenStars(4) }}>4</button>
                <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto'onClick={() => { setUserGivenStars(5) }}>5</button>
                </div> */}
                            <div className = "flex w-full">
                            <input className = "w-1/2" require placeholder='Reviews..' value = {userGivenDescription} onChange={(e) => setUserGivenDescription(e.target.value)} />
                            {errorForEmptySubmission && <p> Enter the review and Choose a rating to submit </p>}
                            </div>
                            <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { submitReview() }}>Submit Review</button>
                            
                        </div>
                    }



                   
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
                            <form className="flex flex-col" onSubmit={console.log('submit')}>
                                <label className="flex items-center justify-center">
                                    Enter your query:
                                    <input placeholder='enter your query' onChange={(e) => { setBookingQuery(e.target.value) }} />
                                </label>
                                <label className="flex items-center">
                                    Your Phone number:
                                    <input placeholder='enter your phone number' required onChange={(e) => { setPhoneNumber(e.target.value) }} /><br />
                                </label>
                                <label className="flex items-center">
                                    Your Trip:
                                    <input readOnly value={name} />
                                </label>
                                <div className="flex">
                                    <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setBackToDisplay(true); console.log("wtaf") }} >Back</button>
                                    <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' type="submit">Submit</button>
                                </div>
                            </form>

                        </div>}
        </div>
        // </div>
        // <div className="review">

        // {infoObject &&
        //     <div>
        //         {infoObject.name} <br />
        //         {infoObject.type}<br />
        //         {infoObject.description}<br />
        //         {infoObject.price}<br />
        //         {infoObject.ratings}<br />
        //         {infoObject.ratingsCount}<br />

        //     </div>}

        // {
        //     mediaObject && mediaObject.map((data) => {
        //         return (
        //             <div >
        //                 {data.image && <img src={data.image} />}
        //                 {data.video && <video controls src={data.video} alt='' width='100%' />}
        //             </div>
        //         )

        //     }
        //     )
        // }

        // {
        //     reviewObject && reviewObject.map((data, index) => {
        //         if (reviewObject.length === index + 1) {
        //             return (<div ref={lastDataElementRef}>
        //                 {data.user}
        //                 <h2>description : {data.description}</h2>

        //                 <h2>rating:{data.ratings}</h2>


        //             </div>)
        //         }

        //         else return (
        //             <div>
        //                 {data.user} , {data.created}
        //                 <h2>description : {data.description}</h2>

        //                 <h2>rating:{data.ratings}</h2>
        //             </div>)
        //     })
        // }

        // {

        //     reviewCreationBool &&
        //     <div>
        //         <h3>enter review here:</h3>
        //         <button onClick={() => { setUserGivenStars(1) }}>1</button><br />
        //         <button onClick={() => { setUserGivenStars(2) }}>2</button><br />
        //         <button onClick={() => { setUserGivenStars(3) }}>3</button><br />
        //         <button onClick={() => { setUserGivenStars(4) }}>4</button><br />
        //         <button onClick={() => { setUserGivenStars(5) }}>5</button><br />


        //         <input require placeholder='reviews..' onChange={(e) => setUserGivenDescription(e.target.value)} />

        //         {userGivenDescription && userGivenStars && <div>
        //             <button onClick={() => { submitReview() }}>SUBMIT</button>
        //         </div>}
        //         <button onClick={() => { booking() }}> BOOK NOW </button>

        //     </div>
        // }
        // <br />



        // {
        //     isAuth && isbooking && <div className="">
        //         <button onClick={() => { setBackToDisplay(true); console.log("wtaf") }} >back to trip page</button>
        //     </div>}
        // {
        //     (isAuth === false)
        //     && <div>
        //         {alert('you arent logged in, to make a booking, log in.')}
        //     </div>
        // }
        // </div>

    );
}

export default Trip;