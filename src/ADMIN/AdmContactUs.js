import { useState ,useEffect,useRef,useCallback} from "react";
import fullaxios from "../components/FullAxios";
const AdmContactUs = () => {
    const [allcontactus, setAllcontactus] = useState([])
    const [page, setPage] = useState(1)
    // const [id, setId] = useState()
    const [hasmore, setHasmore] = useState(true)
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const observer = useRef()
    
    const lastDataElementRef = useCallback(node => {
      console.log('last element')
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasmore) {
          setPage(prev => prev + 1)
        }
        })
      if (node) {
          console.log(node)
          observer.current.observe(node)}
      }, [loading, hasmore])

      useEffect(() => {
        // setLoading(true)
        if(!deleted){
          fullaxios({url: 'query/?page='+ page  })
          .then((res) => {
            setLoading(false)
            console.log("useeeffect rann")
            console.log(res.data)
            if (res.data.length===0){
              setAllcontactus(null)
            }
            else{
              setAllcontactus(prev=>[...prev,...res.data])

            }
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
          if (err.response){if (err.response.data.detail === "Invalid page.") {
            setHasmore(false)
          }
        }}
        )

      }
      
        
     
    }, [page,deleted])

    useEffect(() => {
      
  // console.log(loading)
  console.log(page)
  // console.log(deleted)
  // console.log(allcontactus.length)
    }, [page])
   
    const Delete = (id) => {
      console.log(id)
      setDeleted(true)
      setLoading(true)
      console.log("delete")
    
      fullaxios({url: 'query/'+ id , type: 'delete' })
      .then(res => {
        console.log("deleted")
        console.log(res.data)
        setAllcontactus([])
        setDeleted(false)
        setLoading(false)
        setPage(1)

        
        })
        .catch(res => {
        })
    }
     



    return (<>
      {loading ? <div><p>loading...</p></div> :
        <div className="blog relative pt-[60px] w-full">

         {!allcontactus && <div className="">
         <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card bg-[#f5f5f7] ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                             <p  className='text-3xl font-semibold  pt-8 '>Currently no one is contacting Travdays</p>
                              </div>
                      
                          
                      </div>
                      </div>
                      

                  </div>

                </div>  </div> }   
        {allcontactus && allcontactus.map((data,index)=> {
          if(allcontactus.length === index+1){
            return(
              <div ref={lastDataElementRef} className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card bg-[#f5f5f7] ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>{data.name}</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : {data.phoneNumber}</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  {data.choice}
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>{data.query}</p>
                      </div>
                      

                  <button onClick={()=>{Delete(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>
                  </div>

                </div>
            )
          }
         
       
          else{
            return(
              <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card bg-[#f5f5f7] ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>{data.name}</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : {data.phoneNumber}</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  {data.choice}
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>{data.query}</p>
                      </div>
                      

                  <button onClick={()=>{Delete(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>
                  </div>

                </div>
            )

          }
        })}  
           </div>
           }   
    </>);
}
 
export default AdmContactUs;