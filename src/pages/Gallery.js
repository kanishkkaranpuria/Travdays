  // import axios from "axios";
// import { useState,useEffect } from "react";
// import {React} from "react";

// const Gallery = () => {
//     const [allimages, setAllimages] = useState(null)
//     const [res, setRes] = useState(null)
//     let baseURL = 'http://192.168.0.111:8000/'
//     useEffect(() => {

//         axios({
//             method:'GET',
//             url: 'http://127.0.0.1:8000/gallery/?page=1 ',

//             // configuration
//         })
//         .then(res =>  {
//             setAllimages(res.data)
//             console.log(res.data)
//         }  

//         )


//         ;


//     }, [])



//     return (

//         <div  className="gallery">




//         {allimages && allimages.map((allimage)=>(
//         <div className="">

//           { allimages && <img src={allimage.image} alt="" />} 

//         </div>



//         ))}




//     </div>


//     );
// }

// export default Gallery;
















import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import fullaxios from '../components/FullAxios';

import { Link } from "react-router-dom";
import { useHistory } from 'react-router';

const Gallery = () => {

  var percentage = "";
  var allstars = {};
  const history = useHistory()
  const [storage, setStorage] = useState([]);
  const [datas, setDatas] = useState([]);
  const [digit, setDigit] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const prevDatas = useRef([])
  const observer = useRef()
  const [gridStyle, setGridStyle] = useState("w-full bg-[#00000000] p-box-shadow-2 overflow-hidden rounded-[20px] sm:gallery")
  const [gallerystyle, setGallerystyle] = useState('grid grid-cols-5 sm:grid-cols-3 overflow-y-auto sm:rounded-none rounded-b-[20px] h-[90vh] sm:h-[85vh]')
  const [displayPackageStyle, setDisplayPackageStyle] = useState('flex hidden sm:flex relative h-[90vh] sm:h-[50%] sm:rounded-t-[20px]')
  const [gridWithPackageStyle, setGridWithPackageStyle] = useState('overflow-hidden min-h-[200px] xl:min-h-[300px] md:min-h-[120px]')


  const showPackage = (show) => {
    if (show) {
      setGridStyle("gallery bg-[#00000000] p-box-shadow-2 overflow-hidden rounded-[20px]")
      setGallerystyle("grid grid-cols-3 overflow-y-auto sm:rounded-none rounded-b-[20px] h-[90vh] sm:h-[85vh]")
      setDisplayPackageStyle('flex relative h-[90vh] w-full sm:h-[50%] sm:rounded-t-[20px] bg-[#f5f5f7]')
      setGridWithPackageStyle('overflow-hidden min-h-[150px] xl:min-h-[250px] md:min-h-[120px]')
    }
    else {
      setGridStyle("w-full sm:gallery")
      setGallerystyle("grid grid-cols-5 sm:grid-cols-3 overflow-y-auto sm:rounded-none rounded-b-[20px] h-[90vh] sm:h-[85vh]")
      setDisplayPackageStyle('flex hidden relative h-[90vh] sm:h-[50%] sm:rounded-t-[20px]')
      setGridWithPackageStyle('overflow-hidden min-h-[170px] xl:min-h-[300px] md:min-h-[120px]')
    }
  }


  const lastDataElementRef = useCallback(node => {
    // console.log('last element')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)

      }
      // console.log(page)
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    fullaxios({ url: 'gallery/?page=' + page, type: "get", sendcookie: true })
      .then(res => {
        if (res) {
          setDatas(prev => [...prev, ...res.data])
          // setLocimg(datas[0].image)
          // setLocimg(res.data[0].image)
          // setLocvideo(res.data[0].video)

          setDigit(1)

          prevDatas.current = datas
        }
      })
      .catch(err => console.error(err));
    setLoading(false);
  }, [page])


  // useEffect(() => {
  //   if (datas[0] !== undefined) {
  //     setLocimg(datas[0].image)
  //     setLocvideo(datas[0].video)
  //   }
  // }, [datas])

  useEffect(() => {
    setStorage([...datas.map(data => data.id)])

    if (datas.length !== 0 && prevDatas.current.length === datas.length) {
      setHasMore(false)
    }
  }, [datas])

  const [locid, setLocid] = useState()
  

  useEffect(() => {
    // console.log('hasMore', hasMore)
  }, [hasMore])

  //Aummmm time 
  const [location, setLocation] = useState(null)
  const [locimg, setLocimg] = useState()
  const [locvideo, setLocvideo] = useState()
  // const [state, setstate] = useState()
  const Selected = (data) => {
    setLocid(data.id)
    setLocimg(data.image)
    setLocvideo(data.video)
    // console.log(data.video)
  }

  useEffect(() => {
    fullaxios({ url: 'gallery/package/' + locid })
      .then(res => {
        // console.log("resssssssssss", res.data)
        if (res) {
          // setLocation(prev => [...prev, ...res.data])
          setLocation(res.data)
          // prevDatas.current = datas
        }
      })
      .catch(err => console.error(err));
  }, [locid])

  useEffect(() => {
    console.log("location",location)

  }, [location])

  const AllImagesDisplay = (data) => {
    return (
      <>
        {data.image && <img src={data.image} onClick={() => { showPackage(true); Selected(data) }} alt="" className="object-cover h-full lg:p-1 xl:p-2  lg:rounded-2xl w-full cursor-pointer" />}
        {data.video && < video src={data.video} onClick={() => { showPackage(true); Selected(data) }} alt="" className="object-cover h-full lg:p-1 xl:p-2 lg:rounded-2xl w-full cursor-pointer" />}
      </>
    );
  }

  function calculation(data) {
    // var star = "url(#full)";
    for (let i = 1; i < 6; i++) {
      console.log(data.ratings)
      var ratings = parseFloat(data.ratings)
      if (ratings >= i) {
        allstars = Object.assign(allstars, { [i]: "url(#full)" })
      }
      // else if(ratings < i && ratings != i){
      //   allstars = Object.assign(allstars, {[i]:"url(#partial)"})
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
        allstars = Object.assign(allstars, { [i]: "url(#partial)" })
      }
      else {
        allstars = Object.assign(allstars, { [i]: "url(#empty)" })
      }
      console.log(allstars)
      console.log(percentage)
      // allstars[1] = "url(#full)"
      // allstars[2] = "url(#partial)"
    }
  }

  return (
    <div className='max-w-[80%] section sm:max-w-full pb-0'>
      <div className={gridStyle}>
        {/* <h2><button onClick={() => setLink(`explore`)}>All</button><button onClick={() => setLink(`explore/image`)}>Images</button><button onClick={() => setLink(`explore/audio`)}>Audio</button><button onClick={() => setLink(`explore/video`)}>Video</button></h2> */}
        <div className={gallerystyle}>
          {datas && datas.map((data, index) => {
            if (datas.length === index + 1) {
              return (<div ref={lastDataElementRef} className={gridWithPackageStyle} key={data.id}>

                {AllImagesDisplay(data)}

              </div>);
            } else {
              return (<div className={gridWithPackageStyle} key={data.id} >
                {AllImagesDisplay(data)}

              </div>);
            }
          })

          }
        </div>
        {/* <button className="edit-btn" onClick={handleScroll}>Gimme media</button> */}
        <div className={displayPackageStyle}>
          <div className='absolute hidden sm:flex w-full justify-center p-1'> <span className=' mx-auto min-h-[10px] w-[80px] bg-gray-400 rounded-md '></span></div>
          {/* <p className='text-8xl font-bold'>Trip details go here</p> */}

          {location &&
            <div className='p-4 sm:p-[0.5rem] overflow-y-auto'>
              <div className='my-4 sm:my-[1.1rem]'>
                <span>
                  <svg onClick={() => showPackage(false)} className="ml-auto cursor-pointer mb-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" >
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z">
                    </path>
                  </svg>
                </span>
                {/* {console.log(locimg)} */}
                {/* {console.log(locimg.slice(21,27))}
                                {console.log(locimg.slice(21,27) === "images")} */}
                {/* {console.log( <image src={locimg}  alt="" className ="object-cover h-full  w-full"/>)} */}
                <p className='text-4xl pb-2'>{location.name}</p>
                <div className='h-[500px] w-[700px] flex justify-center bg-[#00000011] p-box-shadow-2-inner rounded-xl'>
                {locimg && <img src={locimg} alt="" className="object-cover h-[500px] max-w-[700px] rounded-xl" />}
                {locvideo && <video controls src={locvideo} alt="" className="object-cover h-[500px] rounded-xl" />}
                </div>
                {/* {locimg && <video controls src={locimg}  alt="" className ="object-cover h-full  w-full"/>} */}
                <p className='text-2xl pt-2'>{location.location}</p>
                <p className = "flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-4 w-6 pr-1 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                <p className='text-xl'>{location.duration}</p>
                </p>
                <h3 className='flex text-xl items-center text-center '><span>Type: {location.type}</span></h3>
                <p className='flex text-xl items-center text-center '><span className = "pr-1">{location.ratings}</span>
                  
                  {/* <span className='flex'>
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
                                    </span> */}
                
                  {location.ratings !== "No Ratings" && <div className="stars flex" >
                    {calculation(location)}
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

                    <svg width="25" height="25" viewBox="0 0 20 20">
                      <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[1]} />
                    </svg>
                    {/* </path> */}
                    <svg width="25" height="25" viewBox="0 0 20 20">
                      <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[2]} />
                    </svg>
                    <svg width="25" height="25" viewBox="0 0 20 20">
                      <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[3]} />
                    </svg>
                    <svg width="25" height="25" viewBox="0 0 20 20">
                      <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[4]} />
                    </svg>
                    <svg width="25" height="25" viewBox="0 0 20 20">
                      <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[5]} />
                    </svg>
                    <div className = "sm:hidden">Ratings: {location.ratingsCount}</div>
                  </div>
                  }
                                </p>
                <div className = "hidden sm:flex">Ratings: {location.ratingsCount}</div>
                <p className='flex text-xl items-center text-center '><span>${location.price}</span></p>
                {/* <p className='flex text-2xl items-center text-center '><span>Rating count : {location.ratingsCount}</span></p> */}
              </div>
              <p className='text-2xl'>Description</p>
              <p className='leading-tight'>{location.description}</p>
              {/* <p className='text-xl py-4'>packages if any available</p>  */}
                  {console.log(location)}
              <p>  </p>
              {/* <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
              <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
              <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div> */}
                     <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/trip/'+ location.name)}}>know more</button> 

            </div>
          }

          {/* <div className='p-4 sm:p-[0.5rem]'>
                    <div className='my-8 sm:my-[1.1rem]'>
                    <p className='text-3xl'>Location</p>
                    <p className='flex text-2xl items-center text-center '><span>x.x </span>
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
                    </div>             
                    <p className='text-3xl'>Description</p>
                    <p className='leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, enim. Molestias impedit velit, vel deleniti aliquam vero? Reiciendis mollitia, non quis ex possimus, quo neque maiores similique nemo, doloremque ut?</p>
                    <p className='text-xl py-4'>packages if any available</p>
                    <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
                    <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
                    <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>

                </div> */}

        </div>
      </div>
    </div>
  );
}


export default Gallery;