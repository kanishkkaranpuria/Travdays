const UndefinedError = () => {
    return (
        <div className="w-screen h-screen bg-white z-[10]">
            <div className="flex flex-col items-center z-[10] my-20">
                <img src="/image/nonetwork.png" className="mx-auto max-w-sm" alt="" />
                <p className="text-lg pt-10">We can't seem to connect to the server.</p>
                <p className="text-lg">Check your internet connection or try again later.</p>
            </div> 
        </div>
    );
}
 
export default UndefinedError;