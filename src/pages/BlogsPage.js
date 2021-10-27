import WriteABlog from "../components/WriteABlog";

const Blogs = () => {
    return (
    
    <div className="blog relative ">
        <img className='fixed bottom-16 right-16' src="https://img.icons8.com/material-rounded/64/000000/plus--v1.png"/>
        {/* <WriteABlog/> */}
        <p className='text-5xl font-bold p-4'>Fetured Blogs</p>
        <div className="featured-blogs flex overflow-x-auto gap-x-8 p-4">
            <div className="blog-preview-card featured relative">
                <div className='gradient'></div>
            <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <div className='p-8 absolute bottom-0 text-white'>
                    <p className='text-3xl'>Location</p>
                    <p className='flex text-2xl items-center text-center '>x.x 
                        <span className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
                        </span>
                    </p>
                </div>
                <img className='absolute top-0 object-cover bg' src="https://picsum.photos/500/300?random=1" alt=""/>
                {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
            </div>

            <div className="blog-preview-card featured relative">
                <div className='gradient'></div>
            <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <div className='p-8 absolute bottom-0 text-white'>
                    <p className='text-3xl'>Location</p>
                    <p className='flex text-2xl items-center text-center '>x.x 
                        <span className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
                        </span>
                    </p>
                </div>
                <img className='absolute top-0 object-cover bg' src="https://picsum.photos/500/300?random=2" alt=""/>
                {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
            </div>

            <div className="blog-preview-card featured relative">
                <div className='gradient'></div>
            <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <div className='p-8 absolute bottom-0 text-white'>
                    <p className='text-3xl'>Location</p>
                    <p className='flex text-2xl items-center text-center '>x.x 
                        <span className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
                        </span>
                    </p>
                </div>
                <img className='absolute top-0 object-cover bg' src="https://picsum.photos/500/300?random=3" alt=""/>
                {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
            </div>

            <div className="blog-preview-card featured relative">
                <div className='gradient'></div>
            <img className='star absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <div className='p-8 absolute bottom-0 text-white'>
                    <p className='text-3xl'>Location</p>
                    <p className='flex text-2xl items-center text-center '>x.x 
                        <span className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>
                        </span>
                    </p>
                </div>
                <img className='absolute top-0 object-cover bg' src="https://picsum.photos/500/300?random=4" alt=""/>
                {/* <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p> */}
            </div>
            
            
        
            
            {/* <div className="blog-preview-card featured relative">
            <img className='absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <p className='text-3xl'>Location</p>
                <p className='flex text-2xl items-center h-6'>x.x 
                    <span className='flex h-6'>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    </span>
                </p>
                <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p>
            </div>
            <div className="blog-preview-card featured relative">
            <img className='absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <p className='text-3xl'>Location</p>
                <p className='flex text-2xl items-center h-6'>x.x 
                    <span className='flex h-6'>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    </span>
                </p>
                <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p>
            </div>
            <div className="blog-preview-card featured relative">
            <img className='absolute right-2 top-2' src="https://img.icons8.com/fluency/32/000000/star.png"/>
                <p className='text-3xl'>Location</p>
                <p className='flex text-2xl items-center h-6'>x.x 
                    <span className='flex h-6'>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    <img src="https://img.icons8.com/material-rounded/32/000000/star--v1.png"/>
                    </span>
                </p>
                <p className='leading-tight pt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam.</p>
            </div> */}
        </div>

{/* ***********************************************   unfeatured blogs  */}
        {/* <p className='text-5xl font-bold p-4'>Blogs</p> */}
        <div className=" p-8 ">
        <div className="blog-preview-card non-featured relative mb-8">
                <div className="blog-photos">
                    <img className='object-cover w-full' src="https://picsum.photos/500" alt=""/>
                </div>
                <div className='p-8'>
                    <div className="flex justify-between items-center">
                    <p className='text-5xl font-bold'>Location</p>
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
                <p className='text-3xl  pt-6'>title of the blog</p>
                <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                </div>
            </div>
                    <div className="blog-preview-card non-featured relative mb-8">
                <div className="blog-photos">
                    <img className='object-cover w-full' src="https://picsum.photos/500?random=1" alt=""/>
                </div>
                <div className='p-8'>
                    <div className="flex justify-between items-center">
                    <p className='text-5xl font-bold'>Location</p>
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
                <p className='text-3xl  pt-6'>title of the blog</p>
                <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                </div>
            </div>
            <div className="blog-preview-card non-featured relative mb-8">
                <div className="blog-photos">
                    <img className='object-cover w-full' src="https://picsum.photos/500?random=2" alt=""/>
                </div>
                <div className='p-8'>
                    <div className="flex justify-between items-center">
                    <p className='text-5xl font-bold'>Location</p>
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
                <p className='text-3xl  pt-6'>title of the blog</p>
                <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                </div>
            </div>
            <div className="blog-preview-card non-featured relative mb-8">
                <div className="blog-photos">
                    <img className='object-cover w-full' src="https://picsum.photos/500?random=3" alt=""/>
                </div>
                <div className='p-8'>
                    <div className="flex justify-between items-center">
                    <p className='text-5xl font-bold'>Location</p>
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
                <p className='text-3xl  pt-6'>title of the blog</p>
                <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                </div>
            </div>
            <div className="blog-preview-card non-featured relative mb-8">
                <div className="blog-photos">
                    <img className='object-cover w-full' src="https://picsum.photos/500?random=4" alt=""/>
                </div>
                <div className='p-8'>
                    <div className="flex justify-between items-center">
                    <p className='text-5xl font-bold'>Location</p>
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
                <p className='text-3xl  pt-6'>title of the blog</p>
                <p className='pt-6 leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi iusto, rerum fugit nam aut incidunt impedit reprehenderit a quos explicabo ad doloribus cum quidem! Reiciendis enim cum quam eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquam ut eligendi vitae ea architecto eaque illo, atque reprehenderit? Aperiam maiores repudiandae aspernatur doloribus consectetur commodi voluptate fugit impedit laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, corporis perferendis. Facilis, odit et rem error alias accusamus. Necessitatibus commodi deleniti provident iusto ut explicabo! Magni corporis architecto maiores iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt dignissimos facere labore adipisci ipsa commodi velit molestiae dicta. Cum vero asperiores molestias fugiat exercitationem eos delectus repellendus eveniet rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse necessitatibus ex modi voluptates reiciendis magnam vero delectus? Voluptatem consequuntur, quod iusto maiores odit quos! Consequuntur ea eum illum corporis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eligendi beatae esse molestias iste, et corporis ut nemo praesentium laudantium delectus voluptas nisi explicabo quaerat aperiam reiciendis expedita voluptate quod?</p>
                </div>
            </div> 
        </div>
        </div>
    );
}
 
export default Blogs;