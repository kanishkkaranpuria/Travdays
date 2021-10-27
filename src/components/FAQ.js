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
        <div className="block p-20">
                  {faqs && faqs.map((faq) => (
                      <div  id ={faq.id} className="">
                        <option id="selected"  value={faq.id}>{faq.question}</option>
                        {/* {console.log(faq.id)} */}
                        {answerstatus[faq.id] ? <button onClick={()=>{Answers(faq.id)}}>hide answer</button> : <button onClick={()=>{Answers(faq.id)}}>req answer</button>}
                        
                        {answerstatus[faq.id] && <div><h3>{answer[faq.id]}</h3></div>}
                        {/* {console.log(answerstatus)} */}
                        {/* {console.log(answer)} */}
                        {/* {answer && <div className="">{answer.answer}</div> } */}

                     </div>
                        
            ))}  
        
        </div>
     );
}
 
export default FAQ;