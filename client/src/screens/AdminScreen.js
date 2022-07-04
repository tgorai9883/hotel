import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import axios from "axios";
import Swal from "sweetalert2";
const { TabPane } = Tabs;
function AdminScreen() {
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("currentUser")).isAdmin === "false") {
  //     window.location.href = "/home";
  //   }
  // }, []);
  return (
    <div style={{ margin: "65px" }}>
      <h3 className="text-center">
        <b>Admin Panel</b>
      </h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Rooms" key="1">
          <Rooms />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Bookings />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom/>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default AdminScreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-11">
        <h3>Bookings</h3>
        {loading && <Loader />}
        <table className="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Room</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length !== 0 &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-11">
        <h3>Rooms</h3>
        {loading && <Loader />}
        <table className="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Room Id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Rent Per Day</th>
              <th scope="col">Max Count</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length !== 0 &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/users/getallusers")).data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-11">
        <h3>Users</h3>
        {loading && <Loader />}
        <table className="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin === true ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddRoom() {
  const[loading,setLoading] = useState(false);

  const [name,setName] = useState();
  const [rentperday,setRentperday] = useState();
  const [maxcount,setMaxcount] = useState();
  const [type,setType] = useState();
  const [description,setDescription] = useState();
  const [phonenumber,setPhonenumber] = useState();
  const [imageURL1,setimageURL1] = useState();
  const [imageURL2,setimageURL2] = useState();
  const [imageURL3,setimageURL3] = useState();

  async function addRoom(e){
    e.preventDefault();
    const newRoom = {
      name,
      rentperday:Number(rentperday),
      maxcount:Number(maxcount),
      type,
      description,
      phonenumber:Number(phonenumber),
      imageurls : [imageURL1,imageURL2,imageURL3]
    }
    try {
      setLoading(true);
      await axios.post('/api/rooms/addroom',newRoom);
      setLoading(false);
      Swal.fire('Congratulations','New Room Added Successfully','success').then(result=>{
        window.location.href='/home'
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire('Oops','Something Went Wrong','error');
    }
  }

  return (
    <div className="col-8">
      <h3>Add Room</h3>
      {loading && <Loader/>}
      <form>
          <input type="text" className="form-control border-dark" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Rent Per Day"
            value={rentperday} onChange={(e)=>setRentperday(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Max Count"
            value={maxcount} onChange={(e)=>setMaxcount(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Type"
            value={type} onChange={(e)=>setType(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Description"
            value={description} onChange={(e)=>setDescription(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Phone Number"
            value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Image URL 1"
            value={imageURL1} onChange={(e)=>setimageURL1(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Image URL 2"
            value={imageURL2} onChange={(e)=>setimageURL2(e.target.value)}
          />
          <input type="text" className="form-control border-dark mt-1" placeholder="Image URL 3"
            value={imageURL3} onChange={(e)=>setimageURL3(e.target.value)}
          />
          <button type="submit" className="btn btn-dark mt-2" onClick={addRoom}>Add Room</button>
      </form>
    </div>
  );
}
