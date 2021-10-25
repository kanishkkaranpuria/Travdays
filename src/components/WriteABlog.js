import { useEffect, useRef, useState } from "react";
const WriteABlog = () => {
    
    const inputRef =useRef();
    const onClickFocus = () => {
        console.log('Focus input');
        inputRef.current.click();
    }
    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")
    const [image , setImages] = useState()
    const [numberOfImages, setNumberOfImages] = useState(null)
    const [newimage, setNewimage ] = useState([]);
    const [error,setError] = useState([]);
    const [imagepreview,setImagepreview] = useState(null);
    const [type, setType] = useState(null);
    
    useEffect(()=> {
        console.log(title, content)
    },[title, content])

    const createContent = (e) => {
        // setContent(e.target.value)
        setContent((prevContent,e) => {
            const x = e.target.value
            // return{...prevContent, return(contentnumberOfImages}) : x}
        } )
    }

    const handleImageChange = (e) => { 
        const selected = e.target.files[0];

            
         
        if ( selected ){
           let reader = new FileReader();
           reader.onloadend = () => {
               setImagepreview(reader.result);
               
           }; 
           reader.readAsDataURL(selected);
           //  imageabout();
           setNewimage(selected);
           console.log(selected.type)
           type = selected.type
           type && setType(type.slice(0,5))
           console.log(type)


       }  
       
       else {
           setError(true);
       }
   }

    return ( 
    
    <section>
        <h1>Write a blog</h1>
        
        {!numberOfImages && <section>
            <input type="text" value = {title} onChange = {(e) => {setTitle(e.target.value)}}placeholder = "Enter your title here" />    

            <input type="text" value = {content} onChange = {(e) => {createContent(e)}} placeholder = "Enter your Blog here..." />

            <input  style={{display:'none'}} name ="awesome af" onChange={console.log("heck yeah")} ref ={inputRef} type="file" />
            <button className="edit-btn" onClick={onClickFocus}>Gimme media</button>
            </section>}

        {numberOfImages && content.map((content, element)=>(
            <section>
            <input type="text" value = {title} onChange = {(e) => {setTitle(e.target.value)}}placeholder = "Enter your title here" />    

            <input type="text" value = {content[element]} onChange = {(e) => {createContent(e)}} placeholder = "Enter your Blog here..." />

            <input  style={{display:'none'}} name ="awesome af" onChange={console.log("heck yeah")} ref ={inputRef} type="file" />
            <button className="edit-btn" onClick={onClickFocus}>Gimme media</button>
            </section>

        ) )}
        
    </section> 
    
    );
}
 
export default WriteABlog;