import { useEffect,useState,useRef,useCallback } from "react"
import axios from "axios";
import fullaxios from "./FullAxios";

const FAQ = () => {
    const [Isadmin, setIsadmin] = useState()
    const [answer, setAnswer] = useState({});
    const [faqs, setFaqs] = useState([]);
    const [page, setPage] = useState(1);
    const [pk, setPk] = useState(null);
    const Qref = useRef();
    const [id,setId]= useState();
    const [answerstatus, setAnswerstatus] = useState({})



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
      
      fullaxios({url : 'faq/question?page=' + page})
    //   .get(`faq/question?page=`+ page)
      .then((res)=>{
        if (res){
          setFaqs(prev=>[...prev,...res.data])
          console.log(res.data)
       
      }})
      .catch(err => {
        if (err.response) {
          if (err.response.data.detail === "Invalid page.") {
            setHasMore(false);
          }
        }
       } )
        
    }, [page,hasMore])
   
  
    
    const Delete = (i) => {
        fullaxios({url : 'faq/question?page=' + page})
        //   .get(`faq/question?page=`+ page)
          .then((res)=>{
            if (res){
              setFaqs(prev=>[...prev,...res.data])
              console.log(res.data)
           
          }})
          .catch(err => {
            if (err.response) {
              if (err.response.data.detail === "Invalid page.") {
                setHasMore(false);
              }
            }
           } )
   
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
     

  
     
   

    return ( 
        <div className=' w-[800px] lg:shadow-xl rounded-lg h-[80vh] overflow-y-auto p-6 sm:pt-[60px] '>
                <span className='text-6xl sm:text-xl font-bold sm:p-2 inline-block faq-link'>FAQ</span>
                <div>
                        {faqs && faqs.map((faq,index) => {
                            if(faqs.length=== index+1){
                                return(
                                <div ref={lastDataElementRef} id ={faq.id} className="">
                                
                                {answerstatus[faq.id]
                                
                                ?  <div className='mb-4' >

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}} >

                                        <option className="text-xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question} 
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </span>


                                </div>
                                
                                
                                : <div className='mb-4' >

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}}>

                                        <option className="text-2xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </span>

                                </div> }

                                {/* {console.log(faq.id)} */}
                                
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

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}} >

                                        <option className="text-xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </span>

                                </div>
                                
                                : <div className='mb-4' >

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}}>

                                        <option className="text-2xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        {/* <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span> */}

                                        </span>
                                       {Isadmin && <button >delete</button>}

                                </div> }

                                {/* {console.log(faq.id)} */}
                                
                                {answerstatus[faq.id] && <div>{answer[faq.id]} 

                                {/* placeholder for answers in db */}
                                {/* <p className="leading-tight px-8 pb-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod tempore cum, fuga ea obcaecati porro soluta sit laborum adipisci, iure nihil praesentium consequuntur modi. Porro eius veniam dolorem corrupti! </p> */}

                                </div>}
                                
                                {/* {console.log(answerstatus)} */}
                                {/* {console.log(answer)} */}
                                {/* {answer && <div className="">{answer.answer}</div> } */}

                            </div>
                               )
                           } 
                                
                    } ) 
                }
                </div>

        </div>
     );
}
 
export default FAQ;