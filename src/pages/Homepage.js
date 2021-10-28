import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";
import Card from "../components/Card"
const Home = () => {
    return ( 
        <div className="main w-full items-center justify-center">
            <div className="section grid grid-cols-2 items-center justify-center">
            <div className="p-6">
                <p className='text-3xl font-semibold leading-[0]'>Welcome to</p>
                <p className="text-8xl font-bold">Travdays</p>
                <p className="p-4 leading-tight">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                <p className='m-4'>
                    <button className='p-2 w-40 bg-blue-500 font-semibold'>Contact us</button>
                    <button className='ml-4 p-2 w-40 border-black border-solid border-2 '>Learn more</button>    
                        <div className='flex space-x-8 opacity-40 p-4'>
                        <img src="https://img.icons8.com/material/32/000000/facebook-new.png"/>
                        <img src="https://img.icons8.com/material/32/000000/instagram-new--v1.png"/>
                        <img src="https://img.icons8.com/small/32/000000/twitter.png"/>
                        <img src="https://img.icons8.com/material/32/000000/youtube-play--v1.png"/>
                        </div>
                </p>
            </div>
            <div className='grid grid-cols-3 card-grid'>
                <Card title="Workation" />
                <Card title="Solo Travel"/>
                <Card title="Pet Friendly"/>
            </div>
            </div>
            <div className="section grid grid-cols-2 justify-center">
                <div className="flex items-center justify-center">
                <div className="gallery-preview">   
                </div>
                </div>
                <div className="p-6">
                <p className='text-8xl font-bold'>Gallery</p>
                <p className='text-3xl pl-4 font-semibold '>select your destination by aesthetics</p>
            <p className="p-4 leading-tight">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                
            </div>
            </div>
            <div className="section faq grid grid-cols-2 ">

                <div>
                <span className='text-6xl font-bold p-6 inline-block'>Testimonials</span>
                <div>
                    <div className='flex h-32'>
                        <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1528001100577-c6b2f16d5276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">usernname</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1598587741472-cb50fcba42be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">usernname</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1557977275-d261356f567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">usernname</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>


                </div>
                </div>

                

                <div>
                <Link to='/faq'>      
            <span className='text-6xl font-bold p-6 inline-block faq-link'>FAQ</span>
            </Link>
                <div className=''>
                <div className="h-32">
                <p className="font-semibold"><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</p>
                <p className="leading-tight px-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                <div className="h-32">
                <p className="font-semibold"><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</p>
                <p className="leading-tight px-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div><div className="h-32">
                <p className="font-semibold"><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</p>
                <p className="leading-tight px-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                </div>
                </div>


            </div>
            <div className="footer h-[120] bg-[#FFA914]">
                <div className='flex w-full justify-around items-center self-center opacity-70 p-4'>
                            <img className='w-[40px]' src="https://img.icons8.com/material/64/000000/facebook-new.png"/>
                            <img className='w-[40px]' src="https://img.icons8.com/material/64/000000/instagram-new--v1.png"/>
                            <img src="https://img.icons8.com/material/64/000000/phone--v1.png"/>
                            <img className='w-[40px]' src="https://img.icons8.com/small/64/000000/twitter.png"/>
                            <img  className='w-[40px]' src="https://img.icons8.com/material/64/000000/youtube-play--v1.png"/>
                            </div>
            </div>
            {/* <Router>
                <FAQ/>
            </Router>
             */}
        </div>
     );
}
 
export default Home;