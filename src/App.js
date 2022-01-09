import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//aums imports?
import fullaxios from './components/FullAxios';
//aums imports?
import Navbar from './components/Navbar';
import Blogs from './pages/BlogsPage';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Home from './pages/Homepage';
import AllTrips from './pages/AllTripsPage';
import Trip from './pages/TripPage';
import FAQ from './components/FAQ';
import WriteABlog from './components/WriteABlog';
import IndivisualBlogPage from './pages/IndivisualBlogsPage';
import MobileMenu from './components/MobileMenu';
import Logout from './pages/Logout';
import Login from './pages/Login';
import PackagesPage from './pages/PackagesPage';
import { Link } from 'react-router-dom';
import { useState, useParams, useEffect } from 'react';
import Addtrips from './ADMIN/Addtrips';
import Edittrips from './ADMIN/Edittrips';
import ApproveBlogs from './ADMIN/ApproveBlogs';
import Addtestimonials from './ADMIN/Addtestimonials';
import AdmContactUs from './ADMIN/AdmContactUs';
import AdmFaq from './ADMIN/AdmFaq';
import AdmBooking from './ADMIN/AdmBooking';
import MainAdmin from './ADMIN/MainAdmin';
import Profilepage from './pages/Profilepage';
import Registration from './pages/Registration';
import ResetPassword from './pages/ResetPassword';
import BookingHistory from './pages/Bookinghistory';
import MyBlogs from './pages/MyBlogs';
import BgImg1 from "./pages/images/TravDays_logos/bg_layer_1.svg"
import BgImg2 from "./pages/images/TravDays_logos/bg_layer_2.svg"
import BgImg3 from "./pages/images/TravDays_logos/bg_layer_3.svg"
import EditBlogsPage from './pages/EditBlogsPage';


const showMenu = () => {
  document.getElementById('mobile-menu').style.transform = "translateY(0%)";
  document.getElementById('show-menu-btn').style.display = 'none';
  document.getElementById('hide-menu-btn').style.display = 'flex';

}
const hideMenu = () => {
  document.getElementById('mobile-menu').style.transform = 'translateY(-100%)';
  document.getElementById('hide-menu-btn').style.display = 'none';
  document.getElementById('show-menu-btn').style.display = 'flex';
}
// aum time 

function App() {
  const [isadmin, setIsadmin] = useState(false);
  const [isauthenticated, setIsauthenticated] = useState(false);

  useEffect(() => {
    fullaxios({url: 'userinfo/status'})
      //   .get(`faq/question?page=`+ page)
      .then((res) => {
        if (res) {
          //res.data.admin)
          //res.data)
          setIsadmin(res.data.admin)
          setIsauthenticated(res.data.authenticated)
        }
      })
      .catch(err => {
        //err)
      })
  }, [])

  // useEffect(()=>
  // {
  //   fullaxios({ url: 'userinfo/status' })
  //   //   .get(`faq/question?page=`+ page)
  //   .then((res) => {
  //     //res.data.admin)
  //     setIsadmin(res.data.admin)

  //   })
  //   .catch(err => {
  //     //err)
  //   }) 
  // })


  return (
    <Router>
      <div className="App">
        <img className='w-[100vw] fixed z-[0] opacity-[30%]' src={BgImg1} alt=''/>
        <img className='w-[100vw] fixed z-[0] opacity-[25%]' src={BgImg2} alt=''/>
        <img className='w-[100vw] fixed z-[0] opacity-[15%]' src={BgImg3} alt=''/>

        <Navbar isauthenticated = {isauthenticated} setIsadmin={setIsadmin} setIsauthenticated = {setIsauthenticated}/>
        <div className="berger hidden w-full md:flex items-center justify-between md:fixed top-0  p-2 z-[5] bg-gray-400 opacity-80" >
          {/* <img className='h-10' src={logo} alt=""/> */}
          <Link to='/'><p className='text-lg'>TravDays</p></Link>
          <svg xmlns="http://www.w3.org/2000/svg" id='show-menu-btn' className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showMenu}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id='hide-menu-btn' className="h-8 w-8 hidden" fill="none" viewBox="0 0 24 24" stroke="black" onClick={hideMenu}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>
        <MobileMenu />
        <div className="content pt-[60px] flex justify-center ">
          <Switch>

            <Route exact path="/"> <Home isadmin={isadmin} setIsadmin={setIsadmin} /> </Route>

            <Route exact path="/blogs"> <Blogs /> </Route>

            <Route exact path="/gallery"> <Gallery /> </Route>

            <Route exact path="/login"> <Login setIsauthenticated={setIsauthenticated} /> </Route>

            <Route exact path="/register"> <Registration /> </Route>

            <Route exact path="/logout"> <Logout /> </Route>

            <Route exact path="/contactus"> <ContactUs /> </Route>

            <Route exact path="/profile"> <Profilepage /> </Route>

            <Route exact path="/trip/:name"> <Trip isAuth={isauthenticated} /> </Route>

            <Route exact path="/trips/:type"> <AllTrips /> </Route>

            <Route exact path="/packagespage"> <PackagesPage /> </Route>

            <Route exact path="/faq"> <FAQ isadmin={isadmin} /> </Route>

            <Route exact path="/blogs/write"> <WriteABlog /> </Route>

            <Route exact path="/blogs/:title/:id"> <IndivisualBlogPage isadmin={isadmin} setIsadmin={setIsadmin} /> </Route>

            <Route exact path="/myblogs/editblogs"> <EditBlogsPage /> </Route>

            <Route exact path="/myblogs"> <MyBlogs /> </Route>

            <Route exact path="/resetpassword"> <ResetPassword /> </Route>

            <Route exact path="/bookings"> <BookingHistory /> </Route>



            {(isadmin === true) &&
            <>
            <Route exact path="/adminOnly"> <MainAdmin /> </Route>

            <Route exact path="/addtrips"> <Addtrips /> </Route>
              
            <Route exact path="/tripedit/:name/:id"> <Edittrips /> </Route>
              
            <Route exact path="/approveblogs"> <ApproveBlogs /> </Route>
              
            <Route exact path="/addtestimonials"> <Addtestimonials /> </Route>
              
            <Route exact path="/admcontactus"> <AdmContactUs /> </Route>
              
            <Route exact path="/admfaq"> <AdmFaq /> </Route>
              
            <Route exact path="/admbooking"> <AdmBooking /> </Route>
            </>
            }

          </Switch>
          {/* ADMINS ONLY */}
          {/* {Onlyadmin()} */}
        </div>
      </div>
    </Router>
  );
}

export default App;
