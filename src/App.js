import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Blogs from './pages/BlogsPage';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Home from './pages/Homepage';

function App() {
  return (
    <Router>
    <div className="App bg-blue-500">
      <Navbar />
      
      <div className="content">
        <Switch>
        
        <Route exact path = "/"> <Home /> </Route>
      
        <Route exact path = "/blogs"> <Blogs /> </Route>

        <Route exact path = "/gallery"> <Gallery /> </Route>
      
        <Route exact path = "/contactus"> <ContactUs /> </Route>
        </Switch>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
