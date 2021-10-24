import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";


const Home = () => {
    return ( 
        <div className="main ">
            <h1>still ugly af <small>homepage</small></h1>
            <Router>
                <FAQ/>
            </Router>
            
        </div>
     );
}
 
export default Home;