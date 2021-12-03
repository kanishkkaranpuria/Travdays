import { useState ,useEffect, useRef, useCallback,} from "react";
import { useHistory } from "react-router";
import WriteABlog from "../components/WriteABlog";
import axios from "axios";
import fullaxios from "../components/FullAxios";
import { Link } from "react-router-dom";

const Blogs = ({id,setId}) => {
  const history = useHistory()
  const [sortlink, setSortlink] = useState("votefilter")
  const [loading, setLoading] = useState(false)
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
      fullaxios({url : 'blog/featured?page=' + fpage})
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
        <img onClick ={()=>{history.push("blogs/write")}}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png"/>
        {/* <img onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png"/> */}
      
        {/* {sortlink==="created" &&  <button onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' ><p> Sort by </p> <p> Most liked </p> </button>}
        {sortlink==="votefilter" &&  <button onClick ={Sorted}className='fixed bottom-16 right-16 sm:right-2 sm:bottom-8 z-[1] cursor-pointer' > <p> Sort by </p> Latest</button>} */}

        {/* <WriteABlog/> */}
        <p className='text-5xl sm:text-2xl font-bold p-4'>Featured Blogs</p>
        <div className="featured-blogs flex overflow-x-auto gap-x-8 sm:gap-x-2 p-4">
          {featured && featured.map((data,index) =>{
            if(featured.length===index+1){
              return(
                <div ref={lastDataElementRef} className="blog-preview-card featured relative">
                  <div className='gradient'></div>
              <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                  <div className='p-8 sm:p-2 absolute bottom-0 text-white'>
                      <p onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-3xl sm:text-xl'>{data.title}</p>
                      <p className='flex text-2xl items-center text-center '><span>{data.location}</span>
                      </p>
                  </div>
                  <img className='w-full h-full top-0 object-cover bg' src={data.image} alt=""/>
                  {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
              </div>
              );
            }
            else{
              return(
                <div  className="blog-preview-card featured relative">
                  <div className='gradient'></div>
              <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                  <div className='p-8 sm:p-2 absolute bottom-0 text-white'>
                      <p onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-3xl sm:text-xl'>{data.title}</p>
                      <p className='flex text-2xl items-center text-center '><span>{data.location}</span>
                      </p>
                  </div>
                  <img className='w-full h-full top-0 object-cover bg' src={data.image} alt=""/>
                  {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
              </div>
              );
            }
           
          }
         )}
           
        </div>

{/* ***********************************************   unfeatured blogs  */}
        {/* <p className='text-5xl font-bold p-4'>Blogs</p> */}

        {allblogs && allblogs.map((data,index)=> {
          if(allblogs.length === index+1){
            return(
              <div ref={lastDataElementRef2}  className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center">
        <div className="blog-preview-card non-featured v1 relative cursor-pointer" onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}}>

              {/* <div ref={lastDataElementRef2} className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center">
        <div className="blog-preview-card non-featured v1 relative"> */}
        
                <div className="blog-photos overflow-hidden">
                    <img className='object-cover h-full w-full' src={data.image} alt=""/>
                </div>
                <div className='sm:flex sm:w-full sm:flex-col p-8 sm:p-1'>
                    <div className="flex sm:flex-col justify-between items-center">
                    <p className='font-semibold sm:text-2xl'>{data.location}</p>
                    <p className='font-semibold sm:text-2xl'>{data.created}</p>
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
                <p onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
                <p className='flex w-full pt-6 leading-tight text-xl'>{data.body}</p>

                {/* <p className='text-4xl font-bold pt-6'>{data.title}</p>
                <p className='flex w-full pt-6 leading-tight text-xl'>{data.body}</p> */}

                </div>
            </div>
          </div>
            )
          }
          else{
            return(
              <div className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card non-featured v1 relative cursor-pointer" onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}}>

              {/* <div  className="max-w-[1440px] sm:max-w-[380px] mx-auto sm:px-2 px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card non-featured v1 relative"> */}
                      <div className="blog-photos overflow-hidden">
                          <img className='object-cover h-full w-full' src={data.image} alt=""/>
                      </div>
                      <div className='p-8 sm:p-1'>
                          <div className="flex sm:flex-col sm:items-start justify-between items-center">
                          <p className='font-semibold sm:text-2xl'>{data.location}</p>
                          <p className='font-semibold sm:text-2xl'>{data.created}</p>
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
                      <p  onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-4xl break-all whitespace-normal overflow-ellipsis font-bold pt-6'>{data.title}</p>
                      <p className='pt-6 overflow-hidden h-[150px] break-all whitespace-normal overflow-ellipsis leading-tight text-xl'>{data.body}</p>

                      {/* <p  className='text-4xl break-all whitespace-normal overflow-ellipsis font-bold pt-6'>{data.title}</p>
                      <p className='pt-6 overflow-hidden h-[150px] break-all whitespace-normal overflow-ellipsis leading-tight text-xl'>{data.body}</p> */}
                      </div>
                  </div>
                </div>
            )

          }
        })}
            
        </div>
    );
}
 
export default Blogs;