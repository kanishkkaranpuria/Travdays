{hoverdatas && hoverdatas.map((hoverdata, i) => {
    if (globalUrl === data.name){
    if (hoverdatas.length === i + 1) {
      return (<div ref={lastDataElementRef2} className="" key={hoverdata.id}>
        <div className="">
          {/* {hoverdata.name && <h1>{hoverdata.name}</h1>} */}
          {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}
          {/* {hoverdata && <img src={hoverdata.image} alt="" width="100%" />} */}
        </div>

      </div>);
    } else {
      return (<div className="" key={hoverdata.id} >
        <div className="">
          {/* {data.name && <h1>{data.name}</h1>} */}
          {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}


        </div>

      </div>);
    }
  }})

  }
  














  {hoverdatas && hoverdatas.map((hoverdata, i) => {
    if (globalUrl === data.name){
    if (hoverdatas.length === i + 1) {
      return (<div ref={lastDataElementRef2} className="" key={hoverdata.id}>
        <div className="">
          {/* {hoverdata.name && <h1>{hoverdata.name}</h1>} */}
          {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}
          {/* {hoverdata && <img src={hoverdata.image} alt="" width="100%" />} */}
        </div>

      </div>);
    } else {
      return (<div className="" key={hoverdata.id} >
        <div className="">
          {/* {data.name && <h1>{data.name}</h1>} */}
          {hoverdata.image && <img src={hoverdata.image} alt="" width="100%" />}


        </div>

      </div>);
    }
  }})

  }