import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";

function Room({room, fromDate, toDate}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    return <div className="row shadow-lg p-3 mb-5 rounded">
        <div className="col-sm-4">
            <img src={room.imageurls[0]} className="card card-img-top" alt={room.name}/>
        </div>
        <div className="col-md-7">
            <h5>{room.name}</h5>
            <b>
                <p>Max Count: {room.maxcount}</p>
                <p>Phone Number: {room.phonenumber}</p>
                <p>Type: {room.type}</p>
            </b>
            <div style={{float: 'right'}}>
                {/* <Link to={`/book/${room._id}`}>
                    <button className="btn btn-dark m-2">Book Now</button>
                </Link> */}
                {(fromDate && toDate) && 
                    <a href={`/book/${room._id}/${fromDate}/${toDate}`} className="btn btn-dark m-2">Book Now</a>
                }
                <button className="btn btn-dark" onClick={handleShow}>View Details</button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
            <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {room.imageurls.map((url)=>{
                        return <Carousel.Item>
                                <img className="d-block w-100 rounded" src={url} alt="First slide"/>
                            </Carousel.Item>
                    })}
                </Carousel>
                <p>{room.description}</p>                  
            </Modal.Body>
            <Modal.Footer>
            <Button className="btn btn-dark" variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default Room;