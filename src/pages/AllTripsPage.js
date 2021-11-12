import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import fullaxios from "../components/FullAxios";
import stars from './images/stars.png'

const AllTrips = () => {
  
  const { type } = useParams();

  var object = useMemo(()=>{return{"type":type} },[type])
  console.log("object")
  // var object = {"type":type};
  const [globalUrl, setGlobalUrl] = useState('');
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [location, setLocation] = useState('');
  const prevDatas = useRef([])
  const observer = useRef()

  useEffect(()=>{
    setDatas([])
    setPage(1)
    setLoading(true)
    setLoading1(true)
    setHasMore(true)
    setGlobalUrl('')
  },[type])
  console.log(object)

  const priceAscending = () => {
    if ("sort" in object) object["sort"] = "price"
    if (!("sort" in object)) object = Object.assign(object, {sort:"price"});
    setHasMore(true)
    setPage(1)
    setDatas([])
    if (fetch ===true)setFetch(false)
    else if(fetch === false) setFetch(true)
  }
  const priceDescending = () => {
    if ("sort" in object)object["sort"] = "-price";
    if (!("sort" in object))object = Object.assign(object, {sort:"-price"});
    setHasMore(true)
    setPage(1)
    setDatas([])
    console.log(page)
    console.log(datas)
    console.log(hasMore)
    if (fetch ===true)setFetch(false)
    else if(fetch=== false) setFetch(true)
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
    console.log("i was here")

    fullaxios({url : 'trip/universal/' + JSON.stringify(object) + '?page=' + page})
      .then(res => {
        if (res){
        setDatas(prev => [...prev, ...res.data])
        console.log(res.data)
        console.log(object)
        prevDatas.current = datas
        setLoading1(false)
      }})
      .catch(err => {
        if (err.response){ if (err.response.data.detail === "Invalid page.") {
          setHasMore(false);
        }
        // console.log(err)

      }})
    // setLoading(false);
  }, [page, fetch, object])
  // _____________________________________________________________________________________________________________________________________
  const [hoverdatas, setHoveratas] = useState([]);
  const [hoverpage, setHoverpage] = useState(0);
  const [hoverloading, setHoverloading] = useState(true);
  const [hoverhasMore, setHoverhasMore] = useState(true);
  const hoverprevDatas = useRef([])
  const hoverobserver = useRef()
  const MouseOver = (name) => {
    // event.target.style.background = 'red';
    // setHoverloading(true)
    // setHoverhasMore(true)
    setGlobalUrl(name)
    setHoverpage(1)
    // axios
    //   .get(`http://127.0.0.1:8000/trip/media/` + name + `?page=` + hoverpage)
    //   .then(res => {
    //     setHoveratas(prev => [...prev, ...res.data])
    //     console.log(res.data)
    //     hoverprevDatas.current = hoverdatas
    //   })
    //   .catch(err => {
    //     // if (err.response.data.detail === "Invalid page.") {
    //     //   setHoverhasMore(false);
    //     // }
    //     console.log(err)
    //   })
    //   setHoverloading(false);
  }
  function MouseOut(event) {
    event.target.style.background = "";

  }
  const lastDataElementRef2 = useCallback(node => {
    console.log('last element')
    if (hoverloading) return
    if (hoverobserver.current) hoverobserver.current.disconnect()
    hoverobserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hoverhasMore) {
        setHoverpage(prev => prev + 1)
      }
    })
    if (node) hoverobserver.current.observe(node)
  }, [hoverloading, hoverhasMore])
  useEffect(() => {
    fullaxios({url : 'trip/media/' + globalUrl + '?page=' + hoverpage})
      .then(res => {
        if (res){
        setHoveratas(prev => [...prev, ...res.data])
        console.log(res.data)
        hoverprevDatas.current = hoverdatas
      }})
      .catch(err => {
        if (err.response){if (err.response.data.detail === "Invalid page.") {
          setHoverhasMore(false);
        }

      }})
    setHoverloading(false);
  }, [hoverpage])

  return (<>
      {loading1 ? <div><p>loading...</p></div> :
    <div className='section  flex justify-center '>
      {/* <button onClick={priceAscending} type="button">↑Price</button>
      <button onClick={priceDescending} type="button">↓Price</button> */}

<svg xmlns="http://www.w3.org/2000/svg" className="z-[5] h-16 w-16 fixed bottom-16 right-16 sm:right-4 " viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
</svg>

      <div className="trips sm:grid sm:grid-cols-2">

        {datas && datas.map((data, index) => {
          if (datas.length === index + 1) {
            return (
              <div ref={lastDataElementRef} className="p-5 sm:p-[0.5rem] flex justify-center " key={data.id}>
              <div className=" sm:text-white sm:relative flex sm:flex-col rounded-[20px] overflow-hidden trip-card">
                <div className='sm:relative w-[300px] sm:w-full h-[300px] sm:h-[300px] flex justify-center sm:p-0 p-2'>
              <div className='sm:flex sm:w-full sm:h-1/4 bg-gradient-to-b from-[#00000088] to-[#00000000] absolute top-0 hidden z-[-1]'></div>
              <div className='sm:flex sm:w-full sm:h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 hidden z-[-1]'></div>

                {data.displayImage && <img src={data.displayImage} alt="" className ="z-[-2] w-full h-full object-cover rounded-[20px]"/>}
                </div>
                  <div className='sm:absolute sm:h-full p-4 sm:p-2 w-full'>
                  <p className='flex justify-between items-center'>
                  {data.name && <p className='text-lg font-bold' onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</p>}
                {data.type && <p className='text-sm' >{data.type}</p>}
                  </p>
                {data.ratings === "No Ratings" && <p className='sm:absolute sm:bottom-[60px] sm:py-0 flex items-center py-4' >{data.ratings}</p>}
                {data.ratings !== "No Ratings" && <p className='sm:absolute sm:bottom-[60px] sm:py-0 flex items-center py-4' >
                <span className='pr-4 sm:pr-2'>{data.ratings}</span>
                <span className=' h-6 sm:h-4 overflow-hidden relative' >
                    <div className=' h-full bg-[#f5e63b] absolute z-[-1]' style={{width:data.ratings*24}}></div>
                    <img className='w-full h-full' src={stars} alt=""/>
                    </span>
                
                 <span className='px-4 text-sm'>{data.ratingsCount}</span>
                 </p>}
                 <p className='sm:absolute sm:bottom-[35px] sm:py-0 flex items-center py-4'>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-4 w-6 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='pl-4 sm:pl-2'>x days y nights</span>
                 </p>
                 <p className='sm:hidden text-lg font-semibold'>short description</p>
                 <p className='sm:hidden leading-tight'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur non aliquam itaque omnis repellendus, dignissimos voluptate fuga, provident libero in praesentium porro consequuntur odit ex ipsa magnam tenetur nostrum. Ipsa!</p>
                {/* {data.ratingsCount && <p >{data.ratingsCount}</p>} */}
                {data.price && <p  className='absolute bottom-2  font-semibold'>₹{data.price}</p>}
                  </div>
                
                



               
              </div>

            </div>
              );
          } else {
            return (
              <div ref={lastDataElementRef} className="p-5 sm:p-[0.5rem] flex justify-center " key={data.id}>
              <div className=" sm:text-white sm:relative flex sm:flex-col rounded-[20px] overflow-hidden trip-card">
                <div className='sm:relative w-[300px] sm:w-full h-[300px] sm:h-[300px] flex justify-center sm:p-0 p-2'>
              <div className='sm:flex sm:w-full sm:h-1/4 bg-gradient-to-b from-[#00000088] to-[#00000000] absolute top-0 hidden z-[-1]'></div>
              <div className='sm:flex sm:w-full sm:h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 hidden z-[-1]'></div>

                {data.displayImage && <img src={data.displayImage} alt="" className ="z-[-2] w-full h-full object-cover rounded-[20px]"/>}
                </div>
                  <div className='sm:absolute sm:h-full p-4 sm:p-2 w-full'>
                  <p className='flex justify-between items-center'>
                  {data.name && <p className='text-lg font-bold' onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</p>}
                {data.type && <p className='text-sm' >{data.type}</p>}
                  </p>
                {data.ratings === "No Ratings" && <p className='sm:absolute sm:bottom-[60px] sm:py-0 flex items-center py-4' >{data.ratings}</p>}
                {data.ratings !== "No Ratings" && <p className='sm:absolute sm:bottom-[60px] sm:py-0 flex items-center py-4' >
                <span className='pr-4 sm:pr-2'>{data.ratings}</span>
                <span className=' h-6 sm:h-4 overflow-hidden relative' >
                    <div className=' h-full bg-[#f5e63b] absolute z-[-1]' style={{width:data.ratings*24}}></div>
                    <img className='w-full h-full' src={stars} alt=""/>
                    </span>
                
                 <span className='px-4 text-sm'>{data.ratingsCount}</span>
                 </p>}
                 <p className='sm:absolute sm:bottom-[35px] sm:py-0 flex items-center py-4'>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-4 w-6 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='pl-4 sm:pl-2'>x days y nights</span>
                 </p>
                 <p className='sm:hidden text-lg font-semibold'>short description</p>
                 <p className='sm:hidden leading-tight'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur non aliquam itaque omnis repellendus, dignissimos voluptate fuga, provident libero in praesentium porro consequuntur odit ex ipsa magnam tenetur nostrum. Ipsa!</p>
                {/* {data.ratingsCount && <p >{data.ratingsCount}</p>} */}
                {data.price && <p  className='absolute bottom-2  font-semibold'>₹{data.price}</p>}
                  </div>
                
                



               
              </div>

            </div>
            );
          }
        })
        }

      </div></div>}
  </>);
}

export default AllTrips;