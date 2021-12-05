import fullaxios from "../components/FullAxios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

const Profilepage = () => {
<<<<<<< Updated upstream
    const [profiledata, setProfiledata] = useState([])
    const [name, setName] = useState('')
    const [changeNameBool, setChangeNameBool] = useState(false)
    const history = useHistory()
=======
    const [testimonial, setTestimonial] = useState()
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [datas, setDatas] = useState(null)
    const [namechange, setNamechange] = useState(false)
    const [imagepreview, setImagepreview] = useState()
    const [predefinedemail, setPredefinedemail] = useState(null)
    const [predefinedname, setPredefinedname] = useState(null)
>>>>>>> Stashed changes


    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                    setProfiledata(res.data)

            })
            .catch(res => {
                console.log(res)
            })
    }, [changeNameBool])

    const change_name = (e) => {
        e.preventDefault();
        fullaxios({
<<<<<<< Updated upstream
            url: 'userinfo/info', type: 'patch', data: {    
=======
            url: 'query/create', type: 'post', data: {
>>>>>>> Stashed changes
                name: name,
            }, sendcookie: true
        })
            .then(res => {
                console.log(res.data)
                // history.push('/profile')
                setChangeNameBool(false);

            })
            .catch(res => {
                console.log(res)
            })
    }

<<<<<<< Updated upstream
    const viewChangeNameForm = () => {
        if (changeNameBool == true){
            setChangeNameBool(false);
    }else{
        setChangeNameBool(true);

        }
=======
    useEffect(() => {
        console.log(namechange)

    }, [namechange])



    const Imagechangehandler = (e) => {
        // e.preventDefault();
        // setNewimages(e.target.files)
        console.log(e.target.files)
        const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        // setImagepreview((prevImages)=>prevImages.concat(fileArray))
        // console.log("has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        setImagepreview(fileArray[0])
        console.log(fileArray)
        // setImagepreview((prevImage)



>>>>>>> Stashed changes
    }


    // const Imagechangehandler = (e) => {
    //     // e.preventDefault();
    //     // setNewimages(e.target.files)
    //     console.log(e.target.files )
    //     const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
    //     // setImagepreview((prevImages)=>prevImages.concat(fileArray))
    //     // console.log("has it changed",e.target.value)
    //     // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
    //     setImagepreview(fileArray[0])
    //     console.log(fileArray)
    //     // setImagepreview((prevImage)
    // }

<<<<<<< Updated upstream
    
        return (
            <div>
            {!changeNameBool &&  <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center bg-[#dddddd] shadow-2xl rounded-2xl justify-evenly" >
                <p className="text-4xl text-center">Profile Page</p>
                <div type="email" className="email flex items-center">
                    <p className="w-40">Email: {profiledata.email}</p >
                </div>
                <div type="name" className="email flex items-center">
                    <p className="w-40"> Name: {profiledata.name}</p >
                </div>
                <b><div onClick={viewChangeNameForm}>Change Name</div></b>
        <b><p><Link to="/bookings"> Bookings</Link></p></b>
        <b><p><Link to="/myblogs"> Blogs</Link></p></b>
            </div>}

        {changeNameBool && <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center bg-[#dddddd] shadow-2xl rounded-2xl justify-evenly">
            <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={change_name}>
                <p className="text-4xl text-center">Change Name</p>
                <div type="name" className="email flex items-center">
                    <p className="w-40">Enter Name:</p >
                    <input required type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  w-20 rounded-full">Submit</button>
                </div>
            </form>
            <div onClick={viewChangeNameForm}>Go Back</div>
        </div>}
=======



    return (
        <div className=" section contact-us">
            {namechange ?
                <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] ' action="">
                    <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Profile page</span>

                    <div className='sm:pb-4'>
                        <div className="">
                            <p className='flex items-center'>
                                <span className='w-52'>Enter your name :</span>
                                <input required type="text" placeholder="Name" defaultValue="" onChange={(e) => setName(e.target.value)} />
                            </p>
                        </div>

                    </div>
                    <p className='flex items-center'>
                        <button onClick={(e) => { Goback(e) }} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Go back to profile</button>


                        <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
                    </p>
                </form>
                :
                <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] ' action="">
                    <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Profile page</span>

                    <div className='sm:pb-4'>
                        <div className="">
                            <p className='flex items-center'>
                                <span className='w-52'>Enter your name :</span>
                                {predefinedname}
                            </p>
                            <p className='flex items-center'>
                                <span className='w-52'>Enter your email :</span>
                                {predefinedemail}
                            </p>
                        </div>
                    </div>


                    <p className='flex items-center p-4'>
                        <button onClick={(e) => { Submit(e) }} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Change name</button>

                        <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Bookings</button>

                    </p>
                </form>}

>>>>>>> Stashed changes
        </div>
    );
}


export default Profilepage;