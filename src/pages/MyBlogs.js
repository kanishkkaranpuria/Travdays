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
      <div className="blog-preview-card non-featured v1 relative pb-20">
        <div className="blog-photos overflow-hidden">
          <img onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className='object-cover h-full w-full cursor-pointer' src={data.image} alt="" />
        </div>
        <div className='p-8 sm:p-1'>
          <div className="flex justify-between items-center">
           {/* <div> */}
           <div>
           <p className='font-semibold sm:text-2xl'>{data.location}</p>
            <p className='font-semibold sm:text-2xl'>{data.created}</p>
           </div>
           <div className="flex space-x-2">
             <p className='font-semibold sm:text-2xl'></p>

            <button className="p-2 px-8  bg-blue-500  sm:mx-auto aumbutton  font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  " ><Link to={{
                pathname : "/myblogs/editblogs", 
                state : {
                  data:[data]
                }
              }} >Edit Blog</Link></button>
            <button className="p-2 px-8  bg-blue-500 font-semibold rounded-lg sm:mx-auto  hover:bg-blue-700 text-white font-bold  " onClick={() => deleteblog(data.id)}>Delete
            </button>
           </div>

            {/* </div> */}
          </div>
          <p onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className='text-4xl font-bold pt-6 cursor-pointer'>{data.title}</p>
          <p onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className='pt-6 leading-tight text-xl cursor-pointer'>{data.body}</p>

        </div>
      </div>
    );
  }

  return (
    <>
    {realLoading && <Loading />}
    {!realLoading &&
    <div className="blog relative pt-[60px] w-full">
      {allblogs && allblogs.map((data, index) => {
        if (allblogs.length === index + 1) {
          return (
            <div ref={lastDataElementRef} className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              {displayingAllBlogs(data, index)}
            </div>
          )
        }
        else {
          return (
            <div className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              {displayingAllBlogs(data, index)}
            </div>
          )
          
        }
      })}
    </div>
    }
    </>
  );
}

export default MyBlogs;