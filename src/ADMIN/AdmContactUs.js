
import { useState ,useEffect,useRef,useCallback} from "react";
import fullaxios from "../components/FullAxios";
const AdmContactUs = () => {
    const [allcontactus, setAllcontactus] = useState([])
    const [page, setPage] = useState(1)
    const [id, setId] = useState()
    const [hasmore, setHasmore] = useState(true)
    const [loading, setLoading] = useState(false)
    const observer = useRef()
    
    const lastDataElementRef = useCallback(node => {
      console.log('last element')
      if (loading) return
      console.log('wtf')
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasmore) {
          console.log("intersected")
          setPage(prev => prev + 1)
        }
        })
      if (node) {
          console.log(node)
          observer.current.observe(node)}
      }, [loading, hasmore])

      useEffect(() => {
      setLoading(true)
      fullaxios({url: 'query/?page='+ page  })
        .then((res) => {
          console.log("it workded")
          console.log("res.data",res.data)
          if(page<3){
          setAllcontactus(prev=>[...prev,...res.data])
          // console.log(res.data)
        }
        })
        .catch(err => {
          console.log("erro ho raha hai kya ")
          console.log(err.response)
          if (err.response){if (err.response.data.detail === "Invalid page.") {
            setHasmore(false)
          }
        }}
        )
        
        setLoading(false)
     
    }, [page])

    useEffect(() => {
      
  console.log(loading)
    }, [loading])
    const Delete = () => {
      
      fullaxios({url: 'query/' , type: 'delete' })
        .then(res => {
          console.log("deleted")
            console.log(res.data)
        })
        .catch(res => {
        })
    }
     
 


    return (
        <div className="blog relative pt-[60px] w-full">

            
        {allcontactus && allcontactus.map((data,index)=> {
          if(allcontactus.length === index+1){
            return(
              <div ref={lastDataElementRef} className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>{data.name}</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : {data. phoneNumber}</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  {data.choice}
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>{data.query}</p>
                      </div>
                      

                  <button onClick={Delete} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>
                  </div>

                </div>
            )
          }
          else{
            return(
              <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>{data.name}</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : {data. phoneNumber}</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : {data.email}</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  {data.choice}
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>{data.query}</p>
                      </div>
                      

                  <button onClick={Delete} className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg'  >Delete</button>
                  </div>

                </div>
            )

          }
        })}
         <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>Aum Ghag</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : 9953530555</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : aumghag@gmail.com</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  solo
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam a expedita mollitia veniam obcaecati est amet neque sapiente quos quibusdam alias, doloribus voluptatibus? Nisi, eligendi incidunt temporibus minus accusamus optio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae obcaecati voluptatibus officia labore magnam sed commodi, ipsa, fuga, dolores voluptate ratione tenetur esse ea nemo cumque error veniam eius? Voluptas!</p>
                      </div>
                      

                  <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >Delete</button>
                  </div>

                </div>
                <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>Naman Kejriwal</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : 9953530555</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : namankejriwal@gmail.com</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  solo
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam a expedita mollitia veniam obcaecati est amet neque sapiente quos quibusdam alias, doloribus voluptatibus? Nisi, eligendi incidunt temporibus minus accusamus optio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae obcaecati voluptatibus officia labore magnam sed commodi, ipsa, fuga, dolores voluptate ratione tenetur esse ea nemo cumque error veniam eius? Voluptas!</p>
                      </div>
                      

                  <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >Delete</button>
                  </div>

                </div>
                 <div  className="max-w-[1440px] mx-auto px-8 py-2 w-full flex flex-col justify-center">
              <div className="blog-preview-card ">
                      <div className='p-8 sm:p-1'>
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                              <p  className='text-3xl font-semibold  pt-2 '>Aum Ghag</p>
                             <p  className='text-xl font-semibold  pt-8 '>Contact no : 9953530555</p>
                          <p className='text-xl font-semibold  pt-2 '>Email : aumghag@gmail.com</p>
                              </div>
                      
                      <p className='text-2xl font-semibold  pt-2'> Type of Query:  solo
                          
                      </p>
                      </div>
                      <p className='text-2xl font-semibold  pt-6'>Query:</p>
                      <p className='pt-3 leading-tight text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam a expedita mollitia veniam obcaecati est amet neque sapiente quos quibusdam alias, doloribus voluptatibus? Nisi, eligendi incidunt temporibus minus accusamus optio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae obcaecati voluptatibus officia labore magnam sed commodi, ipsa, fuga, dolores voluptate ratione tenetur esse ea nemo cumque error veniam eius? Voluptas!</p>
                      </div>
                      

                  <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit"  >Delete</button>
                  </div>

                </div>
           </div>
    );
}
 
export default AdmContactUs;