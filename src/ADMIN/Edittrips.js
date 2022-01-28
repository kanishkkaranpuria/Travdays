
import { useEffect, useRef, useState } from "react";
import fullaxios from "../components/FullAxios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";


const Edittrips  = () => {
    
    const {id} = useParams()
    const history = useHistory();
    
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
    const [duration1, setDuration1] = useState(null)
    const [duration2, setDuration2] = useState(null)
    const [durationnights, setDurationnights] = useState(null)
    const [picAdded, setPicAdded] = useState(1)
    const [deelete, setDeelete] = useState(false)

    
    const [error,setError] = useState([]);
    const [datas, setDatas] = useState([]);
    const [vdatas, setVdatas] = useState([]);
    const [videopreview, setVideopreview] = useState([])
    var [type, setType] = useState(null)

    useEffect(() => {
        if (durationnights && durationdays)
            setDuration(`${durationdays},${durationnights}`)
         if (durationnights )
            setDuration(`${duration1},${durationnights}`)    



        if (durationdays)
            setDuration(`${durationdays},${duration2}`)
        //"it should set")

    }, [durationnights, durationdays])

    useEffect(() => {
       console.log(duration)
    }, [duration])

    useEffect(() => {
        //duration)
        //"duration")

    }, [price, tripname])

    const Imagechangehandler = (e) => {
        //e.target.files)
        // //e.target.files.length )
        for (let i = 0; i < e.target.files.length; i++) {
            // //"rubbish")
        }

        const fileArray = Array.from(e.target.files).map((file, index) => ({
            "type": file.type,
            "media": URL.createObjectURL(file),
            //   "videos" : URL.createObjectURL(file)
        }))
        // //"has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        //fileArray)
        setImagepreview2((prevVideos) => prevVideos.concat(fileArray))
        setDatas(prev => [...prev, ...Array.from(e.target.files).map((file) => file)])
    }


    useEffect(() => {
        //datas)
        //imagepreview)
        //imagepreview.slice(2, 3))
        //[...imagepreview.slice(0, 1), ...imagepreview.slice(2,)])

    }, [datas, imagepreview])



    const SubmitMedia = (e) => {
        e.preventDefault();
        let formData = new FormData();
        //datas[0])
        let m = 0
        let n = 0
        formData.append(`id`, id)
        for (let i = 0; i < datas.length; i++) {
            //"rubbish")
            //datas[i])

            if (datas[i].type.slice(0, 5) === "image") {
                //"image gang")
                formData.append(`image${m}`, datas[i])
                m++
            }
            else if (datas[i].type.slice(0, 5) === "video") {

                formData.append(`video${n}`, datas[i])
                n++
            }
            //datas[i].type)
        }
    
    fullaxios({ url: 'trip/create/' , type:'post', data : formData , formdata : true   })
    .then((res)=>{
        //"res", res.data)
        alert("media submitted")
        //"done")
        setDatas([])
        setPicAdded(prev=>prev+1)
        setImagepreview2([])

        }
        
        )
        .catch(err => {
            //err)
            
        })
        
        
    }
    
    const Submit = (e) => {
        e.preventDefault();
        console.log(deelete)
        if(deelete!==true){
        var d = document.getElementById("selected");
        console.log(d.value)
        if(d!==null){
        let formData = new FormData();
        console.log(d.value)
        //id)

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
            formData.append(`duration`, duration )
        }


        //...formData)
        
        fullaxios({ url: 'trip/create/' , type:'patch', data : formData , formdata : true   })
        .then((res)=>{
            //"res", res.data)
            if(exdata.name!==tripname &&tripname!==null ){
                history.push("/tripedit/"+tripname+"/"+id)
            }
            alert("response submitted")
        }
            )
            .catch(err => {
                //err)

            })
        }
    }
    }

    //Edit page speciallllllllllllll
    const [exdata, setExdata] = useState(null)
    const [exmedia, setExmedia] = useState()
    const { name } = useParams();

    // useEffect(() => {
    //     if (durationnights && durationdays)
    //         setDuration(`${durationdays},${durationnights}`)
    //         //"it should set")
            
    //     },[durationnights,durationdays])
        useEffect(() => {
            //exdata)
        }, [exdata])
        
        const test = () => {
         
            //"duration")
            //exdata.duration)
          //exdata.duration.split(" Days ")[0])   
          //exdata.duration.split(" Days ")[1].split(" Nights")[0])
            }
        
        useEffect(() => {
            //duration)
                    //"duration")
                    
                },[price,tripname])
                
                useEffect(() => {
                    
                    fullaxios({ url: 'trip/' + name})
                    .then(res => {
                        setExdata(res.data)
                        
                        console.log(`${res.data.duration.split(" Days ")[0]},${res.data.duration.split(" Days ")[1].split(" Nights")[0]}`)
                        setDuration(`${res.data.duration.split(" Days ")[0]},${res.data.duration.split(" Days ")[1].split(" Nights")[0]}`)
                        setDuration1(`${res.data.duration.split(" Days ")[0]}`)
                        setDuration2(`${res.data.duration.split(" Days ")[1].split(" Nights")[0]}`)
                        console.log(res.data)
                    })
                    .catch(err => {
                        //err)
                    })
                    
                    
                    
                    fullaxios({ url: 'trip/admintripmedia/' + name})
                    // fullaxios({ url: 'trip/media2/' + name})
                    .then(res => {
                        //res.data)
                        setImagepreview (res.data)
                    })
                    .catch(err => {
                        //err)
                    })
                    
                },[picAdded])
                
                useEffect(() => {
                    //"exdata",exdata)
                    // //exdata.descripition)
                    
                }, [exdata])
                
                // const RemoveMedia = (n) => {
                //     setImagepreview(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                //     //imagepreview)
                // }
                
                const RemoveMedia2 = (n) => {
                    setImagepreview2(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                    setDatas(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                    //imagepreview)
                    
                }
                
                const DeleteMedia = (n,id) => {
                    let confirmBox = window.confirm("delete seriously?")
                    //confirmBox)
                    if(confirmBox===true){
                        fullaxios({ url: 'trip/deletemedia/' + id , type: "delete" })
                        .then(res => {
                            setImagepreview(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
                            //res.data )
                            //"deleted")
                        })
                        .catch(err => {
                            //err)
                })
            }
         }

         const DeleteTrip  = () => {
             setDeelete(true)
            let confirmBoxx = window.confirm("delete seriously?")
            //confirmBoxx)
            if(confirmBoxx===true){
                
                fullaxios({ url: 'trip/' + exdata.name , type: "delete" })
                .then(res => {
                    alert("trip deleted")
                    history.push("/packagespage")
                })
                .catch(err => {
                      })
               }
               setDeelete(false)
         }
              
    return ( 
        <div className="section">
                      
                        {/* <button className='edit-btn'onClick = {onClickFocus}>Change image</button> */}
                     
                        {exdata &&<form className='flex flex-col mx-auto max-w-[1000px] p-box-shadow-2 rounded-lg lg:p-8 mt-[5%] ' onSubmit={Submit}  action="">
                            <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Edit trips</span>
                            <br />
                            <span className='text-xl sm:text-xl sm:p-2 inline-block '>Delete existing media</span>
                            <p className='Arealcontainer'> 
                                    {/* {imagepreview &&  imagepreview.map((data,index)=>{
                                        //data.type)
                                        //data.image)
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
                                   {imagepreview &&  imagepreview.map((data,i)=>{
                                       
                                     if (imagepreview[i].type!==undefined){
                                        if( data.type.slice(0,5)==="image" ) { 
                                            return(
                                          <div className="Acontainer">
                                                <img className="imageee"  src={data.media} alt=""  /> 
                                                <div onClick={()=>{DeleteMedia(data.id)}} className="Amiddle">
                                                <div className="Atext">Delete</div>
                                                </div> 
                                          </div>
                                          )
                                        }
                                        else if (data.type.slice(0,5) === "video"){
                                          return(
                                              <div className="Acontainer">
                                                 <video className="imageee"  controls src={data.media }alt="" />
                                                    <div onClick={()=>{DeleteMedia(i,data.id)}} className="Amiddle">
                                                        <div className="Atext">Delete</div>
                                                        </div> 
                                              </div>
                                              )
                                        }
                                        }   
                                    
                                        if(data.image!==undefined){
                                              return(
                                                  <div id={i} className="Acontainer">
                                                     <img className="imageee" src={data.image} alt=""  />
                                                     <div className="Amiddle">
                                                        <div onClick={()=>{DeleteMedia(i,data.id)}}  className="Atext">Delete</div>
                                                        </div>  
                                              </div>
                                              )
                                            }
                                            else if (data.video!==undefined){
                                                return(
                                                    <div   className="Acontainer">
                                                       <video className="imageee" controls src={data.video }alt="" />
                                                       <div className="Amiddle">
                                                        <div onClick={()=>{DeleteMedia(i,data.id)}}  className="Atext">Delete</div>
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
                                       <input type="file" multiple style={{display:'none'}} name ="file" id="file" onChange={Imagechangehandler}   />
                                                       <label htmlFor="file">
                                                                  <p className=" sm:mx-auto m-2 p-2 w-40 bg-blue-500 font-semibold rounded-lg hover:bg-blue-700 text-white">add image  </p>
                                                       </label>
                                 <p className='Arealcontainer'>                           
                                                               {imagepreview2 &&  imagepreview2.map((data,i)=>{
                                       
                                       if (imagepreview2[i].type!==undefined){
                                          if( data.type.slice(0,5)==="image" ) { 
                                              return(
                                            <div className="Acontainer">
                                                  <img className="imageee"  src={data.media} alt=""  /> 
                                                  <div onClick={()=>{RemoveMedia2(i)}} className="Amiddle">
                                                  <div className="Atext">Delete</div>
                                                  </div> 
                                            </div>
                                            )
                                          }
                                          else if (data.type.slice(0,5) === "video"){
                                            return(
                                                <div className="Acontainer">
                                                   <video className="imageee"  controls src={data.media }alt="" />
                                                      <div onClick={()=>{RemoveMedia2(i)}} className="Amiddle">
                                                          <div className="Atext">Delete</div>
                                                          </div> 
                                                </div>
                                                )
                                          }
                                          }   
                                      
                                          if(data.image!==undefined){
                                                return(
                                                    <div id={i} className="Acontainer">
                                                       <img className="imageee" src={data.image} alt=""  />
                                                       <div className="Amiddle">
                                                          <div onClick={()=>{RemoveMedia2(i)}}  className="Atext">Delete</div>
                                                          </div>  
                                                </div>
                                                )
                                              }
                                              else if (data.video!==undefined){
                                                  return(
                                                      <div   className="Acontainer">
                                                         <video className="imageee" controls src={data.video }alt="" />
                                                         <div className="Amiddle">
                                                          <div onClick={()=>{RemoveMedia2(i)}}  className="Atext">Delete</div>
                                                          </div> 
                                                      </div>
                                                      )
                                            }
                                        
                                       })
                                       }
                                    </p>                           
                                     {imagepreview2.length!==0 &&   <button onClick={SubmitMedia} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'   >Add Media</button>}    
                                    <div className='sm:pb-4'> 
                                            <div className="">
                                            <p className='flex items-center'>
                                            <span className='w-52'>Enter Trip name :</span>
                                            <input defaultValue={exdata.name} required type="text" placeholder ="Tripname" onChange={(e) => setTripname(e.target.value) } />
                                            </p>
                                            <p className='flex items-center'>
                                            <span className='w-52'>Enter Location name :</span>
                                            <input defaultValue={exdata.location}  required type="text" placeholder ="Location" onChange={(e) => setLocation(e.target.value) } />
                                            </p>
                                    {/* <p className='flex items-center' >
                                    <span className='w-52'> existing duration: </span>
                                    <input  required type="text" placeholder = "no of days" id="name"   defaultValue={exdata.duration}  />
                                    </p> */}
                                    { exdata.duration===null ?
                                     <div className='flex items-center'>
                                     <span className='w-52'>Enter New duration :</span> 
 
                                     <p>days :</p>
                                     <input  required type="number"  id="name"   onChange={(e) => setDurationdays(e.target.value) } />
                                     <p>nights :</p>
                                     <input  required type="number"   id="name"   onChange={(e) => setDurationnights(e.target.value) } />
 
                                 
                                                 
                                         </div>  :
                                    <div className='flex items-center'>
                                     <span className='w-52'>Enter New duration :</span> 

                                    <div className="mr-2">
                                        <p>days :</p>
                                         <input required type="number" className="m-0" defaultValue={exdata.duration.split(" Days ")[0]} id="name" onChange={(e) => setDurationdays(e.target.value)} />
                                    </div>
                                    <div className="ml-2">
                                    <p>nights :</p>
                                    <input className="m-0" required type="number"  defaultValue={exdata.duration.split(" Days ")[1].split(" Nights")[0]} id="name"   onChange={(e) => setDurationnights(e.target.value) } />

                                
                                                
                                        </div>  
                                        </div>
                                          }
                                    <p className='flex items-center'>
                                    </p>
                                </div>
                                
                                    <p className='mt-4 flex items-center sm:relative'>
                                    <span className='w-52'>Enter Trip price</span>
                                    <div className="mr-2">
                                        <p>₹</p>
                                    <input className="mt-0" required type="number" placeholder = "Price" defaultValue={exdata.price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    {/* {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>} */}
                                    </p>
                                    </div>
                                
                                    
                            <div className='flex items-center'>
                            <p className="w-52">Select Trip type : </p>
                        {exdata.type==="solo"&& <select  name="val" id="selected">
                                <option> solo </option>   
                                <option> pet friendly </option>   
                                <option> workation </option>   
                                </select> }
                        {exdata.type==="pet friendly"&& <select  name="val" id="selected">
                                <option> pet friendly </option>   
                                <option> solo </option>   
                                <option> workation </option>   
                                </select> }
                        {exdata.type==="workation"&& <select  name="val" id="selected">
                                <option> workation </option>   
                                <option> solo </option>   
                                <option> pet friendly </option>   
                                </select> }
                                        
                         </div>    
                                        
                                     
                            <textarea defaultValue={exdata.description} required placeHolder = "Trip description..." name="" id="" cols="70" rows="6" onChange={(e) => setDescripition(e.target.value) }></textarea>
                            <div className='flex'>  
                            <p className=' sm:mx-auto m-2 p-2 w-40 bg-blue-500 font-semibold rounded-lg hover:bg-blue-700 text-white cursor-pointer' onClick={DeleteTrip}  >Delete the trip</p>
                            <button className=' sm:mx-auto  m-2 p-2 w-40 bg-blue-500 font-semibold rounded-lg hover:bg-blue-700 text-white ' type="submit"  >submit</button>
                            </div>
                            

            </form>}                       
                        </div>
     );
}

export default Edittrips;