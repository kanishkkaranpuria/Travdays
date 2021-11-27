import { Link } from "react-router-dom";

const MainAdmin = () => {
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
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/addtrips'>Add new trips</Link> 
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/edittrips'>Edit existing trips</Link>
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/admcontactus'>Contact us list</Link>
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/approveblogs'>Unapproved blogs</Link>
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/addtestimonials'>Add testimonials</Link>
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/admbooking'>Booking list</Link>
                      <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/admfaq'>Add faqs</Link>
                      
                      </div>
                      </div>
                      

                  </div>

                </div>
     );
}
 
export default MainAdmin;