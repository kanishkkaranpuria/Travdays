import { useState ,useEffect, useRef, useCallback,} from "react";
import { useHistory } from "react-router";
import WriteABlog from "../components/WriteABlog";
import axios from "axios";
import fullaxios from "../components/FullAxios";
import { Link } from "react-router-dom";

const MyBlogs = ({id,setId}) => {

  const history = useHistory()
  const observer = useRef()
  const [allblogs, setAllblogs] = useState([])
  const [blogpage, setBlogpage] = useState(1)
  const [hasmore, setHasmore] = useState(true)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    console.log("useeffect")
    setLoading(true)
    
    fullaxios({url : 'blog/userblogs' +'?page='+ blogpage})
    .then(res => {
      if (res){
      setAllblogs(prev=>[...prev,...res.data])
      console.log(res.data)
    }})
    .catch(err => {
       if (err.response){if (err.response.data.detail === "Invalid page.") {
         setHasmore(false)
       }

     }})
     setLoading(false)
}, [blogpage])

  
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
    

const deleteblog = (id) =>{
    // window.confirm("Permanently Delete Blog?");
    if (window.confirm("Press a button!")) {
        fullaxios({url: 'blog/delete/' + id, type: 'delete'})
            .then(res => {
                console.log(res)
                setAllblogs([])
                setBlogpage(1)
                setHasmore(true)
                setLoading(true)
            })
      } else {
        console.log("You pressed Cancel!")
      }
}

    return (
        <div className="blog relative pt-[60px] w-full">

        {allblogs && allblogs.map((data,index)=> {
          if(allblogs.length === index+1){
            return(
              <div ref={lastDataElementRef} className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
        <div className="blog-preview-card non-featured v1 relative">
                <div className="blog-photos overflow-hidden">
                    <img className='object-cover h-full w-full' src={data.image} alt=""/>
                </div>
                <div className='p-8 sm:p-1'>
                    <div className="flex justify-between items-center">
                    <p className='font-semibold sm:text-2xl'>{data.location}</p>
                    <p className='font-semibold sm:text-2xl'>{data.created}</p>
                <p className='flex text-2xl items-center h-6' onClick = {() =>deleteblog(data.id)}>Delete
                    <span className='flex h-6'>
              
                    
                    </span>
                </p>
                </div>
                <p onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
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
                      <p className='flex text-2xl items-center h-6' onClick = {() => deleteblog(data.id)}> Delete
                          <span className='flex h-6'>
                    
                          
                          </span>
                      </p>
                      </div>
                      <p  onClick={()=>{history.push('/blogs/'+ data.title +'/'+ data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
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
 
export default MyBlogs;