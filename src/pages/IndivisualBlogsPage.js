import { useState, useEffect, useRef, useCallback, } from "react";
import axios from "axios";
import { useHistory } from "react-router";
// import {browserHistory} from 'react-router'
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router";
import fullaxios from "../components/FullAxios";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { version } from "react";

const IndivisualBlogPage = ({ isadmin }) => {
  const [iblogimg, setIblogimg] = useState([])
  const [iblogdata, setIblogdata] = useState({})
  const [featured, setFeatured] = useState(null)
  const [approved, setApproved] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [disliked, setDisliked] = useState(null)
  const [liked, setLiked] = useState(null)
  const [lDvalue, setLDvalue] = useState(null)
  const [iLDvalue, setILDvalue] = useState(null)
  const [variable, setVariable] = useState(1)
  const history = useHistory();
  const { id } = useParams();
  const { title } = useParams();

  //paginationnnnnnnnnnn
  const observer = useRef()
  const [loading, setLoading] = useState(false)
  const [hasmore, setHasmore] = useState(true)
  const [page, setPage] = useState(1)

  const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))


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


  const lastDataElementRef = useCallback(node => {
    console.log('last element')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasmore) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasmore])

  useEffect(() => {
    console.log(id)
    if (id) {
      fullaxios({ url: 'blog/indi/' + id + '/' + page })
        .then(res => {
          console.log(res.data, "dataaaaaaaaaaaaaaaaaa")
          if (Object.keys(res.data).length === 0) {
            history.replace('/approveblogs')
            console.log("data is zero")
          }
          setIblogdata({ ...iblogdata, ...res.data })
          // for(let i; i < .length; i++)
          //   (res.data)
          Object.keys(res.data).map((number, i) => {
            console.log("find me", number)
            console.log("find me", res.data[number])
            if (res.data[number].slice(-3) === "img") {
              console.log("find me", res.data[number].slice(0, -4))
              toDataURL(res.data[number].slice(0, -4))
                .then(dataUrl => {
                  console.log('Here is Base64 Url', dataUrl)
                  var fileData = dataURLtoFile(dataUrl, `imageName${number}`);
                  console.log("Here is JavaScript File Object", fileData)
                  // fileArr.push(fileData)
                })
            }
          })


          //   setIblogdata(res.data)
          console.log(res.data[0].slice(-3,))
          console.log()
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response, "errorrrrrrrrrrrrrrrrrrr")
          if (page === 1 && (err.response.status === 400 || err.response.status === 404)) {
            console.log(err.response.status)
            history.replace('/blogs')
          }
          if (err.response) {
            if (err.response.data.detail === "Invalid page.") {
              setHasmore(false)
              setLoading(false)
            }
          }
        })
    }
  }, [page, hasmore])



  //addmins onlyyyyyy
  useEffect(() => {
    console.log(id)
    if (id) {
      fullaxios({ url: 'blog/status/' + id })
        .then(res => {
          setFeatured(res.data.featured)
          setApproved(res.data.approved)
        })
        .catch(err => {


        })

      fullaxios({ url: 'blog/votestatus/' + id })
        .then(res => {
          setILDvalue(res.data.status)
        })
        .catch(err => {


        })
    }
  }, [])

  useEffect(() => {
    console.log(iLDvalue)
    if (iLDvalue === "like") {
      console.log("this worked")
      setLDvalue('like')
      setLiked(true)
    }
    else if (iLDvalue === "dislike") {
      setLDvalue('dislike')
      setDisliked(true)
    }

  }, [iLDvalue])


  // featureeeeee
  const Feature = (feature) => {
    if (feature === true) {
      setApproved(feature)
    }
    setFeatured(feature)
  }



  //Approvee


  const Approve = (approval) => {
    if (featured === true) {
      setApproved(true)
    }
    else if (featured === false) {
      setApproved(approval)

    }

  }
  //like 

  const Like = (likke) => {
    console.log(likke)
    if (likke === true) {
      setLiked(true)
      setDisliked(false)
    }
    else if (likke === false) {
      setLiked(false)
    }
  }



  //dislike
  useEffect(() => {
    console.log(variable)
  }, [variable])

  const Dislike = (dislike) => {
    console.log(dislike)
    if (dislike === true) {
      setLiked(false)
      setDisliked(true)
    }
    else if (dislike === false) {
      setDisliked(false)
    }
  }

  //submite the string response 
  const LDsubmit = useCallback((status1, status2) => {
    console.log("callback chala ")
    console.log(lDvalue)
    console.log(variable)

    if (status1 === true) {
      console.log("wtf")
      fullaxios({
        url: 'blog/vote', type: 'post', data: {
          vote: "like",
          id: id

        },
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })

    }
    else if (status1 === false) {
      console.log("wtf")
      fullaxios({
        url: 'blog/vote', type: 'post', data: {
          vote: "like",
          id: id

        },
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })

    }

    else if (status2 === true) {
      console.log("wtf")
      fullaxios({
        url: 'blog/vote', type: 'post', data: {
          vote: "dislike",
          id: id

        },
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })

    }
    else if (status2 === false) {
      console.log("wtf")
      fullaxios({
        url: 'blog/vote', type: 'post', data: {
          vote: "dislike",
          id: id

        },
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })

    }

  }, [lDvalue, variable])



  useEffect(() => {
    console.log(id)
    if (id) {
      fullaxios({ url: 'blog/indi/' + id + '/' + 1 })
        .then(res => {
          setIblogdata(res.data)
          //   setIblogdata(res.data)
          console.log(res.data)
          console.log(res.data[0].slice(-3,))
          console.log()
          console.log(res.data)
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data.detail === "Invalid page.") {
              console.log("wtf is happening")
              setHasmore(false)
              setLoading(false)
            }
          }
        })
    }
  }, [])


  const Deleteblog = () => {
    let confimBox = window.confirm("delete seriously?")
    if (confimBox === true) {
      console.log("delete teh fucking shit")
      fullaxios({ url: 'blog/delete/' + id, type: 'delete' })
        .then(res => {
          console.log("deleted")
          console.log(res.data)
          history.replace('/approveblogs')
        })
        .catch(res => {
        })
    }
    {
    }


  }


  const Submit = () => {
    //Approval

    let confirmSubmit = window.confirm("submit response?")

    if (confirmSubmit === true) {
      fullaxios({
        url: 'blog/create', type: 'patch', data: {
          id: id,
          featured: featured,
          approved: approved,
        },
      })
        .then(res => {
          history.replace('/approveblogs')
          alert("response submited")
        })
        .catch(err => {
          console.log(err.response)
        })

    }


    // if(approval){

    // }
    // else if (!approval){
    //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
    //       id : id,
    //       // featured : !featured,
    //       approved : approval,
    //   }, })
    //   .then(res => {
    //     if (res){
    //   }})
    //   .catch(err => {
    //      if (err.response){if (err.response.data.detail === "Invalid page.") {
    //      }

    //    }})
    // }

    // //Featureddddd
    // if(feature){

    //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
    //       id :id,
    //       featured : feature,
    //       approved : feature,
    //   }, })
    //   .then(res => {
    //     if (res){
    //       console.log(res.data)
    //     // setAllblogs(prev=>[...prev,...res.data])
    //   }})
    //   .catch(err => {
    //      if (err.response){if (err.response.data.detail === "Invalid page.") {
    //      }

    //    }})
    // }
    // else if (!feature){
    //   fullaxios({url : 'blog/create' ,type:'patch' ,data : {
    //       id : id,
    //       featured : feature,
    //       approved : feature ,
    //   }, })
    //   .then(res => {
    //     if (res){
    //   }})
    //   .catch(err => {
    //      if (err.response){if (err.response.data.detail === "Invalid page.") {
    //      }

    //    }})
    // }


  }
  const FullBlog = (keyName, i) => {
    return (
      <div>
        {iblogdata[keyName].slice(-3,) === "par" && iblogdata[keyName].slice(0, 11) !== "data:image/" &&
          <div id={i} value={i + 1}>
            {iblogdata[keyName].slice(0, -4)}
          </div>
        }
        <br />
        {iblogdata[keyName].slice(-3,) === "img" && <img className="mx-auto rounded-[20px]" src={iblogdata[keyName].slice(0, -4)} alt="" />}
        {iblogdata[keyName].slice(0, 11) === "data:image/" && <img className="mx-auto rounded-[20px]" src={iblogdata[keyName].slice(0, -4)} />}
      </div>
    )
  }

  //Submit useeffect
  useEffect(() => {
    // console.log(iblogimg,"img")
    console.log(page)
    console.log(hasmore)
  }, [iblogdata, iblogimg, page])
  return (
    <div className='section'>



      {iblogdata && <div className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
        <div className="blog-preview-card relative ">
          <div className=' sm:p-1'>
            <div className="flex justify-between items-center mb-20">
              <div className="flex flex-col">
                {isadmin && <div>
                  {approved ? <button onClick={(() => { Approve(false) })} className=' sm:mx-auto m-2 text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>Approve:&#9745;</button> :
                    <button onClick={(() => { Approve(true) })} className=' sm:mx-auto m-2 text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>  Approve:&#9744;</button>}
                  {featured ? <button onClick={(() => { Feature(false) })} className=' sm:mx-auto m-2 text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>Feature:&#9745;</button> :
                    <button onClick={(() => { Feature(true) })} className=' sm:mx-auto m-2 text-2xl  w-40 bg-white-500 font-semibold rounded-lg'>  Feature:&#9744;</button>}
                  <div>
                    <button onClick={Submit} className=' sm:mx-auto p-2 m-2 w-40 bg-blue-500 font-semibold rounded-lg'  >submit</button>
                    <button onClick={Deleteblog} className=' sm:mx-auto p-2 m-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>
                  </div>
                </div>}
              </div>


            </div>

      <div className="flex absolute top-[2.5rem] right-[2.5rem]">
      <div>
        
          {liked ?
              <svg onClick={(() => { Like(false); LDsubmit(false, "") })} width="35px" height="35px" viewBox="0 0 512 512" ><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z" /></svg> :
              <svg onClick={(() => { Like(true); LDsubmit(true, "") })} width="35px" height="35px" viewBox="0 0 512 512" > <path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z" /></svg>
              }   
          </div>     
          <div>
          {disliked ?
              <svg onClick={(() => { Dislike(false); LDsubmit("", false) })} width="35px" height="35px" viewBox="0 0 512 512"><path d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z" /></svg>
              :
              <svg onClick={(() => { Dislike(true); LDsubmit("", true) })} width="35px" height="35px" viewBox="0 0 512 512" ><path d="M466.27 225.31c4.674-22.647.864-44.538-8.99-62.99 2.958-23.868-4.021-48.565-17.34-66.99C438.986 39.423 404.117 0 327 0c-7 0-15 .01-22.22.01C201.195.01 168.997 40 128 40h-10.845c-5.64-4.975-13.042-8-21.155-8H32C14.327 32 0 46.327 0 64v240c0 17.673 14.327 32 32 32h64c11.842 0 22.175-6.438 27.708-16h7.052c19.146 16.953 46.013 60.653 68.76 83.4 13.667 13.667 10.153 108.6 71.76 108.6 57.58 0 95.27-31.936 95.27-104.73 0-18.41-3.93-33.73-8.85-46.54h36.48c48.602 0 85.82-41.565 85.82-85.58 0-19.15-4.96-34.99-13.73-49.84zM64 296c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm330.18 16.73H290.19c0 37.82 28.36 55.37 28.36 94.54 0 23.75 0 56.73-47.27 56.73-18.91-18.91-9.46-66.18-37.82-94.54C206.9 342.89 167.28 272 138.92 272H128V85.83c53.611 0 100.001-37.82 171.64-37.82h37.82c35.512 0 60.82 17.12 53.12 65.9 15.2 8.16 26.5 36.44 13.94 57.57 21.581 20.384 18.699 51.065 5.21 65.62 9.45 0 22.36 18.91 22.27 37.81-.09 18.91-16.71 37.82-37.82 37.82z" /></svg>
            }
          </div>
      </div>

            <span className=' pl-10 font-bold my-10 text-4xl'>{title}</span>

            <p className='px-8 py-2 pt-3 leading-tight text-xl'> {Object.keys(iblogdata).map((keyName, i) => {
              if (Object.keys(iblogdata).length === i + 1) {
                return (
                  <div ref={lastDataElementRef} className="">
                    {FullBlog(keyName, i)}
                  </div>
                )
              }
              else {
                return (
                  <div className="">
                    {FullBlog(keyName, i)}

                  </div>
                )
              }


            })} </p>
          </div>


        </div>

      </div>
      }
    </div>
  );
}

export default IndivisualBlogPage;