import React, { useState, useEffect, useRef, useCallback } from 'react';


const Edittrips = () => {
    
    
    const [newimages, setNewimages ] = useState([]);
    const [imagepreview, setImagepreview] = useState([])
    const [tripname, setTripname] = useState(null)
    const [price, setPrice] = useState()
    const [location, setLocation] = useState(null)
    const [descripition, setDescripition] = useState(null)
    const [triptype, setTriptype] = useState(null)
    const [durationdays, setDurationdays] = useState(null)
    const [duration, setDuration] = useState(null)
    const [durationnights, setDurationnights] = useState(null)
     
    const [error,setError] = useState([]);
    const [datas, setDatas] = useState([]);
    
    var [type, setType] = useState(null)

    useEffect(() => {
        if(durationnights && durationdays)
        setDuration(`${durationdays},${durationnights}`)
        console.log("it should set")
    
    },[durationnights,durationdays])

    useEffect(() => {
        console.log(duration)
        console.log("duration")
       
    },[duration])

    useEffect(() => {
        console.log(duration)
        console.log("duration")
       
    },[price,tripname])

    const Imagechangehandler = (e) => {
        // setNewimages(e.target.files)
        console.log(e.target.files )
        const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
        // console.log("has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        console.log(fileArray)
        setImagepreview((prevImages)=>prevImages.concat(fileArray))
        setDatas([Array.from(e.target.files).map((file)=>file)])
       
    }


    useEffect(() => {
        console.log(datas)
        let formData = new FormData();
        // formData.append('pictu',newimages)
        // for (const File of newimages){
        //     console.log("lets gooo",File)
            formData.append('value[]',datas)
    
    for (const value of formData.values()) {
        console.log("value",value);
     }
    }, [datas])
     
    const Submit = () => {
       
        
    
    }
     
   
  

     
     const inputRef =useRef();
     const handleImageChange = (e) => { 
         const selected = e.target.files[0];
            console.log(type)
         

             
          
         if ( selected  ){
           
              console.log(type)
              let reader = new FileReader();
              console.log("there you go")
              reader.onloadend = () => {
                  setImagepreview(reader.result);
                  // console.log("is this even working")
                  
              }; 
              reader.readAsDataURL(selected);
              //  imageabout();
              setNewimages(selected);
              console.log(selected.type)
              type = selected.type
              type && setType(type.slice(0,5))
              // console.log(type) 
          }
        
        else if (type === "video"  || type === "audio") {
          alert("Pls select an image !")
        }
    }

        const onClickFocus = () => {
            console.log('Focus input');
            inputRef.current.click();
        }
 
    return ( 
        <div className="">
            <div >
            <input type="file" multiple style={{display:'none'}} name ="file" id="file" onChange={Imagechangehandler} ref ={inputRef}  />
                                    <label htmlFor="file">
                                        <i className="materail-icon">ADD IMAGE</i>
                                    </label>
                        <div className="row">  
                             
                        {/* <button className='edit-btn'onClick = {onClickFocus}>Change image</button> */}
                        {imagepreview &&  imagepreview.map((data)=>{
                            return(
                                <div className="column">
                                  <img src={data} alt=""  />   
                                </div>
                                )
                            })
                       }
                        <form className='flex flex-col mx-auto max-w-[800px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] '   action="">
                            <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Add trips</span>
                                
                                <div className='sm:pb-4'> 
                                     <div className="">
                                    <p className='flex items-center'>
                                    <span className='w-52'>Enter Trip name :</span>
                                    <input required type="text" placeholder ="Tripname" onChange={(e) => setTripname(e.target.value) } />
                                    </p>
                                    <p className='flex items-center'>
                                    <span className='w-52'>Enter Location name :</span>
                                    <input required type="text" placeholder ="Location" onChange={(e) => setLocation(e.target.value) } />
                                    </p>
                                    
                                    <div className='flex items-center'>
                                    <span className='w-52'>Enter Trip duration :</span> 
                                    <p>days :</p>
                                    <input  required type="number" placeholder = "no of days" id="name" onChange={(e) => setDurationdays(e.target.value) } />
                                    <p>nights :</p>
                                    <input  required type="number" placeholder = "no of nights" id="name" onChange={(e) => setDurationnights(e.target.value) } />

                                
                                                
                                        </div>    
                                    <p className='flex items-center'>
                                    </p>
                                </div>
                                
                                    <p className='flex items-center sm:relative'>
                                    <span className='w-52'>Enter Trip price....................: Rs</span>
                                    <input type="number" placeholder = "Price"  onChange={(e) => setPrice(e.target.value)} />
                                    {/* {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>} */}
                                    </p>
                                    </div>
                                
                                    
                            <div className='flex'>
                            <p>Select Trip type : </p>
                        
                                <select name="val" id="selected">
                                <option> solo </option>   
                                <option> petfriendly </option>   
                                <option> workation </option>   
                                </select>          
                         </div>    
                                        
                          
                            <textarea placeHolder = "Trip description..." name="" id="" cols="70" rows="6" onChange={(e) => setDescripition(e.target.value) }></textarea>
                            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >submit</button>
                            
             

            </form>                       
                        </div>
                         </div>
        </div>
     );
}
 
export default Edittrips;