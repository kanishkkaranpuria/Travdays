import { useEffect,useState,useRef } from "react"
import axios from "axios";

const FAQ = () => {
    const [answer, setAnswer] = useState({});
    const [faqs, setFaqs] = useState();
    const [page, setPage] = useState(1);
    const [pk, setPk] = useState(null);
    const Qref = useRef();
    const [id,setId]= useState();
    const [answerstatus, setAnswerstatus] = useState({})
    useEffect(() => {
      
      axios
      .get(`faq/question?page=`+ page)
      .then((res)=>{
          setFaqs(res.data)
          console.log(res.data)
      })
      
        
    }, [])
   
  
    
    // const Selected = () => {
        
    //    console.log("heelo")
    //    axios
    //    .get(`http://127.0.0.1:8000/faq/answer/`+ 
    //    .then(res => {
    //        setAnswer(res.data)
    //        console.log(res.data)
    //        console.log("it worked")
         
    //    })
    //    .catch(res => {
    //        console.log(res.error)
    //        // if (res.status === 400)
    //        //     alert("invalid OTP!!")
    //    })
    // }
    // console.log(f)

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
        axios
        .get(`faq/answer/`+ i)
        .then(res => {
            setAnswer((prev)=>({...prev,
                [i] : [res.data.answer]
            }))
            setAnswerstatus((prev)=>({...prev, 
            [i] : true
            }))
            // console.log(res.data)
            // console.log("it worked")
          
        })
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
        <div className='section max-w-[1000px] p-box-shadow '>

                <div>
                        {faqs && faqs.map((faq) => (
                            <div  id ={faq.id} className="">
                                
                                {answerstatus[faq.id]
                                
                                ?  <div className='mb-4' >

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}} >

                                        <option className="text-2xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span>

                                        </span>

                                </div>
                                
                                : <div className='mb-4' >

                                        <span className='cursor-pointer' onClick={()=>{Answers(faq.id)}}>

                                        <option className="text-2xl font-semibold inline-block" id="selected"  value={faq.id}>{faq.question}
                                        </option>

                                            {/* placeholder for questions in database */}
                                        <span className='font-semibold'> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</span>

                                        </span>

                                </div> }

                                {/* {console.log(faq.id)} */}
                                
                                {answerstatus[faq.id] && <div>{answer[faq.id]} 

                                {/* placeholder for answers in db */}
                                <p className="leading-tight px-8 pb-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod tempore cum, fuga ea obcaecati porro soluta sit laborum adipisci, iure nihil praesentium consequuntur modi. Porro eius veniam dolorem corrupti! </p>

                                </div>}
                                
                                {/* {console.log(answerstatus)} */}
                                {/* {console.log(answer)} */}
                                {/* {answer && <div className="">{answer.answer}</div> } */}

                            </div>
                                
                    ))}  
                
                </div>

        </div>
     );
}
 
export default FAQ;