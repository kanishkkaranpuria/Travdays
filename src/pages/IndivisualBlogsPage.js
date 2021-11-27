import { useEffect,useState,useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import fullaxios from "../components/FullAxios";

const IndivisualBlogPage = () => {
    const [page, setPage] = useState(1);
    const [iblogimg, setIblogimg] = useState([])
    const [iblogdata, setIblogdata] = useState()
    const [state, setstate] = useState()
    const [loading, setLoading] = useState()
    const [hasmore, setHasmore] = useState(true)
    const {id} = useParams();
    const {title} = useParams();

    useEffect(() => {
        console.log(id)
        console.log(title)
        if(id){
            fullaxios({url: 'blog/media/' + id })
            .then(res => {
                console.log(res.data)
              setIblogimg(prev=>[...prev,...res.data])
            })
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore(false)
                 setLoading(false)
               }
             }})
        }
    }, [])

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
        console.log(id)
    }
     

    
    useEffect(() => {
        console.log(iblogimg,"img")
        console.log(iblogdata,"data")


        
    }, [iblogdata,iblogimg])
    return ( 
        <div className='section'>

            
            
            {iblogdata && <div className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '></p>
                              </div>
                      
                          
                      </div>
                    
                      <p className='pt-3 leading-tight text-xl'> {Object.keys(iblogdata).map((keyName, i) => {
                          return(
                              <div>
                                  { iblogdata[keyName].slice(-3,)==="par" &&<div id={i} value={i + 1}>{iblogdata[keyName].slice(0,-4)}</div>}
                                  { iblogdata[keyName].slice(-3,)==="img" && <img src= {iblogdata[keyName].slice(0,-4)} alt="" /> }

                              </div>
                          )
                        
                      })} </p>
                      </div>
                      

                  </div>

                </div>   
}
</div>
     );
}
 
export default IndivisualBlogPage;