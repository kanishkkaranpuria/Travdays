import fullaxios from "../components/FullAxios"
import { useState,useEffect } from "react"
import { useHistory } from "react-router";

const Profilepage = () => {
    const [testimonial, setTestimonial] = useState()
    const [name, setName] = useState(null)
    const [email,setEmail]= useState(null)
    const [datas, setDatas] = useState(null)
    const [namechange, setNamechange] = useState(false)
    const [imagepreview, setImagepreview] = useState()
    const [predefinedemail, setPredefinedemail] = useState(null)
    const [predefinedname, setPredefinedname] = useState(null)

    
    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                if (res) {
                    setPredefinedname(res.data.name)
                    setPredefinedemail(res.data.email)
                    setName(predefinedname)
                    setEmail(predefinedemail)
                }
            })
            .catch(res => {
                console.log("hello didnt work")
                // if (res.status === 400)
                //     alert("invalid OTP!!")
            })
    }, [])

    const Submit = (e) => {
        e.preventDefault();
        setNamechange(true)

        fullaxios({
            url: 'query/create', type: 'post', data: {    
                name: name,
            }, sendcookie: true
        })
            .then(res => {
                if (res) {
                    console.log("it worked")
                    // history.push('/')
                }
            })
            .catch(res => {
                console.log("hello didnt work")
                // if (res.status === 400)
                //     alert("invalid OTP!!")
            })

    }

    const Goback = (e) => {
        e.preventDefault();
        setNamechange(false)
    }

    useEffect(() => {
        console.log(namechange)
      
    }, [namechange])
     


    const Imagechangehandler = (e) => {
        // e.preventDefault();
        // setNewimages(e.target.files)
        console.log(e.target.files )
        const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
        // setImagepreview((prevImages)=>prevImages.concat(fileArray))
        // console.log("has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        setImagepreview(fileArray[0])
        console.log(fileArray)
        // setImagepreview((prevImage)
        

      
    }



        
    
    
        return (
            <div className=" section contact-us">
                 {namechange?  
                <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] ' action="">
                    <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Profile page</span>
    
                    <div className='sm:pb-4'>
                        <div className="">
                        <p className='flex items-center'>
                            <span className='w-52'>Enter your name :</span>
                                <input required type="text" placeholder="Name"defaultValue="" onChange={(e) => setName(e.target.value)}/>
                        </p>
                     </div>
        
                    </div>
                    <p className='flex items-center'>
                    <button onClick={(e)=>{Goback(e)}}  className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Go back to profile</button>

    
                    <button  className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
                     </p>
                </form>
                :
                 <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] ' action="">
                 <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Profile page</span>
 
                 <div className='sm:pb-4'>
                     <div className="">
                     <p className='flex items-center'>
                         <span className='w-52'>Enter your name :</span>
                         {predefinedname}
                      </p>
                     <p className='flex items-center'>
                         <span className='w-52'>Enter your email :</span>
                        {predefinedemail}
                     </p>
                </div>
               </div>
 
 
                 <p className='flex items-center p-4'>
                 <button onClick={(e)=>{Submit(e)}}  className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Change name</button>

                 <button  className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Bookings</button>
 
                  </p>
             </form>}

        </div>
        );
    }
    
   
export default Profilepage;