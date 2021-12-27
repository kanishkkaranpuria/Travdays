
import { useEffect, useRef, useState } from "react";
import fullaxios from "../components/FullAxios";
import { useParams } from "react-router";


const Edittrips = () => {

    const { id } = useParams()

    // OG Add trips page 

    const [newimages, setNewimages] = useState([]);
    const [imagepreview, setImagepreview] = useState([])
    const [imagepreview2, setImagepreview2] = useState([])
    const [tripname, setTripname] = useState(null)
    const [price, setPrice] = useState(null)
    const [location, setLocation] = useState(null)
    const [descripition, setDescripition] = useState(null)
    const [triptype, setTriptype] = useState(null)
    const [durationdays, setDurationdays] = useState(null)
    const [duration, setDuration] = useState(null)
    const [durationnights, setDurationnights] = useState(null)

    const [error, setError] = useState([]);
    const [datas, setDatas] = useState([]);
    const [vdatas, setVdatas] = useState([]);
    const [videopreview, setVideopreview] = useState([])
    var [type, setType] = useState(null)

    useEffect(() => {
        if (durationnights && durationdays)
            setDuration(`${durationdays},${durationnights}`)
        console.log("it should set")

    }, [durationnights, durationdays])

    useEffect(() => {
        console.log(duration)
        console.log("duration")
        console.log(imagepreview2)
    }, [duration])

    useEffect(() => {
        console.log(duration)
        console.log("duration")

    }, [price, tripname])

    const Imagechangehandler = (e) => {
        console.log(e.target.files)
        // console.log(e.target.files.length )
        for (let i = 0; i < e.target.files.length; i++) {
            // console.log("rubbish")
        }

        const fileArray = Array.from(e.target.files).map((file, index) => ({
            "type": file.type,
            "media": URL.createObjectURL(file),
            //   "videos" : URL.createObjectURL(file)
        }))
        // console.log("has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        console.log(fileArray)
        setImagepreview2((prevVideos) => prevVideos.concat(fileArray))
        setDatas(prev => [...prev, ...Array.from(e.target.files).map((file) => file)])
    }


    useEffect(() => {
        console.log(datas)
        console.log(imagepreview)
        console.log(imagepreview.slice(2, 3))
        console.log([...imagepreview.slice(0, 1), ...imagepreview.slice(2,)])

    }, [datas, imagepreview])



    const SubmitMedia = (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(datas[0])
        let m = 0
        let n = 0
        formData.append(`id`, id)
        for (let i = 0; i < datas.length; i++) {
            console.log("rubbish")
            console.log(datas[i])

            if (datas[i].type.slice(0, 5) === "image") {
                console.log("image gang")
                formData.append(`image${m}`, datas[i])
                m++
            }
            else if (datas[i].type.slice(0, 5) === "video") {

                formData.append(`video${n}`, datas[i])
                n++
            }
            console.log(datas[i].type)
        }

        fullaxios({ url: 'trip/create/', type: 'post', data: formData, formdata: true })
            .then((res) => {
                console.log("res", res.data)
                // console.log('info data received')
                console.log("done")
            }

            )
            .catch(err => {
                console.log(err)

            })


    }


    const Submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(id)

        formData.append(`id`, id)
        formData.append(`type`, d.value)
        if (tripname === null) {
            formData.append(`name`, exdata.name)
        }
        else {
            formData.append(`name`, tripname)
        }
        if (location === null) {
            formData.append(`location`, exdata.location)
        }
        else {
            formData.append(`location`, location)
        }
        if (descripition === null) {
            formData.append(`description`, exdata.description)
        }
        else {
            formData.append(`description`, descripition)
        }
        if (price === null) {
            formData.append(`price`, exdata.price)
        }
        else {
            formData.append(`price`, price)

        }
        if (duration === null) {
            formData.append(`duration`, `${exdata.duration.split(" Days ")[0]},${exdata.duration.split(" Days ")[1].split(" Nights")[0]}`)

        }
        else {
            formData.append(`duration`, duration)
        }


        console.log(...formData)

        fullaxios({ url: 'trip/create/', type: 'patch', data: formData, formdata: true })
            .then((res) => {
                console.log("res", res.data)
                // console.log('info data received')
                console.log("done")
            }

            )
            .catch(err => {
                console.log(err)

            })

    }
    var d = document.getElementById("selected");

    //Edit page speciallllllllllllll
    const [exdata, setExdata] = useState(null)
    const [exmedia, setExmedia] = useState()
    const { name } = useParams();

    useEffect(() => {
        if (durationnights && durationdays)
            setDuration(`${durationdays},${durationnights}`)
            console.log("it should set")
            
        },[durationnights,durationdays])
        
        const test = () => {
         
            console.log("duration")
            console.log(exdata.duration)
          console.log(exdata.duration.split(" Days ")[0])   
          console.log(exdata.duration.split(" Days ")[1].split(" Nights")[0])
            }
        
        useEffect(() => {
            console.log(duration)
                    console.log("duration")
                    
                },[price,tripname])
                
                useEffect(() => {
                    
                    fullaxios({ url: 'trip/' + name})
                    .then(res => {
                        setExdata(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                    
                    
                    fullaxios({ url: 'trip/admintripmedia/' + name})
                    // fullaxios({ url: 'trip/media2/' + name})
                    .then(res => {
                        console.log(res.data)
                        setImagepreview (res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                },[])
                
                useEffect(() => {
                    console.log("exdata",exdata)
                    // console.log(exdata.descripition)
                    
                }, [exdata])
                
                // const RemoveMedia = (n) => {
                //     setImagepreview(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                //     console.log(imagepreview)
                // }
                
                const RemoveMedia2 = (n) => {
                    setImagepreview2(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                    setDatas(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                    console.log(imagepreview)
                    
                }
                
                const DeleteMedia = (n,id) => {
                    let confirmBox = window.confirm("delete seriously?")
                    console.log(confirmBox)
                    if(confirmBox===true){
                        fullaxios({ url: 'trip/deletemedia/' + id , type: "delete" })
                        .then(res => {
                            setImagepreview(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                            console.log(res.data )
                            console.log("deleted")
                        })
                        .catch(err => {
                            console.log(err)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="section">




            {/* <button className='edit-btn'onClick = {onClickFocus}>Change image</button> */}

            {exdata && <form className='flex flex-col w-1/2 mx-auto p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] ' onSubmit={Submit} action="">
                <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Edit trips</span>
                <br />
                <span className='text-xl sm:text-xl sm:p-2 inline-block '>Delete existing media</span>
                <p className='Arealcontainer'>
                    {/* {imagepreview &&  imagepreview.map((data,index)=>{
                                        console.log(data.type)
                                        console.log(data.image)
                                        if( data.type.slice(0,5) === "image" ) { 
                                            return(
                                                <div className="Acontainer">
                                                <img  onClick={()=>{RemoveMedia(index)}} src={data.media} alt=""  />  
                                                </div>
                                                )
                                            }
                                            else if (data.type.slice(0,5) === "video"){
                                                return(
                                                    <div className="Acontainer">
                                                    <video controls src={data.media }alt="" />
                                                    </div>
                                                    )
                                                }
                                            })
                                        } */}
                    {imagepreview && imagepreview.map((data, i) => {

                        if (imagepreview[i].type !== undefined) {
                            if (data.type.slice(0, 5) === "image") {
                                return (
                                    <div className="Acontainer">
                                        <img className="imageee" src={data.media} alt="" />
                                        <div onClick={() => { DeleteMedia(data.id) }} className="Amiddle">
                                            <div className="Atext">Delete</div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (data.type.slice(0, 5) === "video") {
                                return (
                                    <div className="Acontainer">
                                        <video className="imageee" controls src={data.media} alt="" />
                                        <div onClick={() => { DeleteMedia(i, data.id) }} className="Amiddle">
                                            <div className="Atext">Delete</div>
                                        </div>
                                    </div>
                                )
                            }
                        }

                        if (data.image !== undefined) {
                            return (
                                <div id={i} className="Acontainer">
                                    <img className="imageee" src={data.image} alt="" />
                                    <div className="Amiddle">
                                        <div onClick={() => { DeleteMedia(i, data.id) }} className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }
                        else if (data.video !== undefined) {
                            return (
                                <div className="Acontainer">
                                    <video className="imageee" controls src={data.video} alt="" />
                                    <div className="Amiddle">
                                        <div onClick={() => { DeleteMedia(i, data.id) }} className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }

                    })
                    }

                </p>
                <br />
                <span className='text-xl sm:text-xl font-bold sm:p-2 inline-block '>Add new Media</span>
                <br />
                    <span className="p-2 bg-blue-500 w-[150px] flex items-center justify-center rounded-md">
                    <input type="file" multiple style={{ display: 'none' }} name="file" id="file" onChange={Imagechangehandler} />
                <label htmlFor="file">
                    <i className="text-xl sm:text-xl bg-blue-500 font-bold sm:p-2">ADD IMAGE</i>
                </label>
                    </span>
                <p className='Arealcontainer'>
                    {imagepreview2 && imagepreview2.map((data, i) => {

                        if (imagepreview2[i].type !== undefined) {
                            if (data.type.slice(0, 5) === "image") {
                                return (
                                    <div className="Acontainer">
                                        <img className="imageee" src={data.media} alt="" />
                                        <div onClick={() => { RemoveMedia2(i) }} className="Amiddle">
                                            <div className="Atext">Delete</div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (data.type.slice(0, 5) === "video") {
                                return (
                                    <div className="Acontainer">
                                        <video className="imageee" controls src={data.media} alt="" />
                                        <div onClick={() => { RemoveMedia2(i) }} className="Amiddle">
                                            <div className="Atext">Delete</div>
                                        </div>
                                    </div>
                                )
                            }
                        }

                        if (data.image !== undefined) {
                            return (
                                <div id={i} className="Acontainer">
                                    <img className="imageee" src={data.image} alt="" />
                                    <div className="Amiddle">
                                        <div onClick={() => { RemoveMedia2(i) }} className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }
                        else if (data.video !== undefined) {
                            return (
                                <div className="Acontainer">
                                    <video className="imageee" controls src={data.video} alt="" />
                                    <div className="Amiddle">
                                        <div onClick={() => { RemoveMedia2(i) }} className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }

                    })
                    }
                </p>
                {imagepreview2.length !== 0 && <button onClick={SubmitMedia} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Add Media</button>}
                <div className='sm:pb-4'>
                    <div className="">
                        <p className='flex items-center'>
                            <span className='w-52'>Enter Trip name :</span>
                            <input defaultValue={exdata.name} required type="text" placeholder="Tripname" onChange={(e) => setTripname(e.target.value)} />
                        </p>
                        <p className='flex items-center'>
                            <span className='w-52'>Enter Location name :</span>
                            <input defaultValue={exdata.location} required type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                        </p>
                        {/* <p className='flex items-center' >
                                    <span className='w-52'> existing duration: </span>
                                    <input  required type="text" placeholder = "no of days" id="name"   defaultValue={exdata.duration}  />
                                    </p> */}
                        <div className='flex items-center'>
                            <span className='w-52'>Enter New duration :</span>

                                    <div className="mr-2">
                                    <p>days :</p>
                            <input required type="number" className="m-0" defaultValue={exdata.duration.split(" Days ")[0]} id="name" onChange={(e) => setDurationdays(e.target.value)} />
                                    </div>
                                    <div className="ml-2">
                                    <p>nights :</p>
                            <input required type="number" className="m-0" defaultValue={exdata.duration.split(" Days ")[1].split(" Nights")[0]} id="name" onChange={(e) => setDurationnights(e.target.value)} />
                                    </div>


                        </div>
                        <p className='flex items-center'>
                        </p>
                    </div>

                    <p className='flex items-center sm:relative'>
                        <span className='w-52'>Enter Trip price</span>
                                    <div className=''>
                                        ₹
                                    <input required type="number" placeholder="Price" defaultValue={exdata.price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                        {/* {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>} */}
                    </p>
                </div>


                <div className='flex items-center'>
                    <p className="w-52">Select Trip type : </p>

                    <select name="val" id="selected">
                        <option> solo </option>
                        <option> petfriendly </option>
                        <option> workation </option>
                    </select>
                </div>


                <textarea defaultValue={exdata.description} required placeHolder="Trip description..." name="" id="" cols="70" rows="6" onChange={(e) => setDescripition(e.target.value)}></textarea>
                <div className='flex'>
                    <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
                    <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >Delete the trip</button>
                </div>


            </form>}
        </div>
    );
}

export default Edittrips;