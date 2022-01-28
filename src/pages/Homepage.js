import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FAQ from "../components/FAQ";
import Card from "../components/Card"
import { useEffect,useState,useRef,useCallback } from "react"
import fullaxios from "../components/FullAxios";
import Logo from "./images/TravDays_logos/2trans.png"
import GalleryTop from "./images/TravDays_logos/gallery-top.svg"
import GalleryBottom from "./images/TravDays_logos/gallery-bottom.svg"
import FaqTop from "./images/TravDays_logos/faq-top.svg"
import BackgroundImage from "./images/TravDays_logos/backgroundImage.jpg"
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom'




const Home = ({ isadmin, setIsadmin }) => {

    const history = useHistory()


    
    const HFAQ = () => {
        const [Isadmin, setIsadmin] = useState()
        const [answer, setAnswer] = useState({});
        const [faqs, setFaqs] = useState([]);
        const [page, setPage] = useState(1);
        const [pk, setPk] = useState(null);
        const Qref = useRef();
        const [id,setId]= useState();
        const [answerstatus, setAnswerstatus] = useState({})
        const [arrowBool,setArrowBool] = useState(true);
 

        //pagination 
        const observer = useRef()
        const [loading, setLoading] = useState(false)
        const [hasMore, setHasMore] = useState(true)
        
        const lastDataElementRef = useCallback(node => {
            console.log('last element')
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
            })
            if (node) observer.current.observe(node)
        }, [loading, hasMore])




    

        useEffect(() => {
        
        fullaxios({url : 'faq/question?page=' + 1})
        //   .get(`faq/question?page=`+ page)
        .then((res)=>{
            if (res){
            setFaqs(prev=>[...prev,...res.data])
            console.log(res.data)
        
        }})
        .catch(err => {
            if (err.response) {
            if (err.response.data.detail === "Invalid page.") {
                setHasMore(false);
            }
            }
        } )
            
        },[])
        // var x=0
        const rotateArrow = (e)=>{
            if(e.target.children[1].style.transform === 'rotate(180deg)'){
            e.target.children[1].style.transform = 'rotate(0deg)'
            }
            else{
                e.target.children[1].style.transform = 'rotate(180deg)'
            }
        }
        const Answers = (i) => {
            // var d = document.getElementById("selected");
            // console.log("thiss")
            // console.log(d)
            // console.log(i.target);

            if (answerstatus[i] === true){
                // console.log('it is true')
                setAnswerstatus((prev)=>({...prev, 
                    [i] : false
                    }))
            }
            else if(answerstatus[i] === false){
                // console.log('it is false')
                setAnswerstatus((prev)=>({...prev, 
                    [i] : true
                    }))
            }
            else{
            fullaxios({url : 'faq/answer/' + i})
            // .get(`faq/answer/`+ i)
            .then(res => {
                console.log(res.data)
                if (res){
                setAnswer((prev)=>({...prev,[i] : [res.data.answer]}))
                setAnswerstatus((prev)=>({...prev, [i] : true}))
                // console.log(res.data)
                // console.log("it worked")
            
            }})
            .catch(err => {
                console.log(err)
                // if (res.status === 400)
                //     alert("invalid OTP!!")
            })
            }
        }
        // let lastScroll=0
        // const location = useLocation();

        // useEffect(()=>{
        //     console.log("location",location)
        //     if(location.pathname==='/'){
        //     let navbartTrigger = document.getElementById('triggerElement')
        //     let navbar = document.getElementById('navbar')
        //     // let navLenConst = 0
        //     // if (navbar){
        //     //     navLenConst = navbar.getBoundingClientRect().bottom
        //     // }
        //     if (navbar.getBoundingClientRect().top == 0){
        //         navbar.style.backgroundColor = '#00000000' 
        //     }
        //     window.addEventListener('scroll',()=>{
        //         if (window.scrollY  > window.pageYOffset + navbartTrigger.getBoundingClientRect().top){
        //             console.log("DArk navbar")
        //             navbar.style.transform = 'translateY(-100%)'
        //             if(window.pageYOffset< lastScroll){
        //                 navbar.style.transform = 'translateY(0%)'
        //                 navbar.style.backgroundColor = '#046C6D'
        //             }
        //             lastScroll = window.pageYOffset
        //         }
        //         else{
        //             console.log("Light navbar")
        //             navbar.style.transform = 'translateY(0%)'
        //             navbar.style.backgroundColor = '#00000000' 
        //         }
        //     })}else{
        //         navbar.style.backgroundColor = '#046C6D'

        //     }
        // },[location])

        const UseagainFaq = (faq) => {

            // <div className="h-32 ">
            // <p className="font-semibold"><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?</p>
            // <p className="leading-tight px-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
            // </div>
            
             return(
                 <div className=''>
                      {answerstatus[faq.id]
                                    
                                    ?  <div className='' >


                                            <p onClick={(e)=>{
                                                Answers(faq.id)
                                                rotateArrow(e)
                                                setArrowBool(true)
                                            }} className="flex items-center font-semibold cursor-pointer"><span className="text-2xl font-semibold">Q</span>{faq.question} 
                                                <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    </p>
                                            {answerstatus[faq.id] &&  <p className="leading-tight px-8 answer">{answer[faq.id]} </p>}
                                            {/* <span className='' onClick={()=>{Answers(faq.id)}} > */}

                                            {/* <option className="" id="selected"  value={faq.id}>{faq.question} 
                                            </option> */}
                                            {/* </span> */}


                                    </div>
                                    
                                    
                                    : <div className='' >

                                        {/* <div className="my-4">
                               <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                       </svg>
                                   </p>
                                       <p className="flex items-center font-semibold cursor-pointer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                                            </div> */}
                                            <p onClick={(e)=>{
                                                Answers(faq.id)
                                                rotateArrow(e)
                                                setArrowBool(false)
                                            }} className="flex items-center font-semibold cursor-pointer"><span className="text-2xl font-semibold">Q</span>{faq.question} 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    </p>

                                    </div>}
                </div>
            )
            
        }

        return ( 
            <div className='flex flex-col justify-center w-full mx-auto divide-y-2 divide-gray-300'>
                            {faqs && faqs.map((faq,index) => {
                                return(
                                    <div  id ={faq.id} className="my-4">
                                    {UseagainFaq(faq)}
                                    </div>
                                )}
                            )
                        }   
                                

            </div>
        );
}

    useEffect(() => {
        fullaxios({ url: 'userinfo/status' })
            //   .get(`faq/question?page=`+ page)
            .then((res) => {
                console.log(res.data.admin)
                setIsadmin(res.data.admin)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    // const Home = () => {
    return (
        <div className="main w-full items-center justify-center relative">
            <img id='backgroundImg' alt='' src={BackgroundImage} className='fixed z-0 top-0 ' />
            {/* <div className='w-full h-full absolute top-0 bg-gradient-to-r from-black to-transparent'></div> */}
            <div className='w-full h-full fixed top-0 bg-[#00000088] z-0'></div>
            <div className="section hero relative items-center justify-center">
                <div className=" p-6 pt-[145px] relative sm:p-4 sm:order-2 ">
                    <div className='block sm:hidden text-[#f7f7f569]'>
                        {/* <img src={Logo} alt='' className='absolute h-[300px] top-[-50%] right-[10%] ' /> */}
                        <p className='text-3xl sm:text-2xl sm:leading-tight font-semibold leading-[0]'>Welcome to</p>
                        <span id='triggerElement' className="relative w-full text-8xl sm:text-6xl font-bold text-[#D4F571] tracking-[12px]">
                            TravDays
                            <img src={Logo} alt='' className='absolute w-[135px] top-[-126%] right-[10%] z-[-1] opacity-[59%]' />
                        </span>

                    </div>
                    <p className="p-4 leading-tight text-[#f7f7f569]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className='m-4'>
                        <div className="flex sm:justify-center">

                            {isadmin && <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 sm:hidden rounded-md' onClick={() => { history.push("/adminOnly") }}>Admin Only</button>}
                            <button className='m-2 p-2 w-40 sm:w-32 sm:m-1 rounded-md ' onClick={() => { history.push("/contactus") }} >Contact us</button>
                            <button id='learn-more-btn' className='m-2 p-1 w-40 sm:w-32 sm:m-1 rounded-md'>Learn more</button>
                        </div>
                        <div className='flex sm:justify-around space-x-8 opacity-40 p-4'>
                            <img src="https://img.icons8.com/material/32/000000/facebook-new.png" />
                            {/* <button><img src="./img/google.png" alt="my image" onClick={this.myfunction} /></button> */}
                            <img src="https://img.icons8.com/material/32/000000/instagram-new--v1.png" />
                            <img src="https://img.icons8.com/small/32/000000/twitter.png" />
                            <img src="https://img.icons8.com/material/32/000000/youtube-play--v1.png" />
                        </div>
                </p>
            </div>
            <div className='hidden sm:block p-[0.5rem] text-[#f7f7f569]'>
                <p className='text-3xl sm:text-2xl sm:leading-tight font-semibold leading-[0]'>Welcome to</p>
                <p className="w-full text-8xl sm:text-6xl font-bold tracking-[12px] text-[#D4F571]">Travdays</p>
            </div>
            <div className='card-grid sm:py-[20px]  max-w-[800px]'  >
                <Link className='' to='/trips/workation'><Card title="Workation" id='one'  /></Link>
                <Link className='' to='/trips/solo'><Card title="Solo Travel"id='two' /></Link>
                <Link className='' to='/trips/pet friendly'><Card title="Pet Friendly" id='three' /></Link>
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
                <img className='absolute top-[-70px] md:top-[-30px] w-full z-[-1]' src={GalleryTop} alt='' />
                <img className='absolute -rotate-180 bottom-[-70px] md:bottom-[-30px] w-full z-[-1]' src={GalleryBottom} alt='' />
            {/* <svg className='absolute top-[-420px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,288L80,277.3C160,267,320,245,480,240C640,235,800,245,960,245.3C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
            {/* <svg className='absolute left-0 bottom-[-426px] -rotate-180 w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,288L60,288C120,288,240,288,360,293.3C480,299,600,309,720,309.3C840,309,960,299,1080,293.3C1200,288,1320,288,1380,288L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
            {/* <svg className='absolute bottom-[-389px] -rotate-180 left-0 w-full'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,261.3C480,267,600,277,720,266.7C840,256,960,224,1080,224C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                        {/* <svg className='absolute top-[-246px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000088" fill-opacity="1" d="M0,192L80,176C160,160,320,128,480,144C640,160,800,224,960,261.3C1120,299,1280,309,1360,314.7L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
                <div className="flex items-center justify-center">
                    <div className="gallery-preview" onClick={() => { history.push('/gallery') }} >
                    </div>
                </div>
                <div className="p-6 sm:p-2">
                    <button> <p className='text-8xl sm:text-6xl font-bold leading-normal aumptags' onClick={() => { history.push('/gallery') }}>Gallery</p> </button>
                    <p className='text-3xl pl-4 font-semibold '>select your destination by aesthetics</p>
                    <p className="p-4 leading-tight">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Nostrum voluptatem ut sed tempora rerum vitae,
                        atque dolores neque est quae tempore veritatis alias nam inventore esse illum illo et dolorem.
                    </p>

                </div>
            </div>
            <div>
            <div className="section flex flex-col testimonial relative min-h-[100vh-60px] sm:min-h-[1100px]">
            {/* <svg className='absolute top-[-426px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F7F7F5" fill-opacity="1" d="M0,224L80,240C160,256,320,288,480,266.7C640,245,800,171,960,144C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
            {/* <svg className='absolute top-[-426px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L60,245.3C120,235,240,213,360,197.3C480,181,600,171,720,160C840,149,960,139,1080,144C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
            <span className='text-6xl sm:text-4xl font-bold p-6 mt-[40px] sm:p-2 inline-block'>Testimonials</span>
            <div className="grid grid-cols-3 my-auto sm:my-0 h-[600px] sm:grid-cols-1 ">
                    <div className='flex h-32 sm:mb-8 '>
                        <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                    <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1528001100577-c6b2f16d5276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className='px-8'>
                            <p className="text-2xl font-semibold">username</p>
                        <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>    
                        </div>
                        </div>
                        <div className='flex h-32 sm:mb-8'>
                            <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                                <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1598587741472-cb50fcba42be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
                            </div>
                            <div className='px-8'>
                                <p className="text-2xl font-semibold">username</p>
                                <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                            </div>
                        </div>

                        <div className='flex h-32 sm:mb-8'>
                            <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                                <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1557977275-d261356f567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80" />
                            </div>
                            <div className='px-8'>
                                <p className="text-2xl font-semibold">username</p>
                                <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                            </div>
                        </div>

                        <div className='flex h-32 sm:mb-8 '>
                            <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                                <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1528001100577-c6b2f16d5276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
                            </div>
                            <div className='px-8'>
                                <p className="text-2xl font-semibold">username</p>
                                <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                            </div>
                        </div>

                        <div className='flex h-32 sm:mb-8'>
                            <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                                <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1598587741472-cb50fcba42be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
                            </div>
                            <div className='px-8'>
                                <p className="text-2xl font-semibold">username</p>
                                <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                            </div>
                        </div>

                        <div className='flex h-32 sm:mb-8'>
                            <div className='profile-img min-w-[64px] h-[64px] rounded-lg overflow-hidden rotate-[-4deg]'>
                                <img className='w-[64px] object-cover' src="https://images.unsplash.com/photo-1557977275-d261356f567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80" />
                            </div>
                            <div className='px-8'>
                                <p className="text-2xl font-semibold">username</p>
                                <p className="leading-tight">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                            </div>
                        </div>

                </div>

            </div>

            <div className='section faq sm:pt-16 relative'>
                <img className='absolute top-[-70px] md:top-[-30px] left-0 w-full z-[-1]' src={FaqTop} alt='' />
            {/* <svg className='absolute left-0 top-[-420px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#046C6D" fill-opacity="1" d="M0,288L60,288C120,288,240,288,360,293.3C480,299,600,309,720,309.3C840,309,960,299,1080,293.3C1200,288,1320,288,1380,288L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                <Link to='/faq'>      
            <span className='text-6xl sm:text-4xl font-bold p-6 sm:p-2 inline-block faq-link'>FAQ</span>
            </Link>
        
        {/* FAQ SECTION */}
                <div className=' flex flex-col justify-center max-w-[1000px] mx-auto divide-y-2 divide-gray-300'>
                    {/* <div className="my-4">
                        <p className="flex items-center font-semibold cursor-pointer" ><span className="text-2xl font-semibold">Q</span> Lorem ipsum dolor sit amet consectetur adipisicing elit ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </p>
                        <p className="leading-tight px-8 answer">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non optio modi laborum doloribus accusantium dolor aut alias soluta placeat.</p>
                    </div> */}
                    <HFAQ/>
                </div>
             </div>
            
            <div className="footer flex h-[120px] relative">
                <div className='flex h-full w-full justify-around items-center opacity-70 p-4'>

                    <img className='w-[40px]' src="https://img.icons8.com/material/64/000000/facebook-new.png" />

                    <a href='https://instagram.com/kanishk666'>
                        <button><img className='w-[40px]' src="https://img.icons8.com/material/64/000000/instagram-new--v1.png" /></button>
                    </a>

                    <a href='https://api.whatsapp.com/send/?phone=919892443600&text&app_absent=0' >
                        <button > <img className='w-[50px]' src="https://img.icons8.com/ios/96/000000/whatsapp--v1.png" /> </button>
                    </a>

                    <a href='https://twitter.com/_kanishk666'>
                        <button><img className='w-[40px]' src="https://img.icons8.com/small/64/000000/twitter.png" /></button>
                    </a>

                    <a href='https://www.youtube.com/watch?v=JxzZxdht-XY'>
                        <button><img className='w-[40px]' src="https://img.icons8.com/material/64/000000/youtube-play--v1.png" /></button>
                    </a>
                </div>
                
            </div>
            
            <div className="section flex flex-col testimonial relative min-h-[100vh-60px] sm:min-h-[930px]" >
                    <h1><u><b>Footer:</b></u></h1>
                    <hr/>
                    <h5> <button onClick={()=>
                        {
                            history.push('/')
                        }
                        }> <u>Home </u></button> <br/>
                        <button onClick={()=>{
                            history.push('/packagespage')
                        }}>
                            <u>Our Packages</u> :
                        </button> <br/>
                        <h6>
                        <button onClick={()=>{
                            history.push('/trips/workation')
                        }}>
                            - <b>workation packages</b>
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/trips/solo')
                        }}>
                            - <b>solo packages</b>
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/trips/pet friendly')
                        }}>
                            - <b>pet friendly</b>
                        </button><br/>
                        </h6>

                        <button onClick={()=>{
                            history.push('/blogs')
                        }}>
                            <u>Blogs</u> 
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/gallery')
                        }}>
                            <u>Gallery</u> 
                        </button><br/><br/>
                        
                        <button onClick={()=>{
                            history.push('/aboutus')
                        }}>
                            <u>About Us</u> 
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/contactus')
                        }}>
                            <u>Contact Us</u> 
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/privacypolicy')
                        }}>
                            <u>Our Privacy Policy</u> 
                        </button><br/>
                        <button onClick={()=>{
                            history.push('/tnc')
                        }}>
                            <u>Terms and Conditions</u> 
                        </button><br/>
                        <a href= '#social-media-links' >
                            <u>Social media link</u>
                        </a> 

                        <p> Copy-right (if applicable) </p>
                        

                    </h5>
        </div>
        <hr/>
        </div>
                    
            <div className="footer flex h-[120px] relative" >
                <marquee><h1> © Designed and developed by - <a href='https://instagram.com/spydev_' target='_blank'>Spydev Co</a> </h1></marquee>
            </div>
        </div>
    );
}

export default Home;