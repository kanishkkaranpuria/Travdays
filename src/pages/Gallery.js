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


import { Link } from "react-router-dom";
import { useHistory } from 'react-router';

const Gallery = () => {


  const [storage, setStorage] = useState([]);
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
      console.log(page)
    })
    if (node) observer.current.observe(node)
  },[loading,hasMore] )


 

  useEffect(() => {
    axios({
        method:'GET',
        url: '/gallery/?page='+ page,

        // configuration
    })
    .then(res => {
      setDatas(prev => [...prev, ...res.data])
      prevDatas.current = datas
    })
    .catch(err => console.error(err));
    setLoading(false);
  }, [page])
  
  useEffect(() => {
    setStorage([...datas.map(data => data.id)])
    console.log('datas-', datas);
    console.log('prev datas',prevDatas.current)
    if(datas.length!==0 && prevDatas.current.length === datas.length){
      setHasMore(false)
    }
  }, [datas])
  
  useEffect(() => {
    console.log('storage', storage)
  }, [storage])
  
  useEffect(() => {
    console.log('hasMore', hasMore)
  }, [hasMore])



  return (
    <div>
   


    <div className= "grid grid-cols-3">
        {/* <h2><button onClick={() => setLink(`explore`)}>All</button><button onClick={() => setLink(`explore/image`)}>Images</button><button onClick={() => setLink(`explore/audio`)}>Audio</button><button onClick={() => setLink(`explore/video`)}>Video</button></h2> */}

        {datas && datas.map((data, index) => {
          if(datas.length === index+1){
         return ( <div ref = {lastDataElementRef} className="aaa" key={data.id}>
            {/* <img src={data.image} alt-text="goddamit" width="100%"></img> */}
            <div className="datas-preview object-contain overflow-hidden h-5">
              {data.image && <img src={data.image}  alt="" className ="w-full"/>}
              {/* {console.log(number = number + 1)} */}
            </div>

          </div>);
          }else {
            return ( <div className="aaa" key={data.id} >
            {/* <img src={data.image} alt-text="goddamit" width="100%"></img> */}
            <div className="datas-preview object-contain overflow-hidden  h-5">
              {data.image && <img src={data.image}  alt="" className ="w-full"/>}
              {/* {console.log(number = number + 1)} */}
            </div>

          </div>);
          }
        })

        }
      {/* <button className="edit-btn" onClick={handleScroll}>Gimme media</button> */}
    </div>
</div>
  );
}


export default Gallery;