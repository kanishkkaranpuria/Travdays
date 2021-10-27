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
      {loading1 ? <div><h1>loading...</h1></div> :
    <div>
      <button onClick={priceAscending} type="button">↑Price</button>
      <button onClick={priceDescending} type="button">↓Price</button>
      <div className="trips page grid grid-cols-3">
        {datas && datas.map((data, index) => {
          if (datas.length === index + 1) {
            return (
            <div ref={lastDataElementRef} className="p-5" key={data.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {data.displayImage && <img src={data.displayImage} alt="" className ="w-full h-80"/>}
                {data.name && <h1 onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</h1>}
                {data.type && <h3 >{data.type}</h3>}
                {data.ratings === "No Ratings" && <h3 >{data.ratings}</h3>}
                {data.ratings !== "No Ratings" && <h3 >{data.ratings}☆</h3>}
                {data.ratingsCount && <h3 >{data.ratingsCount}</h3>}
                {data.price && <h3 >₹{data.price}</h3>}
                
                



               
              </div>

            </div>);
          } else {
            return (
            <div className="p-5" key={data.id} >
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {data.displayImage && <img src={data.displayImage} alt=""className ="w-full h-80"/>}
                {data.name && <h1 onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</h1>}
                {data.type && <h3 >{data.type}</h3>}
                {data.ratings === "No Ratings" && <h3 >{data.ratings}</h3>}
                {data.ratings !== "No Ratings" && <h3 >{data.ratings}☆</h3>}
                {data.ratingsCount && <h3 >{data.ratingsCount}</h3>}
                {data.price && <h3 >₹{data.price}</h3>}
                {/* {if (data.name === )} */}
                








              </div>

            </div>);
          }
        })
        }

      </div></div>}
  </>);
}

export default AllTrips;