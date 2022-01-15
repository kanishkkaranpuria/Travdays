import Card from "../components/Card"
import { Link } from "react-router-dom";

const PackagesPage = () => {
    return (
        <div className="sm:pt-[0px] sm:h-[100vh] w-[1000px]">
            <div className="main sm:h-full mx-auto w-[80%] pt-20 sm:pt-0">
                {/* <div className="section hero items-center justify-center"> */}
                <div className='grid sm:grid-rows-[200px,200px,200px] sm:grid-cols-1 md:grid-rows-[200px,200px,200px] md:grid-cols-1  grid-cols-3 sm:py-[20px]'>
                    <Link to='/trips/workation' className="">
                        <div className="card packagesPage relative sm:mx-auto">
                            <div className='card-content absolute h-full w-full '>
                                <img src="https://picsum.photos/200/300" className='object-cover w-full absolute bottom-0 rounded-[20px]' alt="" />
                                <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0] rounded-[20px]'></div>
                                <p className='absolute bottom-2 text-white z-[1] pl-4'>workation</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/trips/solo' className=""> <div className="card packagesPage relative sm:mx-auto"> <div className='card-content absolute h-full w-full '>
                        <img src="https://picsum.photos/200/300" className='object-cover w-full absolute bottom-0 rounded-[20px]' alt="" />
                        <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0] rounded-[20px]'></div>
                        <p className='absolute bottom-2 text-white z-[1] pl-4'>Solo Travel</p>
                    </div></div></Link>
                    <Link to='/trips/pet friendly className=""'> <div className="card packagesPage relative sm:mx-auto"> <div className='card-content absolute h-full w-full '>
                        <img src="https://picsum.photos/200/300" className='object-cover w-full absolute bottom-0 rounded-[20px]' alt="" />
                        <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0] rounded-[20px]'></div>
                        <p className='absolute bottom-2 text-white z-[1] pl-4'>Pet Friendly</p>
                    </div></div></Link>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default PackagesPage;