import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";
import Card from "../components/Card"
const Home = () => {
    return ( 
        <div className="main w-full items-center justify-center">
            <div className="hero p-8 flex items-center justify-center">
            <div className="w-1/2">
            <p className="">
                <p className='text-3xl'>Welcome to Travdays</p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
            </div>
            <div className='grid grid-cols-3 w-1/2'>
                <Card/>
                <Card/>
                <Card/>
            </div>
            </div>
            <Router>
                <FAQ/>
            </Router>
            
        </div>
     );
}
 
export default Home;