import { useState,useEffect } from "react";
import fullaxios from "../components/FullAxios";

const AdmFaq = () => {
    const [query, setQuery] = useState();
    const [querytype, setQuerytype] = useState();
    const [answer, setAnswer] = useState();
    const [mainqueries, setMainqueries] = useState();

    //existiong query types
    useEffect(() => {

            fullaxios({
                url: 'faq/'  })
                .then(res => {
                    console.log(res.data)
                    if (res) {
                        console.log("it worked")
                    }
                })
                .catch(res => {
                    console.log("hello didnt work")
                })    


    }, [])

    //submitt

    const Submit = (e) => {
        e.preventDefault();
        fullaxios({
            url: 'faq/' ,type:'post' , data:{
                question: query,
                answer: answer

            } })
            .then(res => {
                console.log(res.data)
                if (res) {
                    console.log("it worked")
                }
            })
            .catch(res => {
                console.log("hello didnt work")
            })    
    }

    return (  
        <div className=" section contact-us">
        <form className='flex flex-col mx-auto max-w-[800px] p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] ' onSubmit={Submit} action="">
            {/* <span className='text-3xl sm:text-xl font-bold sm:p-2 inline-block '>Add Query type </span> */}

            <div className='sm:pb-4'>
            
                 {/* <div className="">
                    <p className='flex items-center'>
                        <span className='w-52'>Add the query type  :</span>
                        <input required type="text" placeholder="Query type" id="name" onChange={(e) => setQuerytype(e.target.value)} />
                        {mainqueries && <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
                        <option id={i} value={i + 1}>{mainqueries[keyName]}</option>
                    ))}   </select>}
                    </p>
                   
                </div> */}
                
            <span className='text-3xl sm:text-xl font-bold sm:p-2 inline-block '>Add faqs </span>
                
            </div>
            The FAQ :
            <textarea required placeHolder="query..." name="" id="" cols="70" rows="2" onChange={(e) => setQuery(e.target.value)}></textarea>

            
            The Answer to the querry :
            <textarea required placeHolder="query..." name="" id="" cols="70" rows="6" onChange={(e) => setAnswer(e.target.value)}></textarea>
            <button  className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>

        </form>
    </div>
    );
}
 
export default AdmFaq;