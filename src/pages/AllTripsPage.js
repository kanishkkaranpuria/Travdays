import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router";

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
    axios
      .get(`http://127.0.0.1:8000/trip/universal/` + JSON.stringify(object) + `?page=` + page)
      .then(res => {
        setDatas(prev => [...prev, ...res.data])
        console.log(res.data)
        console.log(object)
        prevDatas.current = datas
        setLoading1(false)
      })
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
    axios
      .get(`http://127.0.0.1:8000/trip/media/` + globalUrl + `?page=` + hoverpage)
      .then(res => {
        setHoveratas(prev => [...prev, ...res.data])
        console.log(res.data)
        hoverprevDatas.current = hoverdatas
      })
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

<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 fixed bottom-16 right-16" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
</svg>

      <div className="trips">

        {datas && datas.map((data, index) => {
          if (datas.length === index + 1) {
            return (
            <div ref={lastDataElementRef} className="p-5 flex justify-center " key={data.id}>
              <div className="flex max-w-sm rounded-[20px] overflow-hidden trip-card">
                <div className='w-[300px] h-[300px] p-box-shadow flex justify-center'>
                {data.displayImage && <img src={data.displayImage} alt="" className ="w-full h-full object-cover"/>}
                </div>
                  <div className='p-4 w-full'>
                  <p className='flex justify-between items-center'>
                  {data.name && <p className='text-lg font-bold' onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</p>}
                {data.type && <p className='text-sm' >{data.type}</p>}
                  </p>
                {data.ratings === "No Ratings" && <p className='py-4' >{data.ratings}</p>}
                {data.ratings !== "No Ratings" && <p className='flex py-4' >{data.ratings}
                
                <span className='flex h-6'>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    </span>
                
                 <span className='px-4 text-sm'>{data.ratingsCount}</span></p>}
                 <p className='flex py-4'>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='pl-4'>x days y nights</span>
                 </p>
                 <p className='text-lg font-semibold'>short description</p>
                 <p className='leading-'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur non aliquam itaque omnis repellendus, dignissimos voluptate fuga, provident libero in praesentium porro consequuntur odit ex ipsa magnam tenetur nostrum. Ipsa!</p>
                {/* {data.ratingsCount && <p >{data.ratingsCount}</p>} */}
                {data.price && <p  className='absolute bottom-2 right-4 font-semibold'>₹{data.price}</p>}
                  </div>
                
                



               
              </div>

            </div>);
          } else {
            return (
              <div ref={lastDataElementRef} className="p-5 flex justify-center " key={data.id}>
              <div className="flex max-w-sm rounded-[20px] overflow-hidden trip-card">
                <div className='w-[300px] h-[300px] p-box-shadow flex justify-center'>
                {data.displayImage && <img src={data.displayImage} alt="" className ="w-full h-full object-cover"/>}
                </div>
                  <div className='p-4 w-full'>
                  <p className='flex justify-between items-center'>
                  {data.name && <p className='text-lg font-bold' onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</p>}
                {data.type && <p className='text-sm' >{data.type}</p>}
                  </p>
                {data.ratings === "No Ratings" && <p className='py-4' >{data.ratings}</p>}
                {data.ratings !== "No Ratings" && <p className='flex py-4' >{data.ratings}
                
                <span className='flex h-6 overflow-hidden' style={{width:data.ratings*24}}>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    </span>
                
                 <span className='px-4 text-sm'>{data.ratingsCount}</span></p>}
                 <p className='flex py-4'>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='pl-4'>x days y nights</span>
                 </p>
                 <p className='text-lg font-semibold'>short description</p>
                 <p className='leading-'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur non aliquam itaque omnis repellendus, dignissimos voluptate fuga, provident libero in praesentium porro consequuntur odit ex ipsa magnam tenetur nostrum. Ipsa!</p>
                {/* {data.ratingsCount && <p >{data.ratingsCount}</p>} */}
                {data.price && <p  className='absolute bottom-2 right-4 font-semibold'>₹{data.price}</p>}
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