import React from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loader(){

    return <div className="sweet-loading text-center" style={{"marginTop": "150px"}}>
        <HashLoader color="#000" size={60} />
  </div>
}

export default Loader;