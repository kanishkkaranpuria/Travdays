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

const showMenu = () =>{
  document.getElementById('mobile-menu').style.display='flex'
}

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="berger hidden w-full sm:flex justify-between sm:fixed bottom-0  p-4 z-[5] bg-gray-400 opacity-80" onClick={showMenu}>
        <p>TravDays</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            
        </div>
        <MobileMenu/>
      <div className="content flex justify-center">
        <Switch>
        
        <Route exact path = "/"> <Home /> </Route>
      
        <Route exact path = "/blogs"> <Blogs /> </Route>

        <Route exact path = "/gallery"> <Gallery /> </Route>
      
        <Route exact path = "/contactus"> <ContactUs /> </Route>

        <Route exact path = "/trip/:name"> <Trip/> </Route>
        
        <Route exact path = "/trips/:type"> <AllTrips /> </Route>

        <Route exact path = "/faq"> <FAQ /> </Route>
        
        <Route exact path = "/blogs/write"> <WriteABlog /> </Route>

        <Route exact path = "/IndivisualBlogPage"> <IndivisualBlogPage /> </Route>
        
        </Switch>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
