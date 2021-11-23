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
    const [numberOfImages, setNumberOfImages] = useState(null)
    const [newimage, setNewimage] = useState([]);
    const [error, setError] = useState([]);
    const [imagepreview, setImagepreview] = useState([]);
    var [type, setType] = useState(null);

    useEffect(() => {
        console.log(title, content)
    }, [title, content])

    const createContent = (e, element) => {
        // setContent(e.target.value)
        let tempcontentarray = [];
        if (content) tempcontentarray = [...content]
        tempcontentarray[element] = e.target.value
        // tempcontentarray[element + 1] = " ";
        setContent([...tempcontentarray])

        // setContent((prev)=> ([
        //     ...prev, [element] : [e.target.value] 
        // ]))

    }

    const handleImageChange = (e, element) => {
        const selected = e.target.files[0];
        console.log(selected.type)
        if (selected && (selected.type.slice(0,5)) === "image") {
            let reader = new FileReader();
            reader.onloadend = () => {
                // setImagepreview(reader.result);
                let tempimagearray = [];
                if (imagepreview) tempimagearray = [...imagepreview]
                tempimagearray[element] = reader.result
                let tempcontentarray = [];
                if (content) tempcontentarray = [...content]
                tempcontentarray[element + 1] = " ";
                setContent([...tempcontentarray])
                setImagepreview([...tempimagearray])
                // setImagepreview((prev)=> ({
                //     ...prev, [element] : [reader.result] 
                // }))
            };
            reader.readAsDataURL(selected);
            //  imageabout();
            
            let tempnewimage = [];
            if (newimage) tempnewimage = [...newimage]
            tempnewimage[element] = selected
            setNewimage([...tempnewimage]);


            console.log(selected.type)
            type = selected.type
            type && setType(type.slice(0, 5))
            console.log(type)
            if (imagepreview !== {}) {
                    if (setNumberOfImages) {
                        setNumberOfImages(numberOfImages + 1)
                    }
                    else {
                        setNumberOfImages(1)
                    }
                }
        }
        else{
            alert("you can't add any format other than image")
        }
    }
    const submitBlog = () => {
        
        let data = new FormData();
        data.append("title", title)
        // newimage.forEach(file=>{
        //     data.append("image", file);
        //   })
        // var numberofimagesinthe = newimage.length
        // var imagesobject = {}
        var blogobject = {};
        for(var i = 0; i < numberOfImages; i ++)
        {
            // blogobject
            blogobject = Object.assign(blogobject,{ [i] :  [content[i]] })
            // imagesobject = Object.assign(imagesobject,JSON.stringify({ [i] : [newimage[i]]}))
            // imagesobject = {...imagesobject, `image${i}` : [newimage[i]]}
            data.append(`image${i}`, newimage[i])
        }
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log(imagesobject)
        // console.log("sdkfjlaskdjfldskjflkds0")
        // console.log("sdkfjlaskdjfldskjflkds0")
        data.append("blog", content)
        data.append("blogobject", JSON.stringify(blogobject))
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
        fullaxios({type : "post", url : "blog/create", data : data })
        .then(res =>{
            if(res){
                console.log(res)
                console.log(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        } )
    }
    return (

        <div className=' write-a-blog section pt-8 max-w-[1000px] flex flex-col items-start'>
            <p className='text-4xl'>Write a blog</p>


            <input className='w-full' type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter your title here" />
            {/* {!numberOfImages && content && 
<textarea className='w-full min-h-auto' value = {content[0]} onChange = {(e) => {createContent(e, 0)}} placeholder = "Enter your Blog here..." />
} */}
            <textarea className='w-full min-h-auto' onChange={(e) => { createContent(e, 0) }} placeholder="Enter your Blog here..." />

            {/* {console.log(imagepreview)} */}
            {!numberOfImages &&
                <img src={imagepreview[1]} />
            }
            {!numberOfImages &&
                <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, 0)} ref={inputRef} type="file" accept="image/*" />

            }
            {!numberOfImages &&
                <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>

            }

            {console.log("number of images: ", numberOfImages)}

            {/* <input  className='w-full' type="text" value = {title} onChange = {(e) => {setTitle(e.target.value)}}placeholder = "Enter your title here" />     */}
            {numberOfImages && imagepreview.map((image, element) => (
                <div>
                    {/* {console.log(image)} */}
                    {/* {console.log(imagepreview[element])} */}
                    {/* <input className='w-full min-h-auto' type="text" value = {content} onChange = {(e) => {createContent(e, element)}} placeholder = "Enter your Blog here..." /> */}
                    {console.log("everythign is working!!!!!!!!!!!!!!!")}
                    <img src={image} />

                    <input type="text" value={content[element + 1]} onChange={(e) => { createContent(e, element + 1) }} placeholder="Enter your Blog here..." />

                    <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, numberOfImages)} ref={inputRef} type="file" accept="image/*" />
                </div>
            ))}
            {/* {console.log(element)} */}
            {numberOfImages && <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, numberOfImages)} ref={inputRef} type="file" accept="image/*" />}
            {numberOfImages && <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>}
            {numberOfImages && <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={submitBlog}>Submit Blog</button>}
        </div>

    );
}

export default WriteABlog;