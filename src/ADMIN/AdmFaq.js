import { useState,useEffect } from "react";
import fullaxios from "../components/FullAxios";

const AdmFaq = () => {
    const [query, setQuery] = useState();
    const [querytype, setQuerytype] = useState();
    const [mainqueries, setMainqueries] = useState();

    //existiong query types
    useEffect(() => {

        fullaxios({ url: 'query/create' })
            .then(res => {
                if (res) {
                    setMainqueries(res.data);
                }
            })


    }, [])

    //submitt

    // const Submit = (e) => {
    //     e.preventDefault();
    //     console.log("well this works")
    //     fullaxios({
    //         url: 'query/create', type: 'post', data: {
    //             email: email,
    //             name: name,
    //             query: query,
    //             choice: d.value,
    //             phoneNumber: phonenum

    //         }, sendcookie: true
    //     })
    //         .then(res => {
    //             if (res) {
    //                 console.log("it worked")
    //                 history.push('/')
    //             }
    //         })
    //         .catch(res => {
    //             console.log("hello didnt work")
    //         })
    // }

    return (  
        <div className=" section contact-us">
        <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] '  action="">
            <span className='text-3xl sm:text-xl font-bold sm:p-2 inline-block '>Add Query type </span>

            <div className='sm:pb-4'>
            
                 <div className="">
                    <p className='flex items-center'>
                        <span className='w-52'>Add the query type  :</span>
                        <input required type="text" placeholder="Query type" id="name" onChange={(e) => setQuerytype(e.target.value)} />
                        {mainqueries && <select name="val" id="selected">{Object.keys(mainqueries).map((keyName, i) => (
                        <option id={i} value={i + 1}>{mainqueries[keyName]}</option>
                    ))}   </select>}
                    </p>
                   
                </div>
                
            <span className='text-3xl sm:text-xl font-bold sm:p-2 inline-block '>Add faqs </span>
                
            </div>
            The FAQ :
            <textarea placeHolder="query..." name="" id="" cols="70" rows="2" onChange={(e) => setQuery(e.target.value)}></textarea>

            
            The Answer to the querry :
            <textarea placeHolder="query..." name="" id="" cols="70" rows="6" onChange={(e) => setQuery(e.target.value)}></textarea>
            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>

        </form>
    </div>
    );
}
 
export default AdmFaq;