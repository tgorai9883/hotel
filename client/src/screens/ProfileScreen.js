import React, { useEffect, useState } from 'react';

// import 'antd/dist/antd.css';
import { Tabs, Tag } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
function ProfileScreen (){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return <div>
        <Tabs defaultActiveKey="1" style={{"margin":'60px'}}>
            <TabPane tab="Profile" key="1">
                <h3>My Profile</h3>
                <br/>
                <h5><b>Name: </b>{user.name}</h5>
                <h5><b>Email: </b>{user.email}</h5>
                <h5><b>Admin: </b>{user.isAdmin===true?'Yes':'No'}</h5>
            </TabPane>
            <TabPane tab="Bookings" key="2">
                <MyBookings/>
            </TabPane>
        </Tabs>
    </div>
}
export default ProfileScreen;

export function MyBookings(){
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            const data = (await axios.post("/api/bookings/getbookingsbyuserid",{userid:user._id})).data;
            setBookings(data);
            setLoading(false);
        }
        fetchData();
    },[user._id])
    async function cancelBooking(bookid,roomid){
        try {
            setLoading(true);
            await axios.post("/api/bookings/cancelbooking",{bookid,roomid});
            setLoading(false);
            Swal.fire('Congrats','Your booking has been cancelled','success').then(result=>{
                window.location.reload();
            })
        } catch (error) {
            setLoading(false);
            Swal.fire('Oops','Something went wrong','error');
        }
    }
    return <div>
        <div className='col-md-6'>
            {loading && <Loader/>}
            {bookings && (bookings.map((booking)=>{
                return <div className='shadow-lg p-3 mb-4 rounded'>
                    <h5><b>{booking.room}</b></h5>
                    <h6><b>BookingId: </b>{booking._id}</h6>
                    <h6><b>CheckIn: </b>{booking.fromDate}</h6>
                    <h6><b>CheckOut: </b>{booking.toDate}</h6>
                    <h6><b>Total Amount: </b>{booking.totalAmount}</h6>
                    <h6><b>Status: </b>{booking.status === 'booked'?<Tag color="green">Confirmed</Tag>:<Tag color="red">Calcelled</Tag>}</h6>
                    {booking.status !== 'cancelled' &&
                        <button className='btn btn-dark' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>Cancel Booking</button>
                    }
                </div>
            }))}
        </div>
    </div>
}