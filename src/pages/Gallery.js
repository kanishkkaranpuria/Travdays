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


  const [storage, setStorage] = useState([]);
  const [datas, setDatas] = useState([]);
  const [digit , setDigit] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const prevDatas = useRef([])
  const observer = useRef()

  
 
 
 



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
  },[loading,hasMore] )

  useEffect(() => {
    fullaxios({url : 'gallery/?page='+page,type : "get",sendcookie : true})
    .then(res => {
      if (res){
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


  useEffect(() => {
    if(datas[0]!==undefined){
    setLocimg(datas[0].image)
    setLocvideo(datas[0].video)
    }   
  }, [datas])
  
  useEffect(() => {
    setStorage([...datas.map(data => data.id)])
    
    if(datas.length!==0 && prevDatas.current.length === datas.length){
      setHasMore(false) 
    }
  }, [datas])
  
  const [locid, setLocid] = useState()
  useEffect(() => {
    console.log('storage set')
    console.log(storage)
   
    // setLocid(storage[0].id)
    setLocid(storage[0])
    // setLocimg(storage[0].image)
    
  }, [storage])
  
  useEffect(() => {
    // console.log('hasMore', hasMore)
  }, [hasMore])
  
  //Aummmm time 
  const [location, setLocation] = useState(null)
  const [locimg,setLocimg]= useState()
  const [locvideo,setLocvideo]= useState()
  // const [state, setstate] = useState()
  const Selected = (data) => {
    setLocid(data.id)
    setLocimg(data.image)
    setLocvideo(data.video)
    // console.log(data.video)
    }

  useEffect(() => {
    fullaxios({url : 'gallery/package/'+ locid })
    .then(res => {
      console.log("resssssssssss",res.data)
      if (res){
      // setLocation(prev => [...prev, ...res.data])
      setLocation(res.data)
      // prevDatas.current = datas
      }
    })
    .catch(err => console.error(err));
  }, [locid])  

  useEffect(() => {
    // console.log("location",location)
    
  }, [location])
  


  return (
    <div className='max-w-[80%] sm:max-w-full'>
   


    <div className= " w-full gallery ">
        {/* <h2><button onClick={() => setLink(`explore`)}>All</button><button onClick={() => setLink(`explore/image`)}>Images</button><button onClick={() => setLink(`explore/audio`)}>Audio</button><button onClick={() => setLink(`explore/video`)}>Video</button></h2> */}
        <div className='grid grid-cols-3 overflow-y-auto sm:rounded-none rounded-b-[20px] h-[90vh] sm:h-[85vh]'>
        {datas && datas.map((data, index) => {
          if(datas.length === index+1){
         return ( <div ref = {lastDataElementRef} className="overflow-hidden min-h-[200px] sm:min-h-[120px]" key={data.id}>
              {data.image && <img src={data.image} onClick={()=>{Selected(data)}} alt="" className ="object-cover h-full  w-full cursor-pointer"/>}
              {data.video && < video src={data.video} onClick={()=>{Selected(data)}}  alt="" className ="object-cover h-full  w-full cursor-pointer"/>}

          </div>);
          }else {
            return ( <div className="overflow-hidden min-h-[200px] sm:min-h-[120px]" key={data.id} >
              {data.image && < img src={data.image} onClick={()=>{Selected(data)}}  alt="" className ="object-cover h-full  w-full cursor-pointer"/>}
              {data.video && < video src={data.video} onClick={()=>{Selected(data)}}  alt="" className ="object-cover h-full  w-full cursor-pointer"/>}
              
          </div>);
          }
        })

        }
        </div>
      {/* <button className="edit-btn" onClick={handleScroll}>Gimme media</button> */}
      <div className='flex relative h-[90vh] sm:h-[50%] sm:rounded-t-[20px]  '>
        <div className='absolute hidden sm:flex w-full justify-center p-1'> <span className=' mx-auto min-h-[10px] w-[80px] bg-gray-400 rounded-md '></span></div>
        {/* <p className='text-8xl font-bold'>Trip details go here</p> */}

        {location && 
                      <div className='p-4 sm:p-[0.5rem] overflow-y-auto'>
                                <div className='my-8 sm:my-[1.1rem]'>
                                  
                                {/* {console.log(locimg)} */}
                                {/* {console.log(locimg.slice(21,27))}
                                {console.log(locimg.slice(21,27) === "images")} */}
                                {/* {console.log( <image src={locimg}  alt="" className ="object-cover h-full  w-full"/>)} */}
                                {locimg && <img src={locimg}  alt="" className ="object-cover h-[500px]  w-[750px]"/>}
                                {locvideo && <video controls src={locvideo}  alt="" className ="object-cover h-[500px]  w-[750px]"/>}
                                {/* {locimg && <video controls src={locimg}  alt="" className ="object-cover h-full  w-full"/>} */}
                                <p className='text-3xl'>{location.location}</p>
                                <h3 className='flex text-2xl items-center text-center '><span>({location.type})</span></h3>
                                <p className='flex text-2xl items-center text-center '><span>{location.ratings}</span>
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
                                <p className='flex text-2xl items-center text-center '><span>${location.price}</span></p>
                                <p className='flex text-2xl items-center text-center '><span>Rating count : {location.ratingsCount}</span></p>
                                </div>             
                                <p className='text-3xl'>Description</p>
                                <p className='leading-tight'>{location.description}</p>
                                <p className='text-xl py-4'>packages if any available</p>
                                <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
                                <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>
                                <div className='w-full pt-4 h-[100px] my-2 bg-[#00000033] rounded-lg'></div>

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