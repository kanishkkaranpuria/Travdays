import { useEffect,useState,useRef } from "react"
import axios from "axios";

const FAQ = () => {
    const [answer, setAnswer] = useState();
    const [faqs, setFaqs] = useState();
    const [page, setPage] = useState(1);
    const [pk, setPk] = useState(null);
    const Qref = useRef();
    const [id,setId]= useState();
    let f 

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
    console.log(f)

    const Answers = (i) => {
        // var d = document.getElementById("selected");
        console.log(i);

        console.log("thiss")
        // console.log(d)
    
         
        axios
        .get(`faq/answer/`+ i)
        .then(res => {
            setAnswer(res.data)
            console.log(res.data)
            console.log("it worked")
          
        })
        .catch(res => {
            console.log(res.error)
            // if (res.status === 400)
            //     alert("invalid OTP!!")
        })
    }
    const Test = (faq) => {
       
        setId(faq.id)
    }
     

  
     
   

    return ( 
        <div className="">
                  {faqs && faqs.map((faq,keyName, i) => (
                      <div  id ={faq.id} className="">
                        <option id="selected"  value={faq.id}>{faq.question}</option>
                        {console.log(faq.id)}
                        <button id={i} onClick={(keyName)=>{Answers(keyName)}}>req answer</button>
                        {/* {answer && <div className="">{answer.answer}</div> } */}

                     </div>
                        
            ))}  
        
           
        </div>
     );
}
 
export default FAQ;