import react from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import fullaxios from '../components/FullAxios';
import Loading from '../components/Loading';


const BookingHistory = () => {

  const history = useHistory();
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const prevDatas = useRef([])
  const observer = useRef()
  const [realLoading, setRealoading] = useState(true)


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
      setRealoading(false)
    })
    .catch(err => {
      if (err.response) {
        if (err.response.data.detail === "Invalid page.") {
          setHasMore(false);
        }}
      console.error(err)
      setRealoading(false)  
    });
    setLoading(false);
  }, [page])


  return (
    <>
    {realLoading && <Loading/> }
    {!realLoading &&
    <div className='z-[3] sm:w-[300px] w-[500px]'>

        {datas && datas.map((data, index) => {
          if(datas.length === index+1){
            return ( <div ref = {lastDataElementRef} className="" key={data.id}>
             <div className="p-box-shadow-2 rounded-[12px] p-8 my-4 bg-[#f7f7f5] relative">
            {data.trip && <div className='font-bold text-lg'>{data.trip}</div>}
            {data.query && <div className='py-4'>{data.query}</div>}
            {data.phoneNumber && <div className='absolute bottom-2'>Phone No: {data.phoneNumber}</div>}
            {data.created && <div className='absolute bottom-2 right-4'>{data.created}</div>}
            </div>
          </div>);
          }else {
            return ( <div className="" key={data.id} >
             <div className="p-box-shadow-2 rounded-[12px] p-8 my-4 bg-[#f7f7f5] relative">
            {data.trip && <div className='font-bold text-lg'>{data.trip}</div>}
            {data.query && <div className='py-4'>{data.query}</div>}
            {data.phoneNumber && <div className='absolute bottom-2'>Phone No: {data.phoneNumber}</div>}
            {data.created && <div className='absolute bottom-2 right-4'>{data.created}</div>}
            </div>

          </div>);
          }
        })
        
        }


      </div>
      }
      </>
  );
}


export default BookingHistory;
