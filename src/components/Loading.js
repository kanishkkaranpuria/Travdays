const Loading = () => {
    return ( 
    <div className="w-screen h-screen bg-white z-[10]">
            <div className="flex flex-col items-center z-[10] my-20">
                <img src="/image/1trans.png" className="mx-auto max-w-[200px]" alt="" />
                <p className="text-3xl "> Please wait, We are loading your travdays screen....</p>
            </div>
    </div> );
}
 
export default Loading;