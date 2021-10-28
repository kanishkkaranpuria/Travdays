import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <navbar className='navbar'>
            <nav className="logo text-lg">
                <Link className='p-6' to='/'>TravDays</Link>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
                <span className='packages btn p-6 flex items-center h-full text-lg font-bold relative'>
                    <Link to='/AllTripsPage'>packages</Link>
                    <span className='package-list absolute left-0 bottom-[-52px] flex w-max z-[4] invisible pointer-events-none'>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px]' to='/trips/solo'><h4>Solo</h4></Link>
                    <Link className='bg-[#00000088] px-6 pb-6 rounded-b-[10px]' to='/trips/pet friendly'><h4>Pet Friendly</h4></Link>
                    <Link  className='bg-[#00000088] px-6 pb-6 rounded-b-[10px]' to='/trips/workation'><h4>Workation</h4></Link>
                    </span>
                </span>
                <Link className='h-full items-center flex' to='/blogs'>Blogs</Link>
                <Link className='h-full items-center flex' to='/gallery'>Gallery</Link>
                <Link className='h-full items-center flex' to='/contactus'>Contact Us</Link>
                <Link className='h-full items-center flex' to='/faq'>FAQ</Link>
            </nav>
        </navbar>
    );
}

export default Navbar;