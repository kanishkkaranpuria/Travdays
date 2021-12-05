import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";
import Card from "../components/Card"
import { useEffect } from "react";
import fullaxios from "../components/FullAxios";
import Logo from "./images/TravDays_logos/1trans.png"




const Home = ({isadmin,setIsadmin}) => {

    useEffect(() => {
        fullaxios({url : 'userinfo/status'})
        //   .get(`faq/question?page=`+ page)
          .then((res)=>{
              console.log(res.data.admin)
              setIsadmin(res.data.admin)
           
          })
          .catch(err => {
                console.log(err)
           } )
      }, [])


// const Home = () => {
    return ( 
        <div className="main w-full items-center justify-center">
            <div className="section hero items-center justify-center">
            <div className="p-6 relative sm:p-4 sm:order-2">
                
                <div className='block sm:hidden'>
                {/* <img src={Logo} alt='' className='absolute h-[300px] top-[-50%] right-[10%] ' /> */}
                <p className='text-3xl sm:text-2xl sm:leading-tight font-semibold leading-[0]'>Welcome to</p>
                <p className="w-full text-8xl sm:text-6xl font-bold">Travdays</p>
                
                </div>
                <p className="p-4 leading-tight">
                    
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                <p className='m-4'>
                    <div className="flex sm:justify-center">

                     {isadmin&& <Link className='m-2 p-2 w-40 sm:w-32 sm:m-1 bg-blue-500 font-semibold' to='/adminOnly'>Admin Only</Link> }
                        <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 font-semibold'>Contact us</button>
                        <button id='learn-more-btn' className='m-2 p-1 w-40 sm:w-32 sm:m-1'>Learn more</button>       
                    </div> 
                        <div className='flex sm:justify-around space-x-8 opacity-40 p-4'>
                        <img src="https://img.icons8.com/material/32/000000/facebook-new.png"/>
                        <img src="https://img.icons8.com/material/32/000000/instagram-new--v1.png"/>
                        <img src="https://img.icons8.com/small/32/000000/twitter.png"/>
                        <img src="https://img.icons8.com/material/32/000000/youtube-play--v1.png"/>
                        </div>
                </p>
            </div>
            <div className='hidden sm:block p-[0.5rem]'>
                <p className='text-3xl sm:text-2xl sm:leading-tight font-semibold leading-[0]'>Welcome to</p>
                <p className="w-full text-8xl sm:text-6xl font-bold">Travdays</p>
            </div>
            <div className='card-grid sm:py-[20px]  max-w-[800px]'  >
                <Link className='card-grid__link__hover' to='/trips/workation'><Card title="Workation" id='one'  /></Link>
                <Link className='card-grid__link__hover' to='/trips/solo'><Card title="Solo Travel"id='two' /></Link>
                <Link className='card-grid__link__hover' to='/trips/pet friendly'><Card title="Pet Friendly" id='three' /></Link>
            </div>
                        {/* <div class="swiper mySwiper hidden sm:flex">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </div>
                    <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                </div> */}
            </div>
            <div className="section gallery grid grid-cols-2 justify-center relative">
            <svg className='absolute top-[-426px] w-[1920px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,288L80,277.3C160,267,320,245,480,240C640,235,800,245,960,245.3C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            {/* <svg className='absolute top-[-246px] w-[1920px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000088" fill-opacity="1" d="M0,192L80,176C160,160,320,128,480,144C640,160,800,224,960,261.3C1120,299,1280,309,1360,314.7L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
                <div className="flex items-center justify-center">
                <div className="gallery-preview">   
                </div>
                </div>
                <div className="p-6 sm:p-2">
                <p className= 'text-8xl sm:text-6xl font-bold leading-normal'>Gallery</p>
                <p className='text-3xl pl-4 font-semibold '>select your destination by aesthetics</p>
            <p className="p-4 leading-tight">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Nostrum voluptatem ut sed tempora rerum vitae, 
                atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
            </p>
                
            </div>
            </div>
            <div>
            <div className="section testimonial relative">
            {/* <svg className='absolute top-[-426px] w-[1920px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F7F7F5" fill-opacity="1" d="M0,224L80,240C160,256,320,288,480,266.7C640,245,800,171,960,144C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
            <svg className='absolute top-[-391px] left-0 w-[1920px]'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F7F7F5" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,261.3C480,267,600,277,720,266.7C840,256,960,224,1080,224C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            {/* <svg className='absolute top-[-426px] w-[1920px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L60,245.3C120,235,240,213,360,197.3C480,181,600,171,720,160C840,149,960,139,1080,144C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
            <span className='text-6xl sm:text-4xl font-bold p-6 sm:p-2 inline-block'>Testimonials</span>
            <div className="grid grid-cols-2 ">
                    <div className='flex h-32 '>
                        <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1528001100577-c6b2f16d5276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1598587741472-cb50fcba42be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1557977275-d261356f567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>
                
                    <div className='flex h-32 '>
                        <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1528001100577-c6b2f16d5276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1598587741472-cb50fcba42be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>

                    <div className='flex h-32'>
                    <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1557977275-d261356f567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                    </div>


                </div>
                </div>

            </div>

            <div className='section faq sm:pt-16 relative'>
            <svg className='absolute left-0 top-[-426px] w-[1920px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,288L60,288C120,288,240,288,360,293.3C480,299,600,309,720,309.3C840,309,960,299,1080,293.3C1200,288,1320,288,1380,288L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <Link to='/faq'>      
            <span className='text-6xl sm:text-4xl font-bold p-6 sm:p-2 inline-block faq-link'>FAQ</span>
            </Link>
                <div className=' flex flex-col justify-center w-[1000px] mx-auto divide-y-2 divide-gray-300'>
                <div className="my-4">
                <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </p>
                <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                <div className="my-4">
                <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </p>
                <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                <div className="my-4">
                <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </p>
                <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                <div className="my-4">
                <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </p>
                <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
                <div className="my-4">
                <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </p>
                <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                </div>
               
                </div>
                </div>


            <div className="footer flex h-[120px] bg-[#FFA914]">
                <div className='flex w-full justify-around items-center opacity-70 p-4'>
                            <img className='w-[40px]' src="https://img.icons8.com/material/64/000000/facebook-new.png"/>
                            <img className='w-[40px]' src="https://img.icons8.com/material/64/000000/instagram-new--v1.png"/>
                            <img className='w-[50px]' src="https://img.icons8.com/ios/96/000000/whatsapp--v1.png"/>
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