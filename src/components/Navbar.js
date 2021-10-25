import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <navbar className='navbar'>
            <nav className="logo text-lg">
                <Link to='/'><h4>TravDays</h4></Link>
            </nav>
            <nav className="flex w-1/3 justify-around">
                <Link to='/blogs'><h4>Blogs</h4></Link>
                <Link to='/gallery'><h4>Gallery</h4></Link>
                <Link to='/contactus'><h4>Contact Us</h4></Link>
                <Link to='/faq'><h4>FAQ</h4></Link>
            </nav>
        </navbar>
    );
}

export default Navbar;