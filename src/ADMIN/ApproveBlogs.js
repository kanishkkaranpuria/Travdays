import { useState ,useEffect, useRef, useCallback,} from "react";
import { useHistory } from "react-router";
import WriteABlog from "../components/WriteABlog";
import axios from "axios";
import fullaxios from "../components/FullAxios";
import { Link } from "react-router-dom";
import { waitFor } from "@testing-library/react";

const ApproveBlogs = ({id,setId}) => {
   
      const history = useHistory()
      const [sortlink, setSortlink] = useState("votefilter")
      const [loading, setLoading] = useState(false)
      const [unapproved,setUnapproved] = useState(false);
      let blogsort
      const Sorted = () => {
        if (sortlink==="votefilter"){
          setSortlink("created")
          setAllblogs([])
          console.log("not created")
          setBlogpage(1)
        }
        else if (sortlink==="created"){
          setSortlink("votefilter")
          setAllblogs([])
          console.log("created")
          setBlogpage(1)
        }
    
    
      }
      const ID = (dataId) => {
        setId(dataId)
      }
       
      useEffect(() => {
        console.log(id)
        
      }, [id])
    
    
      // allblogssss
      const observer = useRef()
      const [allblogs, setAllblogs] = useState([])
      const [blogpage, setBlogpage] = useState(1)
      const [hasmore2, setHasmore2] = useState(true)
      
      const lastDataElementRef2 = useCallback(node => {
        console.log('last element')
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasmore2) {
            setBlogpage(prev => prev + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasmore2])
      
    
      useEffect(() => {
        console.log("useeffect")
        setLoading(true)
        
        fullaxios({url : 'blog/' + sortlink +'?page='+ blogpage})
        .then(res => {
          if (res){
          setAllblogs(prev=>[...prev,...res.data])
        }})
        .catch(err => {
           if (err.response){if (err.response.data.detail === "Invalid page.") {
             setHasmore2(false)
           }
    
         }})
         setLoading(false)
    }, [blogpage,sortlink])
    
         
      //featured blogs
      const observer2 = useRef()
      const [hasmore, setHasmore] = useState(true)
      const [featured, setFeatured] = useState([])
      const [fpage, setFpage] = useState(1)
      
      const lastDataElementRef = useCallback(node1 => {
        console.log('last element')
        if (loading) return
        if (observer2.current) observer2.current.disconnect()
        observer2.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasmore) {
            setFpage(prev => prev + 1)
          }
          })
          if (node1) observer2.current.observe(node1)
        }, [loading, hasmore])
        
        
        useEffect(() => {
          setLoading(true)
          fullaxios({url : 'blog/featured?page=' + fpage, sendcookie : false})
          .then(res => {
            if (res){
            setFeatured(prev=>[...prev,...res.data])
          }})
          .catch(err => {
             if (err.response){if (err.response.data.detail === "Invalid page.") {
               setHasmore(false)
               setLoading(false)
             }
     
           }})
           setLoading(false)
      }, [fpage])
    
      useEffect(() => {
     console.log("sorted")
      }, [blogsort])
    
    
      useEffect(() => {
        console.log(featured)
        console.log(blogpage)
        console.log(allblogs)
        console.log(fpage)
      
        
    
      }, [featured,blogpage,sortlink])
    
    
    
    
       
    
    
    
    
    
        return (
            <div className="blog relative pt-[60px] w-full">
            {/* <img onClick ={()=>{history.push("blogs/write")}}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png"/> */}
             {unapproved && <button onClick = {(()=>{ setUnapproved(false) })} className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' > Unapproved blogs </button>}
             {!unapproved && <button onClick = {(()=>{ setUnapproved(true) })} className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' > Approved blogs </button>}
            <p className='text-5xl sm:text-2xl font-bold p-4'>Approved Blogs</p>
            <div className="featured-blogs flex overflow-x-auto gap-x-8 sm:gap-x-2 p-4">
              {featured && featured.map((data,index) =>{
                if(featured.length===index+1){
                  return(
                    <div ref={lastDataElementRef} className="blog-preview-card featured relative">
                      <div className='gradient'></div>
                  <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                      <div className='p-8 sm:p-2 absolute bottom-0 text-white'>
                          <p className='text-3xl sm:text-xl'>{data.title}</p>
                          <p className='flex text-2xl items-center text-center '><span>x.x </span>
                              <span className='flex'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                              </span>
                          </p>
                      </div>
                      <img className='w-full h-full top-0 object-cover bg' src={data.image} alt=""/>
                  </div>
                  );
                }
                else{
                  return(
                    <div  className="blog-preview-card featured relative">
                      <div className='gradient'></div>
                  <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                      <div className='p-8 sm:p-2 absolute bottom-0 text-white'>
                          <p  className='text-3xl sm:text-xl'>{data.title}</p>
                          <p className='flex text-2xl items-center text-center '><span>x.x </span>
                              <span className='flex'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
                              </span>
                          </p>
                      </div>
                      <img className='w-full h-full top-0 object-cover bg' src={data.image} alt=""/>
                  </div>
                  );
                }
               
              }
             )}
               
            </div>
            <p className='text-5xl sm:text-2xl font-bold p-4'>Unapproved Blogs</p>
            {allblogs && allblogs.map((data,index)=> {
              if(allblogs.length === index+1){
                return(
                  <div ref={lastDataElementRef2} className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
            <div className="blog-preview-card non-featured v1 relative">
                    <div className="blog-photos overflow-hidden">
                        <img className='object-cover h-full w-full' src={data.image} alt=""/>
                    </div>
                    <div className='p-8 sm:p-1'>
                        <div className="flex justify-between items-center">
                        <p className='font-semibold sm:text-2xl'>{data.location}</p>
                        <p className='font-semibold sm:text-2xl'>{data.created}</p>
                    <p className='flex text-2xl items-center h-6'>x.x 
                        <span className='flex h-6'>
                  
                        
                        <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                        <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                        <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                        <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                        <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                        </span>
                    </p>
                    </div>
                    <p onClick={()=>{history.push('/blogs/'+ data.title);ID(data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
                    <p className='pt-6 leading-tight text-xl'>{data.body}</p>
    
                    </div>
                </div>
              </div>
                )
              }
              else{
                return(
                  <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
                  <div className="blog-preview-card non-featured v1 relative">
                          <div className="blog-photos overflow-hidden">
                              <img className='object-cover h-full w-full' src={data.image} alt=""/>
                          </div>
                          <div className='p-8 sm:p-1'>
                              <div className="flex justify-between items-center">
                              <p className='font-semibold sm:text-2xl'>{data.location}</p>
                              <p className='font-semibold sm:text-2xl'>{data.created}</p>
                          <p className='flex text-2xl items-center h-6'>x.x 
                              <span className='flex h-6'>
                        
                              
                              <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                              <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                              <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                              <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                              <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                              </span>
                          </p>
                          </div>
                          <p onClick={()=>{history.push('/blogs/'+ data.title);ID(data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
                          <p className='pt-6 leading-tight text-xl'>{data.body}</p>
                          </div>
                      </div>
                    </div>
                )
    
              }
            })}
                
            </div>
        );
    }
     
  
export default ApproveBlogs;