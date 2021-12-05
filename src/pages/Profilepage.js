import fullaxios from "../components/FullAxios"
import { useState,useEffect } from "react"
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

const Profilepage = () => {
    const [profiledata, setProfiledata] = useState([])
    const [name, setName] = useState('')
    const [changeNameBool, setChangeNameBool] = useState(false)
    const history = useHistory()

    
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
            url: 'userinfo/info', type: 'patch', data: {    
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

    const viewChangeNameForm = () => {
        if (changeNameBool == true){
            setChangeNameBool(false);
    }else{
        setChangeNameBool(true);

        }
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
        </div>
        );
    }
    
   
export default Profilepage;