import { useEffect,useState,useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import fullaxios from "../components/FullAxios";

const IndivisualBlogPage = ({id , setId}) => {
    const [page, setPage] = useState(1);
    const [iblogimg, setIblogimg] = useState([])
    const [iblogdata, setIblogdata] = useState()
    const [state, setstate] = useState()
    const [loading, setLoading] = useState()
    const [hasmore, setHasmore] = useState(true)
    const {title} = useParams()

    useEffect(() => {
        console.log(id)
        if(id){
            fullaxios({url: 'blog/media/' + id })
            .then(res => {
              setIblogimg(prev=>[...prev,...res.data])
            })
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore(false)
                 setLoading(false)
               }
             }})
        }
    }, [])

    useEffect(() => {
        console.log(id)
        if(id){
            fullaxios({url: 'blog/detail/' + id })
            .then(res => {
            //   setIblogdata(prev=>[...prev,...res.data]
                  setIblogdata(res.data)
            
            console.log(res.data)
            })
            .catch(err => {
               if (err.response){if (err.response.data.detail === "Invalid page.") {
                 setHasmore(false)
                 setLoading(false)
               }
             }})
        }
    }, [])

    

    const test = () => {
        console.log(id)
    }
     

    
    useEffect(() => {
        console.log(iblogimg,"img")
        console.log(iblogdata,"data")

        
        
    }, [iblogdata,iblogimg])
    return ( 
        <div className='section'>
            {iblogimg  &&  iblogimg.map((data) => {
                // if(){
                //   return(
                      
                //   )}
                // else 
                // return(
                    
                // )  
                return(
                    <div className=" px-8 sm:px-1 py-4 sm:py-2 w-full flex justify-center">
                    <div className="blog-preview-card non-featured relative">
                            <div className="blog-photos">
                                <img className='object-cover h-full w-full' src={data.image} alt=""/>
                            </div>
                            <div className='p-8 sm:p-1'>
                                <div className="flex justify-between items-center">
                                <p className='font-semibold sm:text-2xl'></p>
                            <p className='flex text-2xl items-center h-6'>x.x 
                                <span className='flex h-6'>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                </span>
                            </p>
                            </div>
                         {iblogdata && <p className='text-3xl font-bold pt-6'>{iblogdata.blog}</p>}   
                            <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                            </div>
                            <button onClick={test}>wtfff</button>
                        </div>
                    </div>
                )
            })}
             <div className=" px-8 sm:px-1 py-4 sm:py-2 w-full flex justify-center">
        <div className="blog-preview-card non-featured relative">
                <div className="blog-photos">
                    <img className='object-cover h-full w-full' src="https://picsum.photos/500" alt=""/>
                </div>
                <div className='p-8 sm:p-1'>
                                <div className="flex justify-between items-center">
                                <p className='font-semibold sm:text-2xl'></p>
                            <p className='flex text-2xl items-center h-6'>x.x 
                                <span className='flex h-6'>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                                </span>
                            </p>
                            </div>
                            <button onClick={test}>wtfff</button>
                            <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                            </div>
            </div>
        </div>
        </div>
     );
}
 
export default IndivisualBlogPage;