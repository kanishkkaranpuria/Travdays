import { useEffect, useRef, useState } from "react";
import fullaxios from "./FullAxios";
const WriteABlog = () => {

    const inputRef = useRef();
    const onClickFocus = () => {
        console.log('Focus input');
        inputRef.current.click();
    }
    const [title, setTitle] = useState("")
    const [content, setContent] = useState(null)
    const [image, setImages] = useState()
    const [numberOfAllDatas, setNumberOfAllDatas] = useState(null)
    const [newimage, setNewimage] = useState([]);
    const [error, setError] = useState([]);
    const [imagepreview, setImagepreview] = useState([]);
    const [alldata, setAlldata] = useState([]);
    var [type, setType] = useState(null);

    // useEffect(() => {
    //     console.log(title, content)
    // }, [title, content])

    const createContent = (e, element) => {
        // setContent(e.target.value)
        console.log(e.target.value)
        if (e.target.value !== '\n'){
            let tempalldataforcontent = [];
            if (alldata) tempalldataforcontent = [...alldata]
                tempalldataforcontent[element] = e.target.value
                // tempalldataforcontent[element + 1] = "";
            setAlldata([...tempalldataforcontent])
        }
        // setContent((prev)=> ([
        //     ...prev, [element] : [e.target.value] 
        // ]))

    }

    const RemoveImage = () => {

    }

    const createNewPara = (e, element) =>{
        if (e.key === 'Enter') {
            // console.log('do validate');
            if (element+1 === numberOfAllDatas){
                let tempalldataforcontent = [];
                if (alldata) tempalldataforcontent = [...alldata]
                // tempalldataforcontent[element] = e.target.value
                tempalldataforcontent[element + 1] = "";
                setAlldata([...tempalldataforcontent])
                // console.log("anpad")
                // console.log(document.getElementById(`this ${element}`))
                // document.getElementById(`this ${element}`).focus();
            }
            else if(element+1 < numberOfAllDatas){
                let tempalldataforcontent1 = [];
                let tempalldataforcontent2 = [];
                let tempalldataforcontent = [];
                console.log(alldata)
                tempalldataforcontent1 = alldata.slice(0,element+1)
                tempalldataforcontent2 = alldata.slice(element+1)
                tempalldataforcontent = [...tempalldataforcontent1,"",...tempalldataforcontent2]
                console.log(tempalldataforcontent1)
                console.log(tempalldataforcontent2)
                console.log(tempalldataforcontent)
                setAlldata([...tempalldataforcontent])
            }

          }
    }

    const handleImageChange = (e, element) => {
        const selected = e.target.files[0];
        console.log(selected.type)
        if (selected && (selected.type.slice(0, 5)) === "image") {
            if (alldata[element-1] === "")element = element - 1;
            let reader = new FileReader();
            reader.onloadend = () => {
                // setImagepreview(reader.result);
                // let tempalldataForImage = [];
                let tempalldataForImage = [];
                if (alldata) tempalldataForImage = [...alldata]
                tempalldataForImage[element] = reader.result
                // setAlldata([...tempalldataForImage])
                
                let tempalldataForContent = [];
                tempalldataForContent = [...tempalldataForImage]
                tempalldataForContent[element + 1] = "";
                
                setAlldata([...tempalldataForContent])
                // setAlldata([...tempalldataForImage,])
                // setImagepreview((prev)=> ({
                //     ...prev, [element] : [reader.result] 
                // }))
            };
            reader.readAsDataURL(selected);
            //  imageabout();

            // let tempalldataForImage = [];
            // if (alldata) tempalldataForImage = [...alldata]
            // tempalldataForImage[element] = selected
            // console.log(tempalldataForImage)
            // setAlldata([...tempalldataForImage]);
            // console.log(tempalldataForImage)
            let tempnewimage = [];
            if (newimage) tempnewimage = [...newimage]
            tempnewimage[element] = selected
            setNewimage([...tempnewimage])
            console.log(tempnewimage)
            console.log(tempnewimage[element])

            console.log(selected.type)
            type = selected.type
            type && setType(type.slice(0, 5))
            console.log(type)
            // if (alldata !== {}) {
            //     if (setNumberOfAllDatas) {
            //         setNumberOfAllDatas(numberOfAllDatas + 2)
            //     }
            //     else {
            //         setNumberOfAllDatas(2)
            //     }
            // }
        }
        else {
            alert("you can't add any format other than image")
        }
    }
    useEffect(()=>{
        if (alldata.length>0)
        {setNumberOfAllDatas(alldata.length)
        
        console.log(alldata.length)
        if (numberOfAllDatas>0){
            console.log (document.getElementById(`this ${alldata.length-1}`))
            //  .focus();
            document.getElementById(`this ${alldata.length-1}`).focus();
        }
    }
    },[alldata])

    useEffect(()=>{
        console.log("total number of data:", numberOfAllDatas)
    },[numberOfAllDatas])

    const submitBlog = () => {

        let data = new FormData();
        data.append("title", title)
        // newimage.forEach(file=>{
        //     data.append("image", file);
        //   })
        // var numberOfAllDatasinthe = newimage.length
        // var imagesobject = {}
        // var blogobject = {};
        for (var i = 0; i < numberOfAllDatas; i++) {
            // blogobject
            // blogobject = Object.assign(blogobject,{ [i] :  [content[i]] })
            // imagesobject = Object.assign(imagesobject,JSON.stringify({ [i] : [newimage[i]]}))
            // imagesobject = {...imagesobject, `image${i}` : [newimage[i]]}
            data.append(`image${i}`, newimage[i])
            data.append(`blog${i}`, content[i])
        }
        data.append(`blog${numberOfAllDatas}`, content[numberOfAllDatas])
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log(imagesobject)
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log("sdkfjlaskdjfldskjflkds0")
        // data.append("blog", content)
        // data.append("blogobject", JSON.stringify(blogobject))
        data.append("displayImage", newimage[0])
        data.append("location", "mumbai")
        // data.append("imageinobject", JSON.stringify(imagesobject))
        // console.log(newimage)
        // let data = {
        //     "title" : title,
        //     "image" : [...newimage],
        //     "blog": [...content],
        //     "displayImage": newimage[0]
        // }
        // data = JSON.stringify(data)
        // console.log(data)
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ' - ' + pair[1]); 
        // }
        fullaxios({ type: "post", url: "blog/create", data: data, formdata: true })
            .then(res => {
                if (res) {
                    console.log(res)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (

        <div className=' write-a-blog section pt-8 max-w-[1000px] flex flex-col items-start'>
            <p className='text-4xl'>Write a blog</p>


            <input className='w-full' type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter your title here" />
            {/* {!numberOfAllDatas && content && 
<textarea className='w-full min-h-auto' value = {content[0]} onChange = {(e) => {createContent(e, 0)}} placeholder = "Enter your Blog here..." />
} */}
          <textarea className='w-full min-h-auto'  id = {`this 0`} onChange={(e) => { createContent(e, 0) }} placeholder="Enter your Blog here..." />

            {/* {console.log(imagepreview)} */}
            {!numberOfAllDatas &&
                <img src={imagepreview[1]}  id = {`this 1`} />
            }
            {!numberOfAllDatas &&<>
                <input style={{ display: 'none' }} name="awesome af"  onChange={e => handleImageChange(e, 1)} ref={inputRef} type="file" accept="image/*" />
                </>
            }
            {!numberOfAllDatas &&
                <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>

            }

            {/* <input  className='w-full' type="text" value = {title} onChange = {(e) => {setTitle(e.target.value)}}placeholder = "Enter your title here" />     */}
            {numberOfAllDatas && alldata.map((data, element) => (
                <div>
                    {/* {console.log(image)} */}
                    {/* {console.log(imagepreview[element])} */}
                    {/* <input className='w-full min-h-auto' type="text" value = {content} onChange = {(e) => {createContent(e, element)}} placeholder = "Enter your Blog here..." /> */}
                    {/* {console.log("everythign is working!!!!!!!!!!!!!!!")}
                    {console.log(data)} */}
                    {/* {data && console.log(data.slice(5,10))} */}
                    {/* {console.log(data.type)} */}
                    {/* {console.log("element number affffffff",element)}
                    {console.log(imagepreview[element])}
                    {console.log("everythign is working!!!!!!!!!!!!!!!")} */}
                    {
                        (data && (data.slice(5,10) === "image"))
                            ?
                            <>
                                <img src={data}  id = {`this ${element}`} />
                                <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, numberOfAllDatas)} ref={inputRef} type="file" accept="image/*" />
                            </>
                            :
                            <>
                            {element !== 0 && <textarea className='w-full min-h-auto' id = {`this ${element}`} value={data} onKeyDown = {(e) => {createNewPara(e, element)}} onChange={(e) => { createContent(e, element) }} placeholder="Enter your Blog here..." />}
                            </>
                        }
                            {/* <textarea className='w-full min-h-auto' onChange={(e) => { createContent(e, 0) }} placeholder="Enter your Blog here..." /> */}

                    {/* {element !== 0 && <textarea className='w-full min-h-auto' value={data} onChange={(e) => { createContent(e, element) }} placeholder="Enter your Blog here..." />} */}
                    {/* <button onClick = {()=>{RemoveImage}} >Remove image</button> */}

                    {/* <input type="text" value={content[element + 1]} onChange={(e) => { createContent(e, element + 1) }} placeholder="Enter your Blog here..." /> */}

                </div>
            ))}
            {/* {console.log(element)} */}
            {numberOfAllDatas && <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, numberOfAllDatas)} ref={inputRef} type="file" accept="image/*" />}
            {numberOfAllDatas && <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>}
            {numberOfAllDatas && <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={submitBlog}>Submit Blog</button>}
        </div>

    );
}

export default WriteABlog;