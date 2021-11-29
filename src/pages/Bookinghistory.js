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
    .catch(err => console.error(err));
    setLoading(false);
  }, [page])


  return (
    <div>

        {datas && datas.map((data, index) => {
          if(datas.length === index+1){
         return ( <div ref = {lastDataElementRef} className="" key={data.id}>
            <div className="datas-preview">
            {data.trip && <div>{data.trip}</div>}
            {data.query && <div>{data.query}</div>}
            {data.phoneNumber && <div>{data.phoneNumber}</div>}
            {data.created && <div>{data.created}</div>}
            </div>
            <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </p>
          </div>);
          }else {
              return ( <div className="" key={data.id} >
            <div className="datas-preview">
            {data.trip && <div>{data.trip}</div>}
            {data.query && <div>{data.query}</div>}
            {data.phoneNumber && <div>{data.phoneNumber}</div>}
            {data.created && <div>{data.created}</div>}
            </div>
            <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </p>

          </div>);
          }
        })
        
        }


      </div>
  );
}


export default BookingHistory;
