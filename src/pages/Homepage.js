import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";
import Card from "../components/Card"
const Home = () => {
    return ( 
        <div className="main w-full items-center justify-center">
            <div className="section px-8 items-center justify-center">
            <div className="p-6">
            <p className="">
                <p className='text-5xl'>Welcome to Travdays</p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                <button className='mx-auto p-2 w-40 bg-blue-500'>Contact us</button>
            </div>
            <div className='grid grid-cols-3'>
                <Card title="Workation" />
                <Card title="Solo Travel"/>
                <Card title="Pet Friendly"/>
            </div>
            </div>
            <div className="section px-8 items-center justify-center">
                <div className="gallery-preview">   
                </div>
                <div className="p-6">
            <p className="">
                <p className='text-5xl'>Gallery</p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                
            </div>
            </div>
            <div className="section">

            </div>
            <div className="footer h-32 bg-[#FFA914]">

            </div>
            <Router>
                <FAQ/>
            </Router>
            
        </div>
     );
}
 
export default Home;