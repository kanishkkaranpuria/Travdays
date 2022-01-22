import fullaxios from "../components/FullAxios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

const Profilepage = ({setNamechanged}) => {
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
            }
        })
            .then(res => {
                setNamechanged(prev=>prev+1)
                console.log(res.data)
                alert("name changed succesfully")

                history.push('/')
                setChangeNameBool(false);

            })
            .catch(res => {
                console.log(res)
            })
    }

  


    
        return (
     <div className="section">
                <div className = "flex w-full">
           

         <div className="flex flex-col mt-20 min-h-[500px] mx-auto max-w-[1000px] items-center p-box-shadow-2 rounded-2xl justify-evenly">
            <form className="flex flex-col h-full mx-auto max-w-[1000px] px-40 items-center justify-evenly" onSubmit={change_name}>
                <p className="text-4xl text-center">Change Name</p>
                <div type="name" className="email flex items-center">
                    <p className="w-40">Enter Name:</p >
                    <input required type="text" placeholder={profiledata.name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=" ">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md">Submit</button>
                </div>
            </form>
        </div>
                </div>
     </div>
    );
}


export default Profilepage;