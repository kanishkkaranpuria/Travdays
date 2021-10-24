import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <navbar className='navbar'>
            <div className="logo">
                logo
            </div>
            <li className="flex w-1/3 justify-around">
                <ul><Link to='/'><h4>Home</h4></Link></ul>
                <ul><Link to='/blogs'><h4>Blogs</h4></Link></ul>
                <ul><Link to='/gallery'><h4>Gallery</h4></Link></ul>
                <ul><Link to='/contactus'><h4>Contact Us</h4></Link></ul>
            </li>
        </navbar>
    );
}

export default Navbar;