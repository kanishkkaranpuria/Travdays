
const Card = ({title,id}) => {
    return ( 
      <div className="card" id={id}>
          <div className='card-content absolute h-full w-full '>
              <img src="https://picsum.photos/200/300" className='object-cover w-full absolute bottom-0 rounded-[20px]' alt=""/>
          <div className='flex w-full h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 z-[0] rounded-[20px]'></div>
          <p className='absolute bottom-2 text-white z-[1] pl-4'>{title}</p>
          </div>
      </div>
     );
}
 
export default Card;