import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
import logo from './pages/images/TravDays_logos/transparent_logo.png';
import Logout from './pages/Logout';
import Login from './pages/Login';
import PackagesPage from './pages/PackagesPage';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Addtrips from './ADMIN/Addtrips';
import Edittrips from './ADMIN/Edittrips';
import ApproveBlogs from './ADMIN/ApproveBlogs';

const showMenu = () =>{
  document.getElementById('mobile-menu').style.transform="translateY(0%)";
  document.getElementById('show-menu-btn').style.display='none';
  document.getElementById('hide-menu-btn').style.display='flex';

}
const hideMenu = ()=>{
  document.getElementById('mobile-menu').style.transform='translateY(-100%)';
  document.getElementById('hide-menu-btn').style.display='none';
  document.getElementById('show-menu-btn').style.display='flex';
}
// aum time 

function App() {
  const [id, setId] = useState();
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="berger hidden w-full md:flex items-center justify-between md:fixed top-0  p-2 z-[5] bg-gray-400 opacity-80" >
        {/* <img className='h-10' src={logo} alt=""/> */}
        <Link to = '/'><p className='text-lg'>TravDays</p></Link>
            <svg xmlns="http://www.w3.org/2000/svg" id='show-menu-btn' className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showMenu}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id='hide-menu-btn' className="h-8 w-8 hidden" fill="none" viewBox="0 0 24 24" stroke="black" onClick={hideMenu}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
            
        </div>
        <MobileMenu/>
      <div className="content flex justify-center">
        <Switch>
        
        <Route exact path = "/"> <Home /> </Route>
      
        <Route exact path = "/blogs"> <Blogs id={id} setId={setId} /> </Route>

        <Route exact path = "/gallery"> <Gallery /> </Route>
        
        <Route exact path = "/login"> <Login /> </Route>

        <Route exact path = "/logout"> <Logout /> </Route>

        <Route exact path = "/contactus"> <ContactUs /> </Route>

        <Route exact path = "/trip/:name"> <Trip/> </Route>
        
        <Route exact path = "/trips/:type"> <AllTrips /> </Route>

        <Route exact path = "/packagespage"> <PackagesPage /> </Route>

        <Route exact path = "/faq"> <FAQ /> </Route>
        
        <Route exact path = "/blogs/write"> <WriteABlog /> </Route>

        <Route exact path = "/blogs/:title"> <IndivisualBlogPage id={id} setId={setId}/> </Route>

        {/* ADMINS ONLY */}
        <Route exact path = "/addtrips"> <Addtrips /> </Route>
        
        <Route exact path = "/edittrips"> <Edittrips /> </Route>
        <Route exact path = "/approveblogs"> <ApproveBlogs id={id} setId={setId} /> </Route>
        


        
        
        </Switch>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
