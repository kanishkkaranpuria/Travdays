import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";
import { black } from "tailwindcss/colors";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import Logoutmodal from "./Logoutmodal";

const Navbar = ({  namechanged ,isauthenticated, setIsadmin, setIsauthenticated }) => {

    // const activeNavbarStyle = {fontWeight: "500", backgroundColor : "#00000033"};
    const history = useHistory();
    const [profiledata, setProfiledata] = useState([])
    const [igotdata, setIgotdata] = useState(false);
//modallll
const [isopen, setIsopen] = useState(false);


    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                    setProfiledata(res.data)
                    setIgotdata(true)
            })
            .catch(res => {
                console.log(res)
            })
    }, [isauthenticated,namechanged])


    let lastScroll = 0
    let location = useLocation();

    useEffect(() => {
        let navbartTrigger = document.getElementById('triggerElement')
        let navbar = document.getElementById('navbar')

        const navLen = navbar.getBoundingClientRect().bottom

        const scrollFunction = function () {
            
            if (window.scrollY + navLen> window.pageYOffset + navbartTrigger.getBoundingClientRect().top) {
                // console.log("DArk navbar")
                console.log(navLen)
                navbar.style.transform = 'translateY(-100%)'
                let newScroll = window.scrollY
                if (newScroll < lastScroll) {
                    console.log(navLen)
                    navbar.style.backgroundColor = '#046C6D'
                    navbar.style.transform = 'translateY(0%)'
                }
                lastScroll = newScroll
            }
            else if (window.scrollY + navLen< window.pageYOffset + navbartTrigger.getBoundingClientRect().top) {
                // console.log("Light navbar")
                navbar.style.transform = 'translateY(0%)'
                navbar.style.backgroundColor = '#00000000'
            }
        }
        console.log("location", location.pathname)
        if (location.pathname === '/') {
            if (navLen <= navbar.getBoundingClientRect().top <=0) {
                navbar.style.backgroundColor = '#00000000'
            }
            window.addEventListener('scroll', scrollFunction)
            console.log("added scroll")
        } else {
            console.log("else ran not homepage")
            navbar.style.backgroundColor = '#046C6D'
            navbar.style.transform = 'translateY(0%)'
            window.removeEventListener('scroll', scrollFunction);
        }
        return () => window.removeEventListener("scroll", scrollFunction)
    }, [location])



    
   


    const logout = () => {
        console.log("logout")
        fullaxios({ url: 'auth/logout', sendcookie: true })
            .then(res => {
                //("here",res.data)
                setIsopen(true)
                setIsadmin(false)
                setIgotdata(false)
                setProfiledata([])
                setIsauthenticated(false)
                // Cookie('setCookie',"accesstoken",0,-1)
                Cookie('setCookie', "csrftoken", 0, -1)
                Cookie('setCookie', "sessionid", 0, -1)
                history.push('/login')
            })
            .catch(err => {
                //(err.data)
            })
    }

    return (
        <navbar id='navbar' className='navbar backdrop-filter bg-[#046C6D]' >
            <nav className="logo text-2xl tracking-[5px]">
                <NavLink className='p-6 font-bold' to='/'>TravDays</NavLink>
            </nav>
            <nav className="flex w-2/3 h-full items-center justify-around">
                {/* <NavLink to='/IndivisualBlogPage'>indi-blog</NavLink> */}
                <span className='packages2 btn2 flex items-center h-full text-lg relative'>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/trips'  >Packages</NavLink>
                    <span className='package-list2 absolute left-0 bottom-[-155px] flex flex-col w-max z-[4] invisible pointer-events-none'>
                    <NavLink className=' relative top-[-15px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/trips/workation'><h4>Workation</h4></NavLink>
                    <NavLink className=' relative top-[-30px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/trips/solo'><h4>Solo Travel</h4></NavLink>
                    <NavLink className='relative top-[-45px] bg-[#046C6D] px-6 pb-3 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/trips/pet friendly'><h4>Pet Friendly</h4></NavLink>
                    </span>
                </span >
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/blogs' >Blogs</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/gallery' >Gallery</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/contactus' >Contact Us</NavLink>
                <NavLink className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/faq' >FAQ</NavLink>

                {isauthenticated && igotdata ? <>
                    <span className='packages btn flex items-center h-full text-lg relative'>
                        <span className='items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus cursor-pointer' to='/profilepage' >Hello {profiledata.navbarname}</span>
                        <span className='package-list absolute left-0 bottom-[-245px] flex flex-col w-max z-[4] invisible pointer-events-none'>
                            <NavLink className='bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr ' to='/changename'><h4>Change Name</h4></NavLink>
                            <NavLink className=' relative top-[-15px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/bookings'><h4>Bookings</h4></NavLink>
                            <NavLink className=' relative top-[-30px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/resetpassword'><h4>Reset password</h4></NavLink>
                            <NavLink className='relative top-[-45px] bg-[#046C6D] px-6 pb-6 rounded-b-[10px] p-box-shadow-2  navhoverrrr' to='/myblogs'><h4> My Blogs</h4></NavLink>
                            <p className='relative top-[-60px] bg-[#046C6D] px-6 pb-3 rounded-b-[10px] p-box-shadow-2 cursor-pointer  navhoverrrr' onClick={logout} ><h4>Logout</h4></p>
                        </span>
                    </span>
                   </> :
                    <NavLink className=' items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='/login' >Login</NavLink>}
                <NavLink className=' items-center flex h-[75%] p-4 rounded-md navlinkActiveHoverFocus' to='' >Our AI Coming Soon</NavLink>
            </nav>
            <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg="Proccess complete" p1="You have been logged out" p2="" />

        </navbar>
    );
}

export default Navbar;