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
      //for blogs approval
      const [featured, setFeatured] = useState(false)
      const [approved, setApproved] = useState(false)
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
    
      //Approvee

      const Approve = (data,approval) => {
          console.log(data)
          console.log(approval)

          
        

          if(approval){

            fullaxios({url : 'blog/create' ,type:'patch' ,data : {
                id : id,
                // featured : featured,
                approved : approval,
            }, })
            .then(res => {  
              console.log(res) 
            })
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore2(false)
               }
        
             }})
          }
          else if (!approval){
            fullaxios({url : 'blog/create' ,type:'patch' ,data : {
                id : id,
                // featured : featured,
                approved : approval,
            }, })
            .then(res => {
              if (res){
              setAllblogs(prev=>[...prev,...res.data])
            }})
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore2(false)
               }
        
             }})
          }
          

      }



      //Featuredd


      const Feature = (data,feature) => {

        
        if(feature){

            fullaxios({url : 'blog/create' ,type:'patch' ,data : {
                id : id,
                featured : feature,
                approved : feature,
            }, })
            .then(res => {
              if (res){
              setAllblogs(prev=>[...prev,...res.data])
            }})
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore2(false)
               }
        
             }})
          }
          else if (!feature){
            fullaxios({url : 'blog/create' ,type:'patch' ,data : {
                id : id,
                featured : feature,
                approved : feature ,
            }, })
            .then(res => {
              if (res){
              setAllblogs(prev=>[...prev,...res.data])
            }})
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore2(false)
               }
        
             }})
          }
          

      }
    

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
                          <div className="flex justify-between items-center">
                          <p onClick={()=>{history.push('/blogs/'+ data.title);ID(data.id)}} className='text-4xl font-bold pt-6'>{data.title}</p>
                          <button onClick={(()=>{Approve(data,true);ID(data.id)})} style={{border:"solid",backgroundColor:"red"}}>approve</button>
                          <button onClick={(()=>{Feature(data,true);ID(data.id)})} style={{border:"solid",backgroundColor:"white"}} > Feature the blog </button>
                          </div>
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