import { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import fullaxios from '../components/FullAxios';


const BookingHistory = () => {

  const history = useHistory();
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const prevDatas = useRef([])
  const observer = useRef()


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
  },[loading,hasMore] )

  useEffect(() => {
    fullaxios({url : 'booking/history?page='+page})
    .then(res => {
      console.log(res.data)
      setDatas(prev => [...prev, ...res.data])
      prevDatas.current = datas
    })
    .catch(err => {
      if (err.response) {
        if (err.response.data.detail === "Invalid page.") {
          setHasMore(false);
        }}
    });
    setLoading(false);
  }, [page])


  return (
    <div className='z-[3] sm:w-[300px] w-[500px]'>

        {datas && datas.map((data, index) => {
          if(datas.length === index+1){
         return ( <div ref = {lastDataElementRef} className="" key={data.id}>
            <div className="blog-preview-card p-8 my-4 bg-[#f7f7f5] ">
            {data.trip && <div>{data.trip}</div>}
            {data.query && <div>{data.query}</div>}
            {data.phoneNumber && <div>{data.phoneNumber}</div>}
            {data.created && <div>{data.created}</div>}
            </div>
          </div>);
          }else {
              return ( <div className="" key={data.id} >
            <div className="blog-preview-card p-8 my-4 bg-[#f7f7f5] ">
            {data.trip && <div>{data.trip}</div>}
            {data.query && <div>{data.query}</div>}
            {data.phoneNumber && <div>{data.phoneNumber}</div>}
            {data.created && <div>{data.created}</div>}
            </div>

          </div>);
          }
        })
        
        }


      </div>
  );
}


export default BookingHistory;
