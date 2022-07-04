import React from 'react';

function Error({message}){

    return <div className="alert alert-danger text-center" role="alert" style={{"marginTop": "100px"}}>
            {message ? <h6>{message}</h6>:
                <h6>Something went wrong! Please try again later.</h6>
            }
        </div>
}

export default Error;