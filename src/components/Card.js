
const Card = ({title,id, src}) => {
    return ( 
      <div className="card sm:mx-auto" id={id}>
          <div className='card-content absolute h-full w-full '>
              <img src={src} className='object-cover w-full absolute bottom-0 rounded-[20px] h-full' alt=""/>
          <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0] rounded-[20px]'></div>
          <p className='absolute bottom-2 text-white z-[1] pl-4'>{title}</p>
          </div>
      </div>
     );
}
 
export default Card;