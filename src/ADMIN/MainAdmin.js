import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const MainAdmin = () => {
    const history = useHistory()

    return ( 
        <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                          <p className='text-xl font-semibold  pt-2 '>Welcome admin to your exclusive page :</p>
                              </div>
                      
                          
                      </div>
                      <div className="flex sm:justify-center">
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/addtrips')}}>Add new trips</button> 
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/edittrips')}}>Edit existing trips</button>
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/admcontactus')}}>Contact us list</button>
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/approveblogs')}}>Unapproved blogs</button>
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/addtestimonials')}}>Add testimonials</button>
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/admbooking')}}>Booking list</button>
                      <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold bg-[#00000088]  rounded-md' onClick={() => { history.push('/admfaq')}}>Add faqs</button>
                      
                      </div>
                      </div>
                      

                  </div>

                </div>
     );
}
 
export default MainAdmin;