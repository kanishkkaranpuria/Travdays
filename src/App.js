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

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      
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
