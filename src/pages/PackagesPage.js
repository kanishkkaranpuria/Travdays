import Card from "../components/Card"
import { Link } from "react-router-dom";

const PackagesPage = () => {
    return (
        <div className="section">
                <div className="main mx-auto w-[50%] pt-20">
            {/* <div className="section hero items-center justify-center"> */}
                <div className='card-grid sm:py-[20px]'>
                    <Link to='/trips/workation'><Card title="Workation" id='one' /></Link>
                    <Link to='/trips/solo'><Card title="Solo Travel" id='two' /></Link>
                    <Link to='/trips/pet friendly'><Card title="Pet Friendly" id='three' /></Link>
                </div>
            {/* </div> */}
        </div>
        </div>
    );
}

export default PackagesPage;