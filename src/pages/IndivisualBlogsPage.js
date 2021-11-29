import { useState ,useEffect, useRef, useCallback,} from "react";
import axios from "axios";
import { useParams } from "react-router";
import fullaxios from "../components/FullAxios";

const IndivisualBlogPage = ({isadmin}) => {
    const [iblogimg, setIblogimg] = useState([])
    const [iblogdata, setIblogdata] = useState({})
    const [featured, setFeatured] = useState(null)
    const [approved, setApproved] = useState(null)
    const {id} = useParams();
    const {title} = useParams();
    
    //paginationnnnnnnnnnn
    const observer = useRef()
    const [loading, setLoading] = useState(false)
    const [hasmore, setHasmore] = useState(true)
    const [page, setPage] = useState(1)

    const lastDataElementRef = useCallback(node => {
      console.log('last element')
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasmore) {
          setPage(prev => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [loading, hasmore])
    
    useEffect(() => {
        console.log(id)
        if(id){
            fullaxios({url: 'blog/indi/' + id +'/'+ page})
            .then(res => {
              if(Object.keys(res.data).length===0){
                setHasmore(false)
              }
                console.log("hasmore false")
              setIblogdata({...iblogdata,...res.data})
                //   setIblogdata(res.data)
                  console.log(res.data[0].slice(-3,))   
                  console.log()         
            console.log(res.data)
            })
            .catch(err => {
              setHasmore(false)
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setLoading(false)
               }
             }})
        }
    }, [page,hasmore])



    //addmins onlyyyyyy
    useEffect(() => {
      console.log(id)
      if(id){
          fullaxios({url: 'blog/status/' + id })
          .then(res => {
           setFeatured(res.data.featured)
           setApproved(res.data.approved)
          })
          .catch(err => {
            
             
           })
      }
  }, [])


    // featureeeeee
    const Feature = (feature) => {
      if(feature===true){
        setApproved(feature)
      }
      setFeatured(feature )       
      
      
    }
    
    
    
    //Approvee
    
    const Approve = (approval) => {
      if(featured===true){
        setApproved(true)
      }
      else if(featured===false){
        setApproved(approval)
        
      }

      }

      //indblog info

    // useEffect(() => {
    //     console.log(id)
    //     console.log(title)
    //     if(id){
    //         fullaxios({url: 'blog/media/' + id })
    //         .then(res => {
    //             console.log(res.data)
    //           setIblogimg(prev=>[...prev,...res.data])
    //         })
    //         .catch(err => {
    //            if (err.response){if (err.response.data.detail === "Invalid page.") {
    //              setHasmore(false)
    //              setLoading(false)
    //            }
    //          }})
    //     }
    // }, [])

    useEffect(() => {
        console.log(id)
        if(id){
            fullaxios({url: 'blog/indi/' + id +'/'+ 1})
            .then(res => {
              setIblogdata(res.data)
                //   setIblogdata(res.data)
                  console.log(res.data)  
                  console.log(res.data[0].slice(-3,))   
                  console.log()         
            console.log(res.data)
            })
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore(false)
                 setLoading(false)
               }
             }})
        }
    }, [])

    

    const test = () => {
      //Approval
     

      // if(approval){

        fullaxios({url : 'blog/create' ,type:'patch' ,data : {
            id : id,
            featured : featured,
            approved : approved,
        }, })
        .then(res => {  
          console.log("well approved") 
          alert("response submited")
        })
        .catch(err => {
          console.log(err.response)
           })
      // }
      // else if (!approval){
      //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
      //       id : id,
      //       // featured : !featured,
      //       approved : approval,
      //   }, })
      //   .then(res => {
      //     if (res){
      //   }})
      //   .catch(err => {
      //      if (err.response){if (err.response.data.detail === "Invalid page.") {
      //      }
    
      //    }})
      // }

      // //Featureddddd
      // if(feature){

      //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
      //       id :id,
      //       featured : feature,
      //       approved : feature,
      //   }, })
      //   .then(res => {
      //     if (res){
      //       console.log(res.data)
      //     // setAllblogs(prev=>[...prev,...res.data])
      //   }})
      //   .catch(err => {
      //      if (err.response){if (err.response.data.detail === "Invalid page.") {
      //      }
    
      //    }})
      // }
      // else if (!feature){
      //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
      //       id : id,
      //       featured : feature,
      //       approved : feature ,
      //   }, })
      //   .then(res => {
      //     if (res){
      //   }})
      //   .catch(err => {
      //      if (err.response){if (err.response.data.detail === "Invalid page.") {
      //      }
    
      //    }})
      // }


    }
     

    //test useeffect
    useEffect(() => {
        // console.log(iblogimg,"img")
      console.log(page)

        
    }, [iblogdata,iblogimg,page])
    return ( 
        <div className='section'>

            
            
            {iblogdata && <div className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                             { isadmin &&   <div>
                              {approved ? <button onClick={(()=>{Approve(false)})} className=' sm:mx-auto text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>Approve:&#9745;</button> :
                         <button onClick={(()=>{Approve(true)})} className=' sm:mx-auto text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>  Approve:&#9744;</button>  } 
                          {featured ? <button onClick={(()=>{Feature(false)})} className=' sm:mx-auto text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>Feature:&#9745;</button> :
                         <button onClick={(()=>{Feature(true)})} className=' sm:mx-auto text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>  Feature:&#9744;</button>  } 
                               <button onClick={test} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >submit</button>
                              </div>}
                              </div>
                      
                          
                      </div>
                      <p className=' px-60 py-10 text-4xl'>{title}</p>
                      
                    
                      <p className='px-8 py-2 pt-3 leading-tight text-xl'> {Object.keys(iblogdata).map((keyName, i) => {
                         console.log(i+1)
                        if(Object.keys(iblogdata).length === i +1 ){
                          return(
                            <div ref={lastDataElementRef} className="">
                                { iblogdata[keyName].slice(-3,)==="par" &&<div id={i} value={i + 1}>{iblogdata[keyName].slice(0,-4)}</div>}
                                { iblogdata[keyName].slice(-3,)==="img" && <img src= {iblogdata[keyName].slice(0,-4)} alt="" /> }

                            </div>
                        )
                        }
                        else{
                          return(
                            <div  className="">
                                { iblogdata[keyName].slice(-3,)==="par" &&<div id={i} value={i + 1}>{iblogdata[keyName].slice(0,-4)}</div>}
                                { iblogdata[keyName].slice(-3,)==="img" && <img src= {iblogdata[keyName].slice(0,-4)} alt="" /> }

                            </div>
                        )
                        }
                          
                        
                      })} </p>
                      </div>
                      

                  </div>

                </div>   
}
</div>
     );
}
 
export default IndivisualBlogPage;