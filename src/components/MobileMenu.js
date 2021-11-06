import { Link } from "react-router-dom";

const hideMenu = ()=>{
    document.getElementById('mobile-menu').style.display='none'
}

const MobileMenu = () => {
    return ( 
        <div onClick={hideMenu} id="mobile-menu" className=" hidden flex-col text-white bg-black fixed top-0 z-[6] w-[100vw] h-[100vh] opacity-90">
        <div className='absolute p-4 right-0 bg-white rounded-bl-lg opacity-80'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        
            <nav className="flex flex-col w-full h-full items-center justify-center">
                <Link className='p-6 text-3xl' to='/'>TravDays</Link>
                <Link className='p-4 text-xl' to='/IndivisualBlogPage'>indi-blog</Link>
                <Link className='p-4 text-xl' to='/AllTripsPage'>packages</Link>
                <Link className='p-4 text-xl' to='/blogs'>Blogs</Link>
                <Link className='p-4 text-xl' to='/gallery'>Gallery</Link>
                <Link className='p-4 text-xl' to='/contactus'>Contact Us</Link>
                <Link className='p-4 text-xl' to='/faq'>FAQ</Link>
            </nav>
        </div>
     );
}
 
export default MobileMenu;