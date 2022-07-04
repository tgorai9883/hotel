import React from 'react';

function Success({message}){

    return <div className="alert alert-success text-center" role="alert" style={{"marginTop": "100px"}}>
            {message}
        </div>
}

export default Success;