import { Link } from "react-router-dom";
import { useEffect } from "react";
import fullaxios from "./FullAxios";

const Navbar = () => {
    useEffect(() => {
        console.log("uerinfo status")
        fullaxios({url : 'userinfo/status' 
        })
        .then(res => {
          if (res){
            console.log(res.data)
        }})
        .catch(err => {
           if (err.response){if (err.response.data.detail === "Invalid page.") {
           }
    
         }})
      
    }, [])
    return (
        <navbar className='navbar backdrop-filter '>
            <nav className="logo text-lg">
                <Link className='p-6' to='/'>TravDays</Link>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
            {/* <Link to='/IndivisualBlogPage'>indi-blog</Link> */}
                <span className='packages btn p-6 flex items-center h-full text-lg font-bold relative'>
                    <Link to='/packagespage'>Packages</Link>
                    <span className='package-list absolute left-0 bottom-[-52px] flex w-max z-[4] invisible pointer-events-none'>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/solo'><h4>Solo</h4></Link>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/pet friendly'><h4>Pet Friendly</h4></Link>
                    <Link  className='bg-[#00000088] px-6 pb-6 rounded-b-[10px] p-box-shadow' to='/trips/workation'><h4>Workation</h4></Link>
                    </span>
                </span>
                <Link className='h-full items-center flex' to='/blogs'>Blogs</Link>
                <Link className='h-full items-center flex' to='/gallery'>Gallery</Link>
                <Link className='h-full items-center flex' to='/contactus'>Contact Us</Link>
                <Link className='h-full items-center flex' to='/faq'>FAQ</Link>
                <Link className='h-full items-center flex' to='/login'>Login</Link>
                <Link className='h-full items-center flex' to='/logout'>Logout</Link>
            </nav>
        </navbar>
    );
}

export default Navbar;