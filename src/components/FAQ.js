import { useEffect,useState,useRef,useCallback } from "react"
import axios from "axios";
import { useHistory } from "react-router";
import fullaxios from "./FullAxios";

const FAQ = ({isadmin}) => {
    const [answer, setAnswer] = useState({});
    const [faqs, setFaqs] = useState([]);
    const [page, setPage] = useState(1);
    const [pk, setPk] = useState(null);
    const Qref = useRef();
    const [id,setId]= useState();
    const [answerstatus, setAnswerstatus] = useState({})
    const [deleted, setDeleted] = useState(false)
    const history = useHistory();



    //pagination 
    const observer = useRef()
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    
    const lastDataElementRef = useCallback(node => {
        console.log('last element')
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prev => prev + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])



 useEffect(() => {
   console.log(page)
   console.log(hasMore)
   console.log(!deleted)
   console.log(faqs)
 }, [page,hasMore])
   

    useEffect(() => {
        //   .get(`faq/question?page=`+ page)
      fullaxios({url : 'faq/question?page=' + page})
      .then((res)=>{
        console.log("resresres")
        if (res){
          setFaqs(prev=>[...prev,...res.data])
          console.log(res.data)
          console.log(res)
      }})
      .catch(err => {
        
        if (err.response) {
          if (err.response.data.detail === "Invalid page.") {
            setHasMore(false);
          }
        }
       } )
        
    }, [page])
   
  
    
    const Delete = (id) => {
      console.log(id)
      setLoading(true)
      console.log("delete")

    
      fullaxios({url: 'faq/'+ id , type: 'delete' })
      .then(res => {
        console.log("deleted")
        console.log(res.data)
        setFaqs([])
        setHasMore(true)
        setLoading(false)
        setPage(1)
        })
        .catch(res => {
        })
    }

    const Answers = (i) => {
        // var d = document.getElementById("selected");
        // console.log("thiss")
        // console.log(d)
        
        if (answerstatus[i] === true){
            // console.log('it is true')
            setAnswerstatus((prev)=>({...prev, 
                [i] : false
                }))
        }
        else if(answerstatus[i] === false){
            // console.log('it is false')
            setAnswerstatus((prev)=>({...prev, 
                [i] : true
                }))
        }
        else{
        fullaxios({url : 'faq/answer/' + i})
        // .get(`faq/answer/`+ i)
        .then(res => {
            console.log(res.data)
            if (res){
            setAnswer((prev)=>({...prev,[i] : [res.data.answer]}))
            setAnswerstatus((prev)=>({...prev, [i] : true}))
            // console.log(res.data)
            // console.log("it worked")
          
        }})
        .catch(err => {
            console.log(err)
            // if (res.status === 400)
            //     alert("invalid OTP!!")
        })
        }
    }
    const Test = (faq) => {
       
        setId(faq.id)
    }
     

  
     
   

    return ( <>
    {loading ? <div><p>loading...</p></div> :
        <div className="section">
                  <div className=' w-[800px] sm:w-[100%] mx-auto mt-[5%] p-box-shadow-2 rounded-lg h-[80vh] overflow-y-auto p-6 sm:pt-[60px] bg-[#f5f5f7] '>
                <span className='text-6xl sm:text-xl font-bold sm:p-2 inline-block faq-link'>FAQ</span>
                <div>
                        {faqs && faqs.map((faq,index) => {
                            if(faqs.length=== index+1){
                                return(
                                <div ref={lastDataElementRef} id ={faq.id} className="">
                                
                                {answerstatus[faq.id]
                                
                                ?  <div className='mb-4' >

                                        <p className='cursor-pointer' onClick={()=>{Answers(faq.id)}} >

                                        <option className="text-xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question} 
                                        </option>

                                        </p>
                                        {isadmin &&  <button onClick={()=>{Delete(faq.id)}} className='sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>  }
                                       


                                </div>
                                
                                
                                : <div className='mb-4' >

                                        <p className='cursor-pointer' onClick={()=>{Answers(faq.id)}}>

                                        <option className="text-2xl sm:text-[0.8rem] font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </p>
                                        {isadmin &&  <button onClick={()=>{Delete(faq.id)}} className='sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>  }

                                </div> }

                                {/* {console.log(faq.id)} */}
                                
                                  {/* <button onClick={()=>{Delete(faq.id)}} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button> */}
                                {answerstatus[faq.id] && <div>{answer[faq.id]} 

                                {/* placeholder for answers in db */}
                                {/* <p className="leading-tight px-8 pb-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod tempore cum, fuga ea obcaecati porro soluta sit laborum adipisci, iure nihil praesentium consequuntur modi. Porro eius veniam dolorem corrupti! </p> */}

                                </div>}
                                
                                {/* {console.log(answerstatus)} */}
                                {/* {console.log(answer)} */}
                                {/* {answer && <div className="">{answer.answer}</div> } */}

                            </div>
                                )}
                                else{
                                  return(
                                    <div  id ={faq.id} className="">
                                
                                {answerstatus[faq.id]
                                
                                ?  <div className='mb-4' >

                                        <p className='cursor-pointer' onClick={()=>{Answers(faq.id)}} >
                                        <option className="text-2xl sm:text-[0.8rem] font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </p>
                                        {isadmin &&  <button onClick={()=>{Delete(faq.id)}} className='sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>  }


                                </div>
                                
                                : <div className='mb-4' >

                                        <p className='cursor-pointer' onClick={()=>{Answers(faq.id)}}>

                                        <option className="text-2xl sm:text-[0.8rem] font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </p>
                                        

                                </div> }

                                {/* {console.log(faq.id)} */}
                                
                                {answerstatus[faq.id] && <div className="text-xl sm:text-[0.8rem] font-semibold inline-block" >{answer[faq.id]} 

                                {/* placeholder for answers in db */}
                                {/* <p className="leading-tight px-8 pb-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod tempore cum, fuga ea obcaecati porro soluta sit laborum adipisci, iure nihil praesentium consequuntur modi. Porro eius veniam dolorem corrupti! </p> */}

                                </div>}
                                
                                {/* {console.log(answerstatus)} */}
                                {/* {console.log(answer)} */}
                                {/* {answer && <div className="">{answer.answer}</div> } */}
                                {isadmin &&  <button onClick={()=>{Delete(faq.id)}} className='sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>  }

                            </div>
                               )
                           } 
                                
                    } ) 
                }
                </div>

        </div>
        </div>
        }
        </>

     );
}
 
export default FAQ;