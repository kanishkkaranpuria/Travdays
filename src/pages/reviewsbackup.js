<div className='px-2 pb-12 divide-y divide-gray-500'>

                                    {/* <span className='flex text-3xl mb-6'>Reviews</span> */}

                                    {

                                        reviewCreationBool &&
                                        <div className="flex flex-col pt-5 pb-2">
                                            <h3>Enter Review Here:</h3>
                                            <div className="flex cursor-pointer">

                                                {/* <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(1) }}>1</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(2) }}>2</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(3) }}>3</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(4) }}>4</button>
                                    <button className='p-2 bg-blue-500 font-semibold rounded-lg sm:mx-auto' onClick={() => { setUserGivenStars(5) }}>5</button> */}
                                                {console.log("this", userGivenStars)}
                                                {function () {
                                                    writeReviewStars = Object.assign(calculation(userGivenStars, writeReviewStars))
                                                }()}
                                                <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(1) }} viewBox="0 0 20 20">
                                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[1]} />
                                                </svg>
                                                <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(2) }} viewBox="0 0 20 20">
                                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[2]} />
                                                </svg>
                                                <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(3) }} viewBox="0 0 20 20">
                                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[3]} />
                                                </svg>
                                                <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(4) }} viewBox="0 0 20 20">
                                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[4]} />
                                                </svg>
                                                <svg width="25" height="25" className="md:hidden" onClick={() => { setUserGivenStars(5) }} viewBox="0 0 20 20">
                                                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={writeReviewStars[5]} />
                                                </svg>
                                            </div>
                                            <div className="flex w-full">
                                                <textarea className="w-full" required placeholder='Reviews..' value={userGivenDescription} onChange={(e) => setUserGivenDescription(e.target.value)} maxLength={1000} />
                                                {errorForEmptySubmission && <p> Enter the review and Choose a rating to submit </p>}
                                            </div>
                                            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  ' onClick={() => { submitReview() }}>Submit Review</button>

                                        </div>
                                    }

                                    {
                                        reviewObject && reviewObject.map((data, index) => {
                                            if (reviewObject.length === index + 1) {
                                                return (
                                                    <div ref={lastDataElementRef} className='px-2 my-2'>
                                                        {displayReviews(data, index)}
                                                    </div>

                                                )
                                            }

                                            else return (
                                                <div className='px-2 my-2 mb-6'>
                                                    {displayReviews(data, index)}
                                                </div>
                                            )
                                        })
                                    }

                                    {paginationLoading &&
                                        <div className="p-4 m-auto">
                                            <div className="m-auto" data-visualcompletion="loading-state" style={{ height: '32px', width: '32px' }}>
                                                <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                    {!paginationLoading && !hasMore &&
                                        <div className="m-auto">
                                            <p className="text-center">Woah! You have reached the end</p>
                                        </div>}
                                </div>