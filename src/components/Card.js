
const Card = ({title}) => {
    return ( 
      <div className="card relative">
          <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0]'></div>
          <p className='relative z-[1] pl-4'>{title}</p>
      </div>
     );
}
 
export default Card;