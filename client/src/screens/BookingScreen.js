import React,{useState,useEffect} from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration:100
});
function BookingScreen({match}){
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);

    const fromDate = moment(match.params.fromDate,'DD-MM-YYYY');
    const toDate = moment(match.params.toDate,'DD-MM-YYYY');
    const totalDays = toDate.diff(fromDate,'days')+1;
    const totalAmount = totalDays*room.rentperday;
    // const [totalAmount, setTotalAmount] = useState();
    useEffect(()=>{
        if(!localStorage.getItem('currentUser')){
            window.location.href='/login';
        }
        async function fetchData(){
            try {
                setLoading(true);
                const data = (await axios.post("/api/rooms/getroombyid",{roomid: match.params.roomid})).data;
                setRoom(data);
                // setTotalAmount(totalDays*data.rentperday);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    },[match.params.roomid])

    async function bookroom(){
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }
        try {
            await axios.post("/api/bookings/bookroom",bookingDetails);
            Swal.fire('Congratulations','Your Room Booked Successfully','success').then(result=>{
                window.location.href='/bookings'
            })
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="m-5 shadow-lg rounded" data-aos="zoom-in-down">
            {loading?<Loader/>:room?(
                <div style={{"marginTop": "135px"}}>
                    <div className="row justify-content-center book-details">
                        <div className="col-md-6">
                            <h4>{room.name}</h4>
                            <img src={room.imageurls[0]} alt={room.name} className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mt-3" style={{textAlign: 'right'}}>
                            <h3>Booking Details</h3>
                            <hr/>
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {match.params.fromDate}</p>
                                <p>To Date: {match.params.toDate}</p>
                                <p>Max Count: {room.maxcount}</p>
                            </b>
                            <h3>Amount</h3>
                            <hr/>
                            <b>
                                <p>Total days: {totalDays}</p>
                                <p>Rent Per Day: {room.rentperday}</p>
                                <p>Total: {totalAmount}</p>
                            </b>
                            <Button className="btn btn-dark" onClick={bookroom}>Pay Now</Button>
                        </div>
                    </div>
                </div>
            ):<Error/>}
        </div>
    )
}
export default BookingScreen;