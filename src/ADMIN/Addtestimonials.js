import { useState } from "react";

const Addtestimonials = () => {

    const [testimonial, setTestimonial] = useState()
    const [name, setName] = useState(null)
    const [email,setEmail]= useState(null)
    const [datas, setDatas] = useState(null)
    const [imagepreview, setImagepreview] = useState()

    const Imagechangehandler = (e) => {
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
        <form className='flex flex-col mx-auto max-w-[800px] p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] '  action="">
            <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Testimonial Page</span>
        <span className="bg-blue-500 p-2">
        <input type="file"  style={{display:'none'}} name ="file" id="file" onChange={Imagechangehandler}  />
                                        <label htmlFor="file">
                                            <i className="materail-icon">ADD IMAGE</i>
                                        </label>
        </span>
            <p className='flex items-center'> 
                <img src={imagepreview} alt=""  />                          
            </p>

            <div className='sm:pb-4'>
            
                 <div className="">
                    <p className='flex items-center'>
                        <span className='w-52'>Enter the name :</span>
                            <input required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </p>
                    <p className='flex items-center'>
                        <span className='w-52'>Enter your email :</span>
                            <input required type="email" placeholder="Email" id="name" onChange={(e) => setEmail(e.target.value)} />
                    </p>
                </div>
                
               
            </div>

            enter the Testimonial :
            <textarea placeHolder="query..." name="" id="" cols="70" rows="6" onChange={(e) => setTestimonial(e.target.value)}></textarea>
            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>



        </form>
    </div>
     );
}
 
export default Addtestimonials;