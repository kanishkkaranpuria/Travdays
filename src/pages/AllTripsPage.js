import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router";

const AllTrips = () => {
  
  const { type } = useParams();
  var object = useMemo(()=>{return{"type":type} },[])
  // var object = {"type":type};
  const [globalUrl, setGlobalUrl] = useState('');
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [location, setLocation] = useState('');
  const prevDatas = useRef([])
  const observer = useRef()

  const priceAscending = () => {
    ("sort" in object) && (object["sort"] = "price")
    !("sort" in object) && (object = Object.assign(object, {sort:"price"}));
    setHasMore(true)
    setPage(1)
    setDatas([])
  }
  const priceDescending = () => {
    ("sort" in object) && (object["sort"] = "-price")
    !("sort" in object) && (object = Object.assign(object, {sort:"-price"}));
    setHasMore(true)
    setPage(1)
    setDatas([])
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
    axios
      .get(`http://127.0.0.1:8000/trip/universal/` + JSON.stringify(object) + `?page=` + page)
      .then(res => {
        setDatas(prev => [...prev, ...res.data])
        console.log(res.data)
        console.log(object)
        prevDatas.current = datas
      })
      .catch(err => {
        if (err.response){ if (err.response.data.detail === "Invalid page.") {
          setHasMore(false);
        }
        // console.log(err)

      }})
    setLoading(false);
  }, [page])
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

  return (
    <div>
      <button onClick={priceAscending} type="button">↑Price</button>
      <button onClick={priceDescending} type="button">↓Price</button>
      <div className="trips page">
        {datas && datas.map((data, index) => {
          if (datas.length === index + 1) {
            return (<div ref={lastDataElementRef} className="" key={data.id}>
              <div className="">
                {data.name && <h1 onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</h1>}
                {data.type && <h3 >{data.type}</h3>}
                {data.ratings === "No Ratings" && <h3 >{data.ratings}</h3>}
                {data.ratings !== "No Ratings" && <h3 >{data.ratings}☆</h3>}
                {data.ratingsCount && <h3 >{data.ratingsCount}</h3>}
                {data.price && <h3 >₹{data.price}</h3>}
                {data.displayImage && <img src={data.displayImage} alt="" width="100%" />}
                {hoverdatas && hoverdatas.map((hoverdata, i) => {
                  if (globalUrl === data.name){
                  if (hoverdatas.length === i + 1) {
                    return (<div ref={lastDataElementRef2} className="" key={hoverdata.id}>
                      <div className="">
                        {/* {hoverdata.name && <h1>{hoverdata.name}</h1>} */}
                        {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}
                        {/* {hoverdata && <img src={hoverdata.image} alt="" width="100%" />} */}
                      </div>

                    </div>);
                  } else {
                    return (<div className="" key={hoverdata.id} >
                      <div className="">
                        {/* {data.name && <h1>{data.name}</h1>} */}
                        {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}


                      </div>

                    </div>);
                  }
                }})

                }
              </div>

            </div>);
          } else {
            return (<div className="" key={data.id} >
              <div className="">
                {data.name && <h1 onMouseOver={() => MouseOver(data.name)} onMouseOut={MouseOut}>{data.name}</h1>}
                {data.type && <h3 >{data.type}</h3>}
                {data.ratings === "No Ratings" && <h3 >{data.ratings}</h3>}
                {data.ratings !== "No Ratings" && <h3 >{data.ratings}☆</h3>}
                {data.ratingsCount && <h3 >{data.ratingsCount}</h3>}
                {data.price && <h3 >₹{data.price}</h3>}
                {data.displayImage && <img src={data.displayImage} alt="" width="100%" />}
                {/* {if (data.name === )} */}
                {hoverdatas && hoverdatas.map((hoverdata, i) => {
                  if (globalUrl === data.name){
                  if (hoverdatas.length === i + 1) {
                    return (<div ref={lastDataElementRef2} className="" key={hoverdata.id}>
                      <div className="">
                        {/* {hoverdata.name && <h1>{hoverdata.name}</h1>} */}
                        {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}
                        {/* {hoverdata && <img src={hoverdata.image} alt="" width="100%" />} */}
                      </div>

                    </div>);
                  } else {
                    return (<div className="" key={hoverdata.id} >
                      <div className="">
                        {/* {data.name && <h1>{data.name}</h1>} */}
                        {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}


                      </div>

                    </div>);
                  }
                }})

                }
              </div>

            </div>);
          }
        })
        }

      </div></div>
  );
}

export default AllTrips;