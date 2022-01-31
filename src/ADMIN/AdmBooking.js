import { useState ,useEffect,useRef,useCallback} from "react";
import { useHistory } from "react-router";
import fullaxios from "../components/FullAxios";

const AdmBooking = () => {
      const [allcontactus, setAllcontactus] = useState([])
      const [page, setPage] = useState(1)
      const [page1, setPage1] = useState(1)
      const history = useHistory()
      // const [id, setId] = useState()
      const [hasmore, setHasmore] = useState(true)
      const [loading, setLoading] = useState(false)
      const [loading1, setLoading1] = useState(false)
      const [deleted, setDeleted] = useState(false)
      const [approved, setApproved] = useState(true)
      const [approval, setApproval] = useState(false)
      const observer = useRef()
      
      const lastDataElementRef = useCallback(node => {
        console.log('last element')
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasmore) {
            console.log("page incr")
            setPage1(prev => prev + 1)
          }
          })
        if (node) {
            console.log(node)
            observer.current.observe(node)}
        }, [loading, hasmore])
  
        useEffect(() => {
          if(approved===true && deleted===false && approval===false){
          setLoading1(true)
            fullaxios({url: 'booking/view?page='+ page1 })
            .then((res) => {
              setLoading1(false)
              setLoading(false)
              console.log("useeeffect rann")
              console.log(res.data)
              if (res.data.length===0){
                setAllcontactus(null)
              }
              else{
                setAllcontactus(prev=>[...prev,...res.data])
  
              }
            // console.log(res.data
          })
          .catch(err => {
            console.log(err.response)
            if (err.response){if (err.response.data.detail === "Invalid page.") {
              setHasmore(false)
            }
          }}
          )
        }
        else if(approved===false && deleted===false && approval===false){
          fullaxios({url: 'booking/unapproved?page='+ page1 })
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
      }, [page1,approved,deleted,approval])
  
      useEffect(() => {
    console.log(page)
      }, [page])


      const  BFilter = (status) => {
        setAllcontactus([])
        setApproved(status)
        setLoading(true)
        setPage1(1)
        setHasmore(true)


        // console.log(status)
        // if(status===false ){
       
        // }
        // else if(status===true){
        //     fullaxios({url: 'booking/view?page='+ page})
        //     .then((res) => {
        //       setLoading(false)
        //       console.log("useeeffect rann")
        //       console.log(res.data)
        //       if (res.data.length===0){
        //         setAllcontactus(null)
        //       }
        //       else{
        //         setAllcontactus(prev=>[...prev,...res.data])
  
        //       }
        //     // console.log(res.data)
        //   })
        //   .catch(err => {
        //     console.log(err.response)
        //     if (err.response){if (err.response.data.detail === "Invalid page.") {
        //       setHasmore(false)
        //     }
        //   }}
        //   )
        // }
        
      }
       
     
      const Delete = (id) => {
        console.log(id)
        setDeleted(true)
        setLoading(true)
        console.log("delete")
      
        fullaxios({url: 'booking/view/'+ id , type: 'delete' })
        .then(res => {
          console.log("deleted")
          console.log(res.data)
          setAllcontactus([])
          setLoading(false)
          setPage1(1)
          setDeleted(false)
  
          
          })
          .catch(res => {
          })
      }


      const Approval = (id) => {
        let confirmBox = window.confirm("Approve this booking?")
        //confirmBox)
        if(confirmBox===true){

          setApproval(true)
        fullaxios({url: 'booking/view'  , type: 'patch',data:{
          approved:true ,
          id:id
          
        } })
        .then(res => {
          console.log(res.data)
          setAllcontactus([])
          setLoading(false)
          setPage1(1)
          setApproval(false)
  
          
          })
          .catch(res => {
          })
      }

    }
      
     
  
  
  
      return (<>
        {loading ? <div><p>loading...</p></div> :
          <div className="blog flex flex-col relative pt-[60px] w-full">

{ approved ?<button className='mx-auto p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088] hover:bg-[#000000aa]  rounded-md' onClick={() => {BFilter(false)}}> Show Unapproved bookings</button> :
      <button className='mx-auto p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088] hover:bg-[#000000aa] rounded-md' onClick={() => {BFilter(true)}}> Show All bookings</button> }
  
           {!allcontactus && <div className="">
           <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
                <div className="blog-preview-card bg-[#f5f5f7] ">
                        <div className='p-8 sm:p-1'>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                               <p  className='text-3xl font-semibold  pt-8 '>Currently no bookings</p>
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
                                <p  className='text-3xl font-semibold  pt-2 '>{data.user}</p>
                                <p  className='text-3xl font-semibold  pt-2 '>{data.created }</p>
                                </div>
                               <p  className='text-xl font-semibold  pt-8 '>Contact no : {data. phoneNumber}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                            <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                                </div>
                        <p className='text-2xl font-semibold  pt-2'> Trip name :  {data.trip}
                            
                        </p>
                        
                        {data.approved? 
                        <p className='text-2xl font-semibold  pt-2'>approved</p>
                        :
                        <p className='text-2xl font-semibold  pt-2'>Unapproved</p>
                        }
                        </div>
                        <p className='text-2xl font-semibold  pt-6'>Query:</p>
                        <p className='pt-3 leading-tight text-xl'>{data.query}</p>

                        </div>
                        
  
                    <button onClick={()=>{Delete(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white'  >Delete</button>
                    {data.approved===false && <button onClick={()=>{Approval(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white'  >Approvee</button> }  
                    </div>
  
                  </div>
              )
            }
           
         
            else{
              return(
                <div className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
                <div className="blog-preview-card bg-[#f5f5f7]">
                        <div className='p-8 sm:p-1'>
                            <div className="flex justify-between items-center">
                                <p  className='text-3xl font-semibold  pt-2 '>{data.user}</p>
                                <p  className='text-3xl font-semibold  pt-2 '>{data.created }</p>
                                </div>
                               <p  className='text-xl font-semibold  pt-8 '>Contact no : {data. phoneNumber}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                            <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                                </div>
                        <p className='text-2xl font-semibold  pt-2'> Trip name :  {data.trip}
                            
                        </p>
                        
                        {data.approved? 
                        <p className='text-2xl font-semibold  pt-2'>approved</p>
                        :
                        <p className='text-2xl font-semibold  pt-2'>Unapproved</p>
                        }
                        </div>
                        <p className='text-2xl font-semibold  pt-6'>Query:</p>
                        <p className='pt-3 leading-tight text-xl'>{data.query}</p>

                        </div>
                        
                    <button onClick={()=>{Delete(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white'  >Delete</button>
                    {data.approved===false && <button onClick={()=>{Approval(data.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white'  >Approvee</button> }  
  
                    </div>
  
                  </div>
              )
  
            }
          })}  
             </div>
             }   
      </>);
  }
  
 
export default AdmBooking;