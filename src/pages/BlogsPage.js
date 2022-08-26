import { useState, useEffect, useRef, useCallback, } from "react";
import { useHistory } from "react-router";
import WriteABlog from "../components/WriteABlog";
import axios from "axios";
import fullaxios from "../components/FullAxios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import UndefinedError from "../components/FetchErrorHandling/UndefinedError";

const Blogs = ({ id, setId }) => {

  const [error, setError] = useState(false)
  const [realLoading, setRealLoading] = useState(true)
  const history = useHistory()
  const [sortlink, setSortlink] = useState("votefilter")
  const [loading, setLoading] = useState(false)
  const [paginationLoading1, setPaginationLoading1] = useState(false)
  const [paginationLoading2, setPaginationLoading2] = useState(false)
  let blogsort
  const Sorted = (random) => {
    if(sortlink==="votefilter" && random==="votefilter" ){
    }
    else if(sortlink==="created" &&random==="created"){
    }
    else{
      setAllblogs([])
      setBlogpage(1)
      setHasmore2(true)

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
    setPaginationLoading1(true)
    fullaxios({ url: 'blog/' + sortlink + '?page=' + blogpage })
      .then(res => {
        if (res) {
          setAllblogs(prev => [...prev, ...res.data])
          setPaginationLoading1(false)
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.detail === "Invalid page.") {
            setHasmore2(false)
            setPaginationLoading1(false)
          }
          else {
            setPaginationLoading1(false)
            setError(true)
          }
        }
      })
    setLoading(false)
  }, [blogpage, sortlink])


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
    setPaginationLoading2(true)
    fullaxios({ url: 'blog/featured?page=' + fpage })
      .then(res => {
        if (res) {
          setRealLoading(false)
          setPaginationLoading2(false)
          setFeatured(prev => [...prev, ...res.data])
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.detail === "Invalid page.") {
            setHasmore(false)
            setPaginationLoading2(false)
            setLoading(false)
          }
          else {
            setRealLoading(false)
            setPaginationLoading2(false)
            setError(true)
          }

        }
      })
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



  }, [featured, blogpage, sortlink])


  const showUnfeaturedBlogs = (data, index) => {
    return (
      <div className="blog-preview-card non-featured v1 relative cursor-pointer aumnormalblog2" onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }}>

        {/* <div  className="">
              <div className="blog-preview-card non-featured v1 relative"> */}
        <div className="blog-photos overflow-hidden">
          <img className='object-cover h-full w-full' src={data.image} alt="" />
        </div>
        <div className='p-8 sm:p-1 aumnormalblog2 '>
          <div className="flex sm:flex-col sm:items-start justify-between items-center ">
            <div className="sm:flex sm:w-full sm:justify-between">
            <p className='font-semibold '>{data.location}</p>
            <p className='font-semibold '>{data.created}</p>
            </div>
          
            {/* <p className='flex text-2xl items-center h-6'>x.x 
                          <span className='flex h-6'>
                    
                          
                          <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                          <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                          <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                          <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                          <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                          </span>
                      </p> */}
          </div>
          <p onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className='text-4xl sm:text-2xl break-all whitespace-normal overflow-ellipsis font-bold pt-6'>{data.title}</p>
          <p className='pt-6 overflow-hidden h-[150px] break-all whitespace-normal overflow-ellipsis leading-tight text-xl sm:text-xs'>{data.body}</p>

          {/* <p  className='text-4xl break-all whitespace-normal overflow-ellipsis font-bold pt-6'>{data.title}</p>
                      <p className='pt-6 overflow-hidden h-[150px] break-all whitespace-normal overflow-ellipsis leading-tight text-xl'>{data.body}</p> */}
        </div>
      </div>
    )
  }

  const showFeaturedBlogs = (data, index) => {
    return (
      <>
        <div className='gradient'></div>
        <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png" />
        <div className='p-8 sm:p-2 absolute bottom-0 text-white'>
          <p onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} className='text-3xl sm:text-xl cursor-pointer'>{data.title}</p>
          <p className='flex text-2xl items-center text-center '><span>{data.location}</span>
          </p>
        </div>
        <img className='w-full h-full top-0 object-cover bg' src={data.image} alt="" />
        {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
      </>
    )
  }





  return (
    <>
      {realLoading && <Loading />}
      {!realLoading && error && <UndefinedError />}
      {!realLoading && !error &&
        <div className="blog relative pt-[30px] w-full">
          <img onClick={() => { history.push("blogs/write") }} className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png" />
          {/* <img onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png"/> */}

          {/* {sortlink==="created" &&  <button onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' ><p> Sort by </p> <p> Most liked </p> </button>}
        {sortlink==="votefilter" &&  <button onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' > <p> Sort by </p> Latest</button>} */}

          {/* <WriteABlog/> */}
          <p className='text-5xl sm:text-2xl font-bold p-4'>Featured Blogs</p>
          <div className="featured-blogs flex overflow-x-auto gap-x-8 sm:gap-x-2 p-4">
            {featured && featured.map((data, index) => {
              if (featured.length === index + 1) {
                return (
                  <div ref={lastDataElementRef} className="blog-preview-card featured relative cursor-pointer aumfeaturedblog" onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }}>
                    {showFeaturedBlogs(data, index)}
                  </div>
                );
              }
              else {
                return (
                  <div className="blog-preview-card featured relative cursor-pointer aumfeaturedblog" onClick={() => { history.push('/blogs/' + data.title + '/' + data.id) }} >
                    {showFeaturedBlogs(data, index)}
                  </div>
                );
              }

            }
            )}
            {paginationLoading2 &&
            <div className="p-4 m-auto">
              <div className="m-auto" data-visualcompletion="loading-state" style={{ height: '32px', width: '32px' }}>
                <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
                </svg>
              </div>
            </div>
            }
          </div>

          {/* ***********************************************   unfeatured blogs  */}
          {/* <p className='text-5xl font-bold p-4'>Blogs</p> */}

        <div className='flex mt-[50px] lg:ml-[100px] sm:ml-[30px] sm:pb-4'>
          <p className=' text-xl font-bold mt-1'> Sort by- </p>
          <button className=' p-3 w-100 h-8 flex items-center justifycenter bg-green-500 left-margin-2 font-semibold rounded-lg hover:bg-green-800 text-white m-1 font-bold ' onClick={()=>{Sorted("votefilter"); setSortlink('votefilter') }} >Vote</button>
          <button className=' p-3 w-100 h-8 flex items-center justifycenter bg-green-500 left-margin-2 font-semibold rounded-lg hover:bg-green-800 text-white m-1 font-bold ' onClick={()=>{Sorted("created"); setSortlink('created')    }} >New</button>
        </div>


          {allblogs && allblogs.map((data, index) => {
            if (allblogs.length === index + 1) {
              return (
                <div ref={lastDataElementRef2} className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center  ">
                  {showUnfeaturedBlogs(data, index)}
                </div>

              )
            }
            else {
              return (
                <div className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center ">
                  {showUnfeaturedBlogs(data, index)}
                </div>
              )

            }
          })}
          {paginationLoading1 && 
          
          <div className="p-4 m-auto">
          <div className="m-auto" data-visualcompletion="loading-state" style={{ height: '32px', width: '32px' }}>
            <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
            </svg>
          </div>
        </div>
        }
        {!paginationLoading1 && !hasmore2 && 
            <div className="m-auto p-4">
              <p className="text-center">Woah! You have reached the end</p>
            </div> }
        </div>
      }
    </>
  );
}

export default Blogs;