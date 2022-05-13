import { useState, useEffect, useRef, useCallback, } from "react";
import { useHistory } from "react-router";
import WriteABlog from "../components/WriteABlog";
import axios from "axios";
import fullaxios from "../components/FullAxios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
const MyBlogs = ({ id, setId }) => {

  const history = useHistory()
  const observer = useRef()
  const [reload, setReload] = useState(true)
  const [allblogs, setAllblogs] = useState([])
  const [blogpage, setBlogpage] = useState(1)
  const [hasmore, setHasmore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [Approved, setApproved] = useState(false);


  // useEffect(() => {
  //   console.log(id)
  //   if (id) {
  //     fullaxios({ url: 'blog/status/' + id })
  //       .then(res => {
  //         setFeatured(res.data.featured)
  //         setApproved(res.data.approved)
  //       })
  //       .catch(err => {


  //       })
  //     }
      
  // }, [])

  const [realLoading, setRealLoading] = useState(true)

  useEffect(() => {
    console.log("useeffect")
    setLoading(true)
    fullaxios({ url: 'blog/userblogs' + '?page=' + blogpage })
      .then(res => {
        if (res) {
          setAllblogs(prev => [...prev, ...res.data])
          console.log(res.data)
          setRealLoading(false)
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.detail === "Invalid page.") {
            setHasmore(false)
          }
          setRealLoading(false)
        }
      })
    setLoading(false)
  }, [blogpage, reload])


  const lastDataElementRef = useCallback(node1 => {
    console.log('last element')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasmore) {
        setBlogpage(prev => prev + 1)
      }
    })
    if (node1) observer.current.observe(node1)
  }, [loading, hasmore])


  const deleteblog = (id) => {
    // window.confirm("Permanently Delete Blog?");
    if (window.confirm("Permanently Delete the Blog?")) {
      fullaxios({ url: 'blog/delete/' + id, type: 'delete' })
        .then(res => {
          console.log(res)
          setAllblogs([]) 
          setBlogpage(1)
          setHasmore(true)
          setLoading(true)
          if (reload === true) setReload(false)
          else setReload(true)
        })
    } else {
      console.log("You pressed Cancel!")
    }
  }

  const displayingAllBlogs = (data, index) => {
    return (
      <div onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className="blog-preview-card non-featured v1 relative pb-20 ">
        <div className="blog-photos overflow-hidden">
          <img  className='object-cover h-full w-full cursor-pointer' src={data.image} alt="" />
        </div>
        <div className='p-4 sm:p-1 aumnormalblog2 relative'>
           <div className="flex lg:w-[300px] sm:w-full justify-between">
           <p className='font-semibold '>{data.location}</p>
            <p className='font-semibold '>{data.created}</p>
           </div>
          <p  className='text-4xl sm:text-2xl font-bold pt-6 cursor-pointer'>{data.title}</p>
          <p  className=' leading-tight text-xl cursor-pointer sm:overflow-hidden sm:text-[0.90rem] '>{data.body}</p>
           <div className="flex space-x-2 sm:mt-8 absolute sm:bottom-2 lg:top-2 lg:right-2 ">
             <p className='font-semibold sm:text-2xl'></p>

            <button className="p-2 px-8  bg-blue-500  sm:mx-auto aumbutton  font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  " ><Link to={{
                pathname : "/myblogs/editblogs", 
                state : {
                  data:[data]
                }
              }} >Edit Blog</Link></button>
            <button className="p-2 px-8  bg-red-500 font-semibold rounded-lg sm:mx-auto  hover:bg-red-700 text-white font-bold  " onClick={() => deleteblog(data.id)}>Delete
            </button>
           </div>

        </div>
      </div>
    );
  }

  return (
    <>
    {realLoading && <Loading />}
    {!realLoading &&
    <div className="blog relative  pt-[60px] w-full">
      {allblogs && allblogs.map((data, index) => {
        if (allblogs.length === index + 1) {
          return (
            <div ref={lastDataElementRef} className="max-w-[1440px] sm:max-w-[580px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center ">
              {displayingAllBlogs(data, index)}
            </div>
          )
        }
        else {
          return (
            <div className="max-w-[1440px] sm:max-w-[580px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center ">
              {displayingAllBlogs(data, index)}
            </div>
          )
          
        }
      })}
      
    {!loading && !hasmore && 
            <div className="m-auto p-4">
              <p className="text-center">Woah! You have reached the end</p>
            </div> }
    </div>
    }
    
    
    </>
  );
}

export default MyBlogs;