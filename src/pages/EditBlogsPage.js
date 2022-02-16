import { useEffect, useMemo, useRef, useState } from "react";
import fullaxios from "../components/FullAxios";
import TextareaAutosize from "react-textarea-autosize"
import { useHistory } from "react-router";
import Logoutmodal from "../components/Logoutmodal";
import { useLocation } from "react-router-dom";
const EditBlogsPage = (props) => {

    const [tempalldata, setTempAllData] = useState([""])
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
    let locations = useLocation();
    console.log("oof", locations.state.data[0])
    const data = locations.state.data[0]
    const ogid = data.id
    //  const ogimage = data.image
    //  const oglocation = data.location
    //  const ogtitle = data.title
    // ***Here is code for converting "Base64" to javascript "File Object".***

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        filename += "." + mime.slice(6)
        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        toDataURL(displayImage)
            .then(dataUrl => {
                // console.log('Here is Base64 Url', dataUrl)
                var fileData = dataURLtoFile(dataUrl, "displayImage");
                // // console.log("Here is JavaScript File Object",fileData)
                // res.data[number] = fileData
                // res.data[number] = dataUrl
                // // console.log("we got this",fileData)
                // fileData
                setDisplayImage(fileData)
                // fileArr.push(fileData)
            })

        fullaxios({ url: `blog/edit/${data.id}` })
            .then(res => {
                console.log("find me", res.data)
                Object.keys(res.data).map((number, i) => {
                    // console.log("find me",number)
                    // console.log("find me",res.data[number])

                    if (res.data[number].slice(-3) === "img") {
                        //   console.log("find me",res.data[number].slice(0,-4))
                        toDataURL(res.data[number].slice(0, -4))
                            .then(dataUrl => {
                                // console.log('Here is Base64 Url', dataUrl)
                                // var fileData = dataURLtoFile(dataUrl, `imageName${number}`);
                                // // console.log("Here is JavaScript File Object",fileData)
                                // res.data[number] = fileData
                                // res.data[number] = dataUrl
                                // // console.log("we got this",fileData)
                                tempalldata[i] = dataUrl
                                // fileArr.push(fileData)
                            })
                    }
                    else if (res.data[number].slice(-3) === "par") {
                        // res.data[number] = res.data[number].slice(0,-4)
                        tempalldata[i] = res.data[number].slice(0, -4)
                        console.log("find me", res.data[number].slice(0, -4))

                    }
                })
                // alldata = Object.assign(res.data)
                setnotfirstrender(false)
                setAlldata(tempalldata)
            })
    }, [])
    var numberOfAllImages = useRef(0)
    const inputRef = useRef();
    const onClickFocus = () => {
        // console.log('Focus input');
        inputRef.current.click();
    }
    const history = useHistory();
    const [title, setTitle] = useState(data.title)
    const [content, setContent] = useState(null)
    const [image, setImages] = useState()
    const [numberOfAllDatas, setNumberOfAllDatas] = useState(0)
    // const [numberOfAllImages, setNumberOfAllImages] = useState(0)
    var [newimage, setNewimage] = useState({});
    const [error, setError] = useState([]);
    const [imagepreview, setImagepreview] = useState([]);
    const [alldata, setAlldata] = useState([""]);
    // var [type, setType] = useState(null);
    var temp = useRef(null)
    var backspacedlocation = useRef(null)
    var textarearef = useRef(null)
    var removespace = useRef(false)
    const [temp1, setTemp1] = useState(null)
    const [writeblog, setWriteblog] = useState(true)
    const [publishblog, setPublishblog] = useState(false)
    const [notfirstrender, setnotfirstrender] = useState(false)
    const [displayImage, setDisplayImage] = useState(data.image)
    const [previewdisplayImage, setPreviewdisplayImage] = useState(data.image)
    const [anonymous, setAnonymous] = useState(false)
    const [bloglocation, setBloglocation] = useState(data.location)
    //modallllll
    const [isopen, setIsopen] = useState(false);
    const [p1, setP1 ]= useState("")
    const [heading, setHeading] = useState("")

    // console.log(temp.current)
    // useEffect(() => {
    //     console.log(title, content)
    // }, [title, content])
    // console.log("we got this", numberOfAllDatas, notfirstrender)
    // console.log("we got this", )

    const createContent = (e, element) => {
        // setContent(e.target.value)
        // console.log(e.target.value)
        if (e.target.value !== '\n') {
            let tempalldataforcontent = [];
            if (alldata) tempalldataforcontent = [...alldata]
            tempalldataforcontent[element] = e.target.value
            // tempalldataforcontent[element + 1] = "";
            temp.current = element;
            backspacedlocation.current = null;
            setAlldata([...tempalldataforcontent])
        }
        // setContent((prev)=> ([
        //     ...prev, [element] : [e.target.value] 
        // ]))

    }

    // console.log(numberOfAllDatas)
    const paraKeyControl = (e, element, type) => {
        // console.log(type)
        // console.log(textarearef.current.selectionStart)
        // var removespace = false;

        // if (alldata[element].includes("\n")){
        //     var tempforenter = [...alldata]
        //     tempforenter[temp.current] = alldata[temp.current].replace(/\n/g, "")
        //     console.log("this should work")
        //     console.log(tempforenter)
        //     setAlldata(...tempforenter)
        //     // setAlldata(...alldata.splice(0, temp),alldata[temp].replace(/\n/g, ""))
        // }
        const { selectionStart, selectionEnd } = e.target
        if (type === "para") {
            // console.log(e.target.value.substr(0, selectionStart).split("\n").length)
            // console.log(selectionEnd)
            // console.log(selectionStart)
            // console.log(window.innerWidth)

            // 1536
            // 123
            // 1158
            // 91

            // 6.6
            // 16.11
            // 18.8
            // 23.6
            // 21.6
            // final 15
            var lastlinestatus;
            var firstlinestatus;
            // console.log(e.target.value.length)
            // console.log(window.innerWidth)
            // window.innerWidth/15 = w-2/3
            // window.innerWidth/10 = w-full
            // console.log(window.innerWidth)
            var char;
            if (window.innerWidth > 450) {
                char = parseFloat(window.innerWidth / 15).toFixed()
            }
            else if (window.innerWidth <= 450) {
                char = parseFloat(window.innerWidth / 10).toFixed()
            }
            // console.log("number of characters in every line", char)
            char = char - 1
            var charpercent = ((e.target.value.length / char) - Math.floor(e.target.value.length / char)) * char
            if (charpercent < (e.target.value.length - selectionStart)) lastlinestatus = false;
            else lastlinestatus = true;

            if (selectionStart < char) firstlinestatus = true
            else firstlinestatus = false;
            // console.log(selectionStart / char)
            // console.log("you are on line number:", (selectionStart / char).toFixed())
            // console.log("the real line number:", Math.floor(selectionStart / char))
            // console.log("your last line status:", lastlinestatus)
            // console.log("your first line status:", firstlinestatus)
        }
        if (type !== "para" && type !== "image" && type !== "title") {
            // console.log('stop wasting your time')
        }
        else if ((type === "para" && selectionStart === selectionEnd) || (type === 'title' && selectionStart === selectionEnd) || type === 'image') {
            if (type === "title") {
                // // console.log(document.getElementById(`this 0`))
                if (e.key === "Enter" || e.key === "ArrowDown" || (e.key === "ArrowRight" && !title) || (e.key === "ArrowRight" && title && selectionStart === title.length)) {
                    e.preventDefault();

                    document.getElementById(`this 0`).focus();
                    if (e.key === "ArrowRight") {
                        document.getElementById(`this 0`).setSelectionRange(0, 0);

                    }
                }
            }
            else {


                // console.log(e.target.files[0])
                if (e.key === 'Enter' && type === "para") {
                    // console.log('do validate');
                    e.preventDefault();
                    backspacedlocation.current = "zero";
                    if (numberOfAllDatas === 0 && e.target.value === "") {
                        // console.log(element)
                        temp.current = element + 1
                        // backspacedlocation.current = null;
                        setAlldata(['', ''])
                    }
                    else if (element + 1 === numberOfAllDatas) {
                        // let tempalldataforcontent = [];
                        // if (alldata) tempalldataforcontent = [...alldata]
                        // tempalldataforcontent[element] = e.target.value

                        // tempalldataforcontent[element + 1] = "";
                        // setAlldata([...tempalldataforcontent])

                        // var temp1 = alldata[element].slice(0, selectionStart)
                        // var temp2 = alldata[element].slice(selectionStart, alldata[element+1].length)

                        temp.current = null
                        // console.log([alldata[element].slice(0, selectionStart).replace(/\n/g, ""), alldata[element].slice(selectionStart, alldata[element].length).replace(/\n/g, "")])
                        var temp1 = [alldata[element].slice(0, selectionStart).replace(/\n/g, ""), alldata[element].slice(selectionStart, alldata[element].length).replace(/\n/g, "")]
                        // removespace = true
                        // backspacedlocation.current = null;
                        // backspacedlocation.current = "zero";
                        setAlldata([...alldata.slice(0, element), ...temp1])
                        // console.log("anpad")
                        // console.log(document.getElementById(`this ${element}`))
                        // document.getElementById(`this ${element}`).focus();
                    }
                    else if (element + 1 < numberOfAllDatas) {
                        let n = element
                        // let tempalldataforcontent1 = [];
                        // let tempalldataforcontent2 = [];
                        // let tempalldataforcontent = [];
                        // console.log(alldata)
                        // tempalldataforcontent1 = alldata.slice(0,element+1)
                        // tempalldataforcontent2 = alldata.slice(element+1)
                        // tempalldataforcontent = [alldata.slice(0,element),alldata.slice(element+1)]
                        // tempalldataforcontent = [...tempalldataforcontent1,"",...tempalldataforcontent2]
                        // console.log(tempalldataforcontent1)
                        // console.log(tempalldataforcontent2)
                        // console.log(tempalldataforcontent)
                        // setAlldata([...tempalldataforcontent])
                        temp.current = element + 1;
                        var temp2 = [alldata[element].slice(0, selectionStart).replace(/\n/g, ""), alldata[element].slice(selectionStart, alldata[element].length).replace(/\n/g, "")]
                        setAlldata([...alldata.slice(0, element), ...temp2, ...alldata.slice(element + 1)])

                    }

                }
                if (e.key === 'Enter' && type === "image") {
                    backspacedlocation.current = null;
                    e.preventDefault();
                    // console.log('here')
                    // console.log(element + 1)
                    // console.log(numberOfAllDatas)
                    if (element + 1 === numberOfAllDatas) {
                        // console.log('here')
                        temp.current = null
                        setAlldata([...alldata.slice(0, element + 1), ""])
                    }
                    else if (element + 1 < numberOfAllDatas) {
                        temp.current = element + 1;
                        setAlldata([...alldata.slice(0, element + 1), "", ...alldata.slice(element + 1)])

                    }

                }
                else if (e.key === 'Backspace' && type === "para" && selectionStart === 0) {
                    e.preventDefault();
                    if (element + 1 === numberOfAllDatas && element !== 0) {
                        temp.current = null
                        // console.log("simple wala")
                        // console.log(alldata[element - 1])
                        // console.log(alldata[element - 1].length)
                        // console.log(alldata[element])
                        if (alldata[element - 1].slice(0, 11) === "data:image/") {
                            backspacedlocation.current = null
                        }
                        else if (alldata[element - 1].length === 0) {
                            backspacedlocation.current = "zero"
                        }
                        else {
                            backspacedlocation.current = alldata[element - 1].length
                            // console.log(backspacedlocation.current)
                        }
                        var temptrial1 = alldata[element - 1] + alldata[element]
                        // console.log(temptrial1)
                        setAlldata([...alldata.slice(0, element - 1), temptrial1])
                    }
                    else if (element + 1 < numberOfAllDatas && element !== 0) {
                        temp.current = element - 1
                        // setAlldata([...alldata.slice(0,element)])
                        if (alldata[element - 1].slice(0, 11) === "data:image/") {
                            backspacedlocation.current = null
                        }
                        else if (alldata[element - 1].length === 0) {
                            backspacedlocation.current = "zero"
                        }
                        else {
                            backspacedlocation.current = alldata[element - 1].length
                        }
                        var temptrial2 = alldata[element - 1] + alldata[element]
                        setAlldata([...alldata.slice(0, element - 1), temptrial2, ...alldata.slice(element + 1)])
                    }
                }
                else if ((e.key === 'Backspace') && (type === "image")) {
                    backspacedlocation.current = null;
                    numberOfAllImages.current = numberOfAllImages.current - 1;
                    e.preventDefault();
                    if (element + 1 === numberOfAllDatas && element !== 0) {
                        temp.current = null
                        setAlldata([...alldata.slice(0, element)])
                    }
                    else if (element + 1 < numberOfAllDatas && element !== 0) {
                        temp.current = element - 1
                        // setAlldata([...alldata.slice(0,element)])
                        setAlldata([...alldata.slice(0, element), ...alldata.slice(element + 1)])
                    }
                }
                // else if((e.key === 'Backspace' && e.target.files))

                else if ((e.key === 'ArrowUp' && firstlinestatus) || (e.key === 'ArrowUp' && type === "image")) {
                    // backspacedlocation.current = null;
                    e.preventDefault();
                    // temp.current = element - 1
                    if (element !== 0) {
                        document.getElementById(`this ${element - 1}`).focus();
                        // console.log("this works")
                        if (alldata[element - 1].slice(0, 11) !== "data:image/") {

                            document.getElementById(`this ${element - 1}`).setSelectionRange(alldata[element - 1].length, alldata[element - 1].length)
                            // console.log(document.getElementById(`this ${element - 1}`).setSelectionRange(alldata[element-1].length, alldata[element-1].length))
                        }
                    }
                    else {
                        document.getElementById(`title`).focus();
                        // console.log(title.length)
                        title && document.getElementById(`title`).setSelectionRange(title.length, title.length)
                        // console.log(document.getElementById(`title`).setSelectionRange(title.length, title.length))
                    }
                }

                else if ((e.key === 'ArrowDown' && element + 1 < numberOfAllDatas && lastlinestatus) || (e.key === 'ArrowDown' && element + 1 < numberOfAllDatas && type === "image")) {
                    e.preventDefault();
                    // backspacedlocation.current = null;
                    // temp.current = element + 1
                    document.getElementById(`this ${element + 1}`).focus();
                    // if (alldata[element+1])
                }
                else if (e.key === 'ArrowRight' && element + 1 < numberOfAllDatas && type === "para" && selectionStart === e.target.value.length) {
                    // console.log("it works")
                    e.preventDefault();
                    // backspacedlocation.current = null;
                    // temp.current = element + 1
                    document.getElementById(`this ${element + 1}`).focus();
                    // if (alldata[element+1])
                    if (alldata[element + 1].slice(0, 11) !== "data:image/") {

                        document.getElementById(`this ${element + 1}`).setSelectionRange(0, 0)
                        // console.log(document.getElementById(`this ${element - 1}`).setSelectionRange(alldata[element-1].length, alldata[element-1].length))
                    }
                }
                else if (e.key === 'ArrowLeft' && type === "para" && selectionStart === 0) {
                    e.preventDefault();
                    if (element !== 0) {
                        // console.log("it works")
                        // backspacedlocation.current = null;
                        // temp.current = element + 1
                        document.getElementById(`this ${element - 1}`).focus();
                        // if (alldata[element+1])
                        if (alldata[element - 1].slice(0, 11) !== "data:image/") {

                            document.getElementById(`this ${element - 1}`).setSelectionRange(alldata[element - 1].length, alldata[element - 1].length)
                            // console.log(document.getElementById(`this ${element - 1}`).setSelectionRange(alldata[element-1].length, alldata[element-1].length))
                        }

                    }
                    else if (element === 0) {
                        // console.log("it works")
                        // backspacedlocation.current = null;
                        // temp.current = element + 1
                        document.getElementById(`title`).focus();
                        title && document.getElementById(`title`).setSelectionRange(title.length, title.length)

                    }

                }
            }

        }
    }


    const handleImageChange = (e, element) => {
        const selected = e.target.files[0];
        // console.log(selected.type)
        if (selected && (selected.type.slice(0, 5)) === "image") {
            if (numberOfAllImages.current < 8) {
                // if (alldata[element-1] === "")element = element - 1;
                backspacedlocation.current = null;
                newimage = Object.assign(newimage, { [element]: selected })
                let reader = new FileReader();
                reader.onloadend = () => {
                    // setImagepreview(reader.result);
                    // let tempalldataForImage = [];
                    let tempalldataForImage = [];
                    if (alldata) tempalldataForImage = [...alldata]
                    tempalldataForImage[element] = reader.result
                    // setAlldata([...tempalldataForImage])
                    // setAlldata([...alldata, reader.result, ])
                    numberOfAllImages.current = numberOfAllImages.current + 1
                    if (element + 1 === numberOfAllDatas) {
                        let tempalldataForContent = [];
                        tempalldataForContent = [...tempalldataForImage]
                        tempalldataForContent[element + 1] = "";
                        temp.current = null;
                        setAlldata([...tempalldataForContent])
                    }
                    else if (numberOfAllDatas === 1) {
                        let tempalldataForContent = [];
                        tempalldataForContent = [...tempalldataForImage]
                        tempalldataForContent[element + 1] = "";
                        temp.current = element + 1;
                        setAlldata([...tempalldataForContent])
                    }
                    else {
                        temp.current = element + 1
                        setAlldata([...tempalldataForImage])
                    }
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


                // let tempnewimage = [];
                // if (newimage) tempnewimage = [...newimage]
                // tempnewimage[element] = selected
                // newimage = Object.assign(newimage, {[element] : selected})
                // newimage[element] = selected;
                // setNewimage([...tempnewimage])


                // console.log(tempnewimage)
                // console.log(tempnewimage[element])

                // console.log(selected.type)
                // type = selected.type
                // type && setType(type.slice(0, 5))
                // console.log(type)
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
                setIsopen(true);
                setHeading("Max number reached")
                setP1("The maximum number of images in one blog is 8")
                // alert("the maximum number of images in one blog is 8")
            }
        }
        else {
            setIsopen(true);
            setHeading("Select a proper format")
            setP1("You can't add any format other than image")
            // alert("you can't add any format other than image")
        }
    }


    // var inputURL ="";

    // var blobObject = blobCreationFromURL(inputURL);

    // Create Blob file from URL
    // function blobCreationFromURL(inputURI) {

    //     var binaryVal;

    //     // mime extension extraction
    //     var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

    //     // Extract remaining part of URL and convert it to binary value
    //     if (inputURI.split(',')[0].indexOf('base64') >= 0)
    //         binaryVal = atob(inputURI.split(',')[1]);

    //     // Decoding of base64 encoded string
    //     else
    //         binaryVal = unescape(inputURI.split(',')[1]);

    //     // Computation of new string in which hexadecimal
    //     // escape sequences are replaced by the character 
    //     // it represents

    //     // Store the bytes of the string to a typed array
    //     var blobArray = [];
    //     for (var index = 0; index < binaryVal.length; index++) {
    //         blobArray.push(binaryVal.charCodeAt(index));
    //     }

    //     return new Blob([blobArray], {
    //         type: "image/jpeg"
    //     });
    // }

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        filename = filename + "." + mime.slice(-4)
        return new File([u8arr], filename, { type: mime });
    }


    //Usage example:
    // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
    // console.log(file);

    useEffect(() => {
        console.log("we got this", alldata)
        console.log("we got this", alldata.length)
        // if (){
        //     if (temp.current === null){
        //         removespace = false
        //         setAlldata(...alldata.splice(0, alldata.length-1),alldata[alldata.length-1].replace(/\n/g, ""))
        //     }
        //     else{
        //         removespace = false
        //         setAlldata(...alldata.splice(0, temp),alldata[temp].replace(/\n/g, ""))
        //     }
        // }
        // console.log(alldata)
        // console.log(title)
        // console.log(alldata.length)
        // console.log(notfirstrender)
        setNumberOfAllDatas(alldata.length)
        if (notfirstrender) {
            if (alldata[0] === '' && alldata.length === 1) {
                document.getElementById('title').focus();
            }
            else if (alldata.length > 0) {

                if (temp.current === null) {
                    // console.log (document.getElementById(`this ${alldata.length-1}`))
                    //  .focus();
                    document.getElementById(`this ${alldata.length - 1}`).focus();
                    if (backspacedlocation.current) document.getElementById(`this ${alldata.length - 1}`).setSelectionRange(backspacedlocation.current, backspacedlocation.current);
                    else if (backspacedlocation.current === "zero") document.getElementById(`this ${alldata.length - 1}`).setSelectionRange(0, 0);
                    // if (alldata[alldata.length-1].includes("\n")){
                    //     var tempforenter = [...alldata]
                    //     console.log("this should work")
                    //     tempforenter[alldata.length-1] = alldata[alldata.length-1].replace(/\n/g, "")
                    //     setAlldata(...tempforenter)
                    // }
                    // setTemp1(alldata.length -1)
                }
                else if (temp.current === "title") {

                    document.getElementById('title').focus();
                }
                else {

                    // console.log(document.getElementById(`this ${temp.current}`))
                    // console.
                    document.getElementById(`this ${temp.current}`).focus();
                    if (backspacedlocation.current) {
                        document.getElementById(`this ${temp.current}`).setSelectionRange(backspacedlocation.current, backspacedlocation.current)
                    }
                    else if (backspacedlocation.current === "zero") document.getElementById(`this ${alldata.length - 1}`).setSelectionRange(0, 0);

                    // if (alldata[temp.current].includes("\n")){
                    //     var tempforenter = [...alldata]
                    //     tempforenter[temp.current] = alldata[temp.current].replace(/\n/g, "")
                    //     console.log("this should work")
                    //     console.log(tempforenter)
                    //     setAlldata(...tempforenter)
                    //     // setAlldata(...alldata.splice(0, temp),alldata[temp].replace(/\n/g, ""))
                    // }
                    // setTemp1(temp.current)
                }
            }
        }
        else {
            setnotfirstrender(true);
            // console.log(alldata)
            // if (alldata[0] != [""]){
            //     console.log('here')
            //     document.getElementById(`this 0`).focus();
            // }
            setTimeout(() => {
                document.getElementById(`this 0`).focus()
            }, 500);
        }

    }, [alldata])
    // console.log(document.getElementById(`this 0`))

    // useEffec1t(()=>{
    //     console.log("total number of data:", numberOfAllDatas)
    // },[numberOfAllDatas])

    // useEffect(()=>{
    //     console.log(temp.current)
    //     console.log(temp1)
    //     if (temp.current === null){
    //         setTemp1(alldata.length -1)
    //     }
    //     else{
    //         setTemp1(temp.current)
    //     }
    // },[temp.current])
    const handledisplayimage = (e) => {
        const selected = e.target.files[0];
        // console.log(selected.type)
        if (selected && (selected.type.slice(0, 5)) === "image") {
            // if (alldata[element-1] === "")element = element - 1;
            // backspacedlocation.current = null;
            // newimage = Object.assign(newimage, { [element]: selected })
            let reader = new FileReader();
            reader.onloadend = () => {
                // setImagepreview(reader.result);
                // let tempalldataForImage = [];
                // let tempalldataForImage = [];
                // if (alldata) tempalldataForImage = [...alldata]
                // tempalldataForImage[element] = reader.result
                // return reader.result
                setPreviewdisplayImage(reader.result);
            };
            reader.readAsDataURL(selected);
            setDisplayImage(selected);
        }
        else {
            setIsopen(true)
            setHeading("Select valid format")
            setP1("You can't add any format other than image")
            // alert("you can't add any format other than image")
        }
    }
    const ActuallyPublishingtheBlog = () => {

        return (
            <div className="w-1/3 flex flex-col justify-center items-center">
                <p className="text-4xl p-5 font-bold">Blog Preview</p>
                <input style={{ display: 'none' }} name="awesome af" onChange={e => (handledisplayimage(e))} ref={inputRef} type="file" accept="image/*" />
                {/* {displayImage && <img src= {handledisplayimage(displayImage)}/>}  */}
                {/* {console.log(previewdisplayImage)} */}
                {/* {console.log(displayImage)} */}

                {previewdisplayImage && <img src={previewdisplayImage} />}
                {!previewdisplayImage && <button className='p-1 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto hover:bg-blue-700 text-white font-bold ' onClick={onClickFocus}>Set Display Image</button>}
                {previewdisplayImage && <button className='p-2 w-60 bg-blue-500 font-semibold rounded-lg sm:mx-auto hover:bg-blue-700 text-white font-bold ' onClick={onClickFocus}>Change Display Image</button>}

                <input maxLength="100" minLength="1" className='w-full font-semibold text-lg leading-none bg-transparent' type="text" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter your title here..." />

                <div className="flex p-5 w-full justify-between items-center">
                    <p className="text-xl font-semibold">Location of Your Blog:</p>
                    <input type="text" className="text-xl leading-none bg-transparent w-1/2 font-semibold" placeholder="For eg: Mumbai" value={bloglocation} onChange={(e) => { setBloglocation(e.target.value) }} />
                </div>

                {anonymous ? <button onClick={(() => { setAnonymous(false) })} className=' sm:mx-auto text-xl  w-full bg-white-500 font-semibold rounded-lg'> Do you want to keep your identity hidden? &#9745;</button> :
                    <button onClick={(() => { setAnonymous(true) })} className=' sm:mx-auto text-xl  w-full bg-white-500 font-semibold rounded-lg'> Do you want to keep your identity hidden? &#9744;</button>}

                <div className="flex p-5 w-full justify-between">
                    <button className="p-3 w-1/3 bg-blue-500 font-semibold rounded-lg sm:mx-auto  hover:bg-blue-700 text-white font-bold " onClick={() => { setPublishblog(false); setWriteblog(true); }}>Go Back</button>
                    <button className="p-3 w-1/3 bg-blue-500 font-semibold rounded-lg sm:mx-auto    hover:bg-blue-700 text-white font-bold " onClick={() => { submitBlog() }}>Publish Now</button>
                </div>
                <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg={heading} p1={p1} p2="" />

            </div>
        )

    }
    const submitBlog = () => {

        if (title && numberOfAllDatas && displayImage && bloglocation) {
            let data = new FormData();
            data.append("id", ogid)
            data.append("title", title)
            // newimage.forEach(file=>{
            //     data.append("image", file);
            //   })
            // var numberOfAllDatasinthe = newimage.length
            // var imagesobject = {}
            // var blogobject = {};
            var j = 0;
            // console.log(newimage)
            for (var i = 0; i < numberOfAllDatas; i++) {
                // blogobject
                // blogobject = Object.assign(blogobject,{ [i] :  [content[i]] })
                // imagesobject = Object.assign(imagesobject,JSON.stringify({ [i] : [newimage[i]]}))
                // imagesobject = {...imagesobject, `image${i}` : [newimage[i]]}



                if (alldata[i].slice(0, 11) === "data:image/") {
                    //     // data.append(newimage[i]
                    //     // console.log(newimage[i])
                    if (newimage[i]) {
                        data.append(`data${i}`, newimage[i])
                        // if (j === 0) {
                        // // data.append("displayImage", newimage[i])
                        //     data.append("displayImage", newimage[i]);
                        //     j++;
                        // }
                    }
                    else {
                        data.append(`data${i}`, dataURLtoFile(alldata[i], `image${i}`))
                        //     // if (j === 0) {
                        //     //     data.append("displayImage", alldata[i]);
                        //     //     j++;
                        //     // }
                    }
                    // console.log(newimage)


                }

                else {

                    // data.append(`image${i}`, newimage[i])
                    data.append(`data${i}`, alldata[i])

                }
            }
            // data.append(`blog${numberOfAllDatas}`, content[numberOfAllDatas])
            // console.log("sdkfjlaskdjfldskjflkds0")
            // console.log("sdkfjlaskdjfldskjflkds0")
            // console.log(imagesobject)
            // console.log("sdkfjlaskdjfldskjflkds0")
            // console.log("sdkfjlaskdjfldskjflkds0")
            // data.append("blog", content)
            // data.append("blogobject", JSON.stringify(blogobject))
            // data.append("displayImage");
            toDataURL(displayImage)
                .then(dataUrl => {
                    // console.log('Here is Base64 Url', dataUrl)
                    var fileData = dataURLtoFile(dataUrl, "displayImage");
                    // // console.log("Here is JavaScript File Object",fileData)
                    // res.data[number] = fileData
                    // res.data[number] = dataUrl
                    // // console.log("we got this",fileData)
                    // fileData
                    data.append("displayImage", fileData)
                    // fileArr.push(fileData)
                })
            data.append("displayImage", displayImage)
            data.append("location", bloglocation)
            data.append("anonymous", anonymous)
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
            console.log(...data)
            fullaxios({ type: "patch", url: `blog/edit`, data: data, formdata: true })
                .then(res => {
                    if (res) {
                        console.log(res)
                        console.log(res.data)
                        setIsopen(true)
                        setHeading("Response Submitted")
                        setP1("Your blog has been edited")
                        history.push('/myblogs')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            setIsopen(true)
            setHeading("Fill the requirements")
            setP1("You need to add the Title, some Data, the Display Image and the Blog Location before you submit the blog.")
        }
    }
    var lmao;
    const Actuallywritingtheblog = () => {
        // console.log("wtf")
        return (
            <div className='write-a-blog p-box-shadow-2 rounded-[20px] py-8 flex flex-col items-start w-2/3 sm:w-full'>
                {/* <p className='text-4xl'>Write a blog</p> */}


                <input maxLength="100" minLength="1" className='namans-textarea w-full text-3xl leading-none bg-transparent border-transparent outline-none' type="text" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} onKeyDown={(e) => { paraKeyControl(e, -1, "title") }} placeholder="Enter your title here..." />
                {/* {!numberOfAllDatas && content && 
<textarea className='w-full min-h-auto' value = {content[0]} onChange = {(e) => {createContent(e, 0)}} placeholder = "Enter your Blog here..." />
} */}
                {/* <textarea className='w-full min-h-auto' id={`this 0`} value = {alldata[0]} onFocus={() => { setTemp1(0) }} onChange={(e) => { createContent(e, 0) }} onKeyDown={(e) => { paraKeyControl(e, 0, "para") }} placeholder="Enter your Blog here..." /> */}

                {/* {console.log(imagepreview)} */}
                {/* {!numberOfAllDatas &&
                <img src={imagepreview[1]} id={`this 1`} />
            }
            {!numberOfAllDatas && <>
                <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, 1)} ref={inputRef} type="file" accept="image/*" />
            </>
            }
            {!numberOfAllDatas &&
                <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>

            } */}

                {/* <input  className='w-full' type="text" value = {title} onChange = {(e) => {setTitle(e.target.value)}}placeholder = "Enter your title here" />     */}
                {console.log(numberOfAllDatas)}
                {console.log(alldata)}
                {numberOfAllDatas && alldata.map((data, element) => (
                    <div className="w-full flex flex-row-reverse items-center relative">
                        {/* {console.log(image)} */}
                        {/* {console.log(imagepreview[element])} */}
                        {/* <input className='w-full min-h-auto' type="text" value = {content} onChange = {(e) => {createContent(e, element)}} placeholder = "Enter your Blog here..." /> */}
                        {/* {console.log("everythign is working!!!!!!!!!!!!!!!")}
                    {console.log(data)} */}
                        {/* {data && console.log(data.slice(5,10))} */}
                        {/* {console.log(data.type)} */}
                        {/* {console.log("element number affffffff", data)} */}
                        {/* {console.log(imagepreview[element])} */}
                        {
                            (data && (data.slice(0, 11) === "data:image/"))
                                ?
                                <>
                                    {/* {console.log("everythign is working!!!!!!!!!!!!!!!")} */}
                                    {/* {console.log(alldata[1])} */}
                                    <img src={data} tabIndex="0" id={`this ${element}`} onKeyDown={(e) => { paraKeyControl(e, element, 'image') }} className="mx-auto cursor-pointer rounded-[20px]" />
                                    {/* <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, element)} ref={inputRef} type="file" accept="image/*" /> */}
                                </>
                                :
                                <>

                                    {element === 0 && <TextareaAutosize className='namans-textarea text-lg w-full bg-transparent resize-none border-0 outline-none overflow-auto' id={`this ${element}`} ref={textarearef} value={data} onFocus={() => { setTemp1(element) }} onKeyDown={(e) => { paraKeyControl(e, element, 'para') }} onChange={(e) => { createContent(e, element) }} placeholder="Your story starts here..." />}
                                    {element !== 0 && <TextareaAutosize className='namans-textarea text-lg w-full bg-transparent resize-none border-0 outline-none overflow-auto' id={`this ${element}`} ref={textarearef} value={data} onFocus={() => { setTemp1(element) }} onKeyDown={(e) => { paraKeyControl(e, element, 'para') }} onChange={(e) => { createContent(e, element) }} />}
                                </>

                        }
                        {/* {console.log(element)} */}
                        {/* {console.log(temp1)} */}
                        {temp1 === element && alldata[element] === "" && element !== 0 &&
                            <>
                                {/* {console.log("DISPLAY")} */}
                                {/* {console.log(temp1)} */}
                                <svg onClick={onClickFocus} className="cursor-pointer absolute left-[-40px]" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" /></svg>
                                <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, element)} ref={inputRef} type="file" accept="image/*" />
                                {/* <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button> */}
                            </>
                        }
                        {temp1 === element && alldata[element] === "" && element === 0 &&
                            <>
                                {/* {console.log("DISPLAY")} */}
                                {/* {console.log(temp1)} */}
                                <svg onClick={onClickFocus} className="cursor-pointer absolute left-[-40px] " fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" /></svg>
                                <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, element + 1)} ref={inputRef} type="file" accept="image/*" />
                                {/* <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button> */}
                            </>
                        }

                        {/* <textarea className='w-full min-h-auto' onChange={(e) => { createContent(e, 0) }} placeholder="Enter your Blog here..." /> */}

                        {/* {element !== 0 && <textarea className='w-full min-h-auto' value={data} onChange={(e) => { createContent(e, element) }} placeholder="Enter your Blog here..." />} */}
                        {/* <button onClick = {()=>{RemoveImage}} >Remove image</button> */}

                        {/* <input type="text" value={content[element + 1]} onChange={(e) => { createContent(e, element + 1) }} placeholder="Enter your Blog here..." /> */}

                    </div>
                ))}
                {/* {console.log(element)} */}
                {/* {numberOfAllDatas && <input style={{ display: 'none' }} name="awesome af" onChange={e => handleImageChange(e, numberOfAllDatas)} ref={inputRef} type="file" accept="image/*" />} */}
                {/* {numberOfAllDatas && <button className='p-2 w-40 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={onClickFocus}>Gimme media</button>} */}
                {numberOfAllDatas && <button className='p-2 px-8 mx-auto bg-blue-500 font-semibold rounded-lg sm:mx-auto hover:bg-blue-700 text-white font-bold ' onClick={() => { setPublishblog(true); setWriteblog(false); }}>Publish Blog</button>}
                <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg={heading} p1={p1} p2="" />

            </div>
        );
    }
    // {text === " "?<br />:<p className='text-4xl'>{text}</p>}
    return (
        <div className="section">
            <div className='content flex justify-center'>
                {writeblog && Actuallywritingtheblog()}
                {publishblog && ActuallyPublishingtheBlog()}
            </div>
        </div>

    );
}

export default EditBlogsPage;