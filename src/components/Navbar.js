import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <navbar>
            <li style = {{display : "flex"}}>
                <ul><Link to='/'><h4>Home</h4></Link></ul>
                <ul><Link to='/blogs'><h4>Blogs</h4></Link></ul>
                <ul><Link to='/gallery'><h4>Gallery</h4></Link></ul>
            </li>
        </navbar>
    );
}

export default Navbar;