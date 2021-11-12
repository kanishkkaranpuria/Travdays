import { Link } from "react-router-dom";
import logo from '../pages/images/TravDays_logos/transparent_logo.png'
const hideMenu = ()=>{
    document.getElementById('mobile-menu').style.transform='translateY(-100%)';
    document.getElementById('hide-menu-btn').style.display='none';
    document.getElementById('show-menu-btn').style.display='flex';
}

const MobileMenu = () => {
    return ( 
        <div onClick={hideMenu} id="mobile-menu" className="flex flex-col text-white bg-black fixed top-0 z-[4] w-[100vw] h-[100vh] opacity-90">
        
            <nav className="flex flex-col w-full h-full items-center justify-center">
                <Link className='p-6 text-3xl' to='/'>TravDays</Link>
                {/* <Link className='p-4 text-xl' to='/IndivisualBlogPage'>indi-blog</Link> */}
                <Link className='p-4 text-xl' to='/trips/solo'>packages</Link>
                <Link className='p-4 text-xl' to='/blogs'>Blogs</Link>
                <Link className='p-4 text-xl' to='/gallery'>Gallery</Link>
                <Link className='p-4 text-xl' to='/contactus'>Contact Us</Link>
                <Link className='p-4 text-xl' to='/faq'>FAQ</Link>
            </nav>
        </div>
     );
}
 
export default MobileMenu;